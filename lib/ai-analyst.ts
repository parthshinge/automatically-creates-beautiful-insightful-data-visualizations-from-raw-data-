
import Papa from 'papaparse';

export type DatasetSummary = {
    totalRows: number;
    totalColumns: number;
    columnNames: string[];
    numericColumns: string[];
    categoricalColumns: string[];
    dateColumns: string[];
};

export type ChartRecommendation = {
    id: string;
    type: 'area' | 'bar' | 'pie' | 'line';
    title: string;
    description: string;
    dataKeyX: string; // or name
    dataKeyY: string; // or value
    data: any[];
};

export type AnalysisResult = {
    summary: DatasetSummary;
    charts: ChartRecommendation[];
    insights: string[];
};

// Helper: Detect if string is date
const isDate = (value: string) => {
    const d = new Date(value);
    return d instanceof Date && !isNaN(d.getTime());
};

// Helper: Detect if string is numeric (handling currency symbols etc)
const isNumeric = (value: string | number) => {
    if (typeof value === 'number') return true;
    if (!value) return false;
    const clean = value.replace(/[$,]/g, '');
    return !isNaN(parseFloat(clean)) && isFinite(parseFloat(clean));
};

const parseValue = (value: any) => {
    if (typeof value === 'string') {
        // Remove currency symbols, commas
        const clean = value.replace(/[$,]/g, '');
        if (!isNaN(parseFloat(clean)) && isFinite(parseFloat(clean))) {
            return parseFloat(clean);
        }
    }
    return value;
}

export const analyzeData = async (file: File): Promise<AnalysisResult> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
                const data = results.data as any[];
                if (!data || data.length === 0) {
                    reject("No data found");
                    return;
                }

                // 1. Analyze Columns
                const columns = Object.keys(data[0]);
                const numericCols: string[] = [];
                const catCols: string[] = [];
                const dateCols: string[] = [];

                // Sample first 5 rows to determine types
                columns.forEach(col => {
                    const sampleValues = data.slice(0, 5).map(row => row[col]);
                    const isNum = sampleValues.every(v => isNumeric(v));
                    const isDt = sampleValues.every(v => isDate(String(v))); // Check Date first? Actually numeric checks might define dates as NaN usually.

                    if (isNum) numericCols.push(col);
                    else if (isDt) dateCols.push(col);
                    else catCols.push(col);
                });

                // 2. Generate Summary
                const summary: DatasetSummary = {
                    totalRows: data.length,
                    totalColumns: columns.length,
                    columnNames: columns,
                    numericColumns: numericCols,
                    categoricalColumns: catCols,
                    dateColumns: dateCols
                };

                // 3. Generate Visualizations & Insights
                const charts: ChartRecommendation[] = [];
                const insights: string[] = [];

                // Clean Data for Charts
                const cleanData = data.map(row => {
                    const newRow: any = { ...row };
                    numericCols.forEach(col => {
                        newRow[col] = parseValue(row[col]);
                    });
                    return newRow;
                });

                // Strategy A: Time Series Trend (Date + Numeric)
                // If we have a date column and a numeric column, show trend
                if (dateCols.length > 0 && numericCols.length > 0) {
                    const dateCol = dateCols[0];
                    const numCol = numericCols[0]; // Primary metric

                    // Sort by date
                    const sortedData = [...cleanData].sort((a, b) => new Date(a[dateCol]).getTime() - new Date(b[dateCol]).getTime());

                    charts.push({
                        id: 'trend-1',
                        type: 'area',
                        title: `${numCol} Trend Over Time`,
                        description: `Tracking the movement of ${numCol} across the measured time period. This visualization highlights growth patterns and seasonal volatility.`,
                        dataKeyX: dateCol,
                        dataKeyY: numCol,
                        data: sortedData
                    });

                    // Insight for Trend
                    const firstVal = sortedData[0][numCol];
                    const lastVal = sortedData[sortedData.length - 1][numCol];
                    const growth = ((lastVal - firstVal) / firstVal) * 100;
                    insights.push(`**Overall Growth**: ${numCol} shifted from ${firstVal} to ${lastVal}, representing a **${growth.toFixed(1)}% ${growth > 0 ? 'increase' : 'decrease'}** over the period.`);
                }

                // Strategy B: Categorical Comparison (Category + Numeric)
                if (catCols.length > 0 && numericCols.length > 0) {
                    const catCol = catCols[0];
                    const numCol = numericCols[0];

                    // Aggregate data if many rows
                    const grouped = cleanData.reduce((acc, curr) => {
                        const key = curr[catCol] || 'Unknown';
                        acc[key] = (acc[key] || 0) + (curr[numCol] || 0);
                        return acc;
                    }, {} as Record<string, number>);

                    const aggregatedData = Object.entries(grouped).map(([name, value]) => ({ name, value }));
                    // Sort by value desc
                    aggregatedData.sort((a, b) => (b.value as number) - (a.value as number));
                    const top5 = aggregatedData.slice(0, 5);

                    charts.push({
                        id: 'bar-comparison',
                        type: 'bar',
                        title: `Top 5 ${catCol} by ${numCol}`,
                        description: `A comparative view of the top performing ${catCol} groups.`,
                        dataKeyX: 'name',
                        dataKeyY: 'value',
                        data: top5
                    });

                    // Insight
                    insights.push(`**Market Leader**: The top performing ${catCol} is **${top5[0].name}**, contributing **${Number(top5[0].value).toLocaleString()}** to the total ${numCol}.`);
                }

                // Strategy C: Distribution (Pie) - Another Numeric Column or same one
                if (catCols.length > 0 && numericCols.length > 0) {
                    const catCol = catCols[0];
                    const numCol = numericCols.length > 1 ? numericCols[1] : numericCols[0];

                    // Aggregate
                    const grouped = cleanData.reduce((acc, curr) => {
                        const key = curr[catCol] || 'Unknown';
                        acc[key] = (acc[key] || 0) + (curr[numCol] || 0);
                        return acc;
                    }, {} as Record<string, number>);

                    const aggregatedData = Object.entries(grouped).map(([name, value]) => ({ name, value }));
                    const total = aggregatedData.reduce((sum, item) => sum + (item.value as number), 0);

                    // Filter distinct categories for pie (limit to 6)
                    const sorted = aggregatedData.sort((a, b) => (b.value as number) - (a.value as number)).slice(0, 6);

                    charts.push({
                        id: 'dist-pie',
                        type: 'pie',
                        title: `${numCol} Distribution`,
                        description: `Breakdown of ${numCol} usage across major ${catCol} segments.`,
                        dataKeyX: 'name',
                        dataKeyY: 'value',
                        data: sorted
                    });

                    // Insight
                    const topShare = ((sorted[0].value as number) / total * 100).toFixed(1);
                    insights.push(`**Concentration Risk**: The top segment (${sorted[0].name}) accounts for **${topShare}%** of the total ${numCol}, indicating high dependency.`);
                }

                // General Stats Insights
                if (numericCols.length > 0) {
                    const col = numericCols[0];
                    const sum = cleanData.reduce((acc, r) => acc + (r[col] || 0), 0);
                    const avg = sum / cleanData.length;
                    insights.push(`**Average Performance**: The mean ${col} across all data points is **${avg.toLocaleString(undefined, { maximumFractionDigits: 1 })}**.`);
                }

                resolve({
                    summary,
                    charts,
                    insights: insights.slice(0, 7) // Limit to 7 as requested
                });
            },
            error: (err: any) => {
                reject(err instanceof Error ? err : new Error(String(err)));
            }
        });
    });
};
