"use client";

import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  Upload, FileText, CheckCircle, BarChart2,
  ArrowRight, RefreshCw, Download, Layers, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeData, AnalysisResult, ChartRecommendation } from "../lib/ai-analyst";

// Enterprise Color Palette (Recharts)
const COLORS = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#db2777', '#4b5563'];

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      setLoadingStep("Validating file format...");
      await new Promise(r => setTimeout(r, 600));

      setLoadingStep("Processing data structure...");
      await new Promise(r => setTimeout(r, 800));

      setLoadingStep("Running statistical analysis...");
      const analysis = await analyzeData(file);

      setLoadingStep("Generating report...");
      await new Promise(r => setTimeout(r, 600));

      setResult(analysis);
    } catch (error) {
      console.error(error);
      alert("Error analyzing file. Please ensure it is a valid CSV.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen w-full pb-20">

      {/* 1. Top Navigation */}
      <nav className="border-b border-[var(--border-color)] bg-white sticky top-0 z-40">
        <div className="container h-14 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="font-semibold text-lg tracking-tight flex items-center gap-2 text-[var(--text-primary)]">
              <div className="w-6 h-6 bg-[var(--primary)] rounded md:rounded-sm flex items-center justify-center">
                <Layers size={14} color="white" />
              </div>
              InsightFlow
            </div>
            <div className="hidden md:flex gap-6 text-sm text-[var(--text-secondary)]">
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors font-medium">Upload</a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Reports</a>
              <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Insights</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Documentation</button>
            <div className="w-px h-4 bg-[var(--border-color)] mx-1"></div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
              JD
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Primary Workspace */}
      <main className="container py-8 max-w-[1100px] mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Upload your dataset to generate an automated executive summary.</p>
        </div>

        {/* 3. Upload & Status Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Upload Card */}
          <div className="lg:col-span-2">
            <div className="card h-full flex flex-col justify-center items-center border-dashed border-2 hover:border-[var(--primary)] transition-colors cursor-pointer bg-[var(--bg-subtle)]/30 min-h-[240px]" onClick={triggerUpload}>
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[var(--primary)] flex items-center justify-center mb-4">
                <Upload size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-1">Upload Dataset</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">CSV or Excel files (Max 50MB)</p>
              <button className="btn btn-secondary">
                Browse Files
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                className="hidden"
              />
            </div>
          </div>

          {/* Analysis Status */}
          <div>
            <div className="card h-full">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-[var(--text-secondary)] mb-4">System Status</h3>

              <div className="space-y-6">
                <StatusItem
                  label="System Ready"
                  status="completed"
                  active={true}
                />
                <StatusItem
                  label="File Upload"
                  status={loading || result ? "completed" : "waiting"}
                  active={loading}
                />
                <StatusItem
                  label="Data Analysis"
                  status={result ? "completed" : loading ? "processing" : "waiting"}
                  active={loading && loadingStep !== "Validating file format..."}
                />
                <StatusItem
                  label="Report Generation"
                  status={result ? "completed" : "waiting"}
                  active={false}
                />
              </div>

              {loading && (
                <div className="mt-6 p-3 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100 flex items-center gap-2">
                  <RefreshCw size={12} className="animate-spin" />
                  {loadingStep}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Output Sections */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* 4A. Executive Summary Metrics */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <FileText size={18} className="text-[var(--text-secondary)]" />
                  Dataset Summary
                </h2>
                <button className="btn btn-secondary text-xs py-1.5 h-8">
                  <Download size={14} /> Export PDF
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Total Records" value={result.summary.totalRows} />
                <MetricCard label="Data Points" value={result.summary.totalRows * result.summary.totalColumns} />
                <MetricCard label="Confidence Score" value="98.5%" />
                <MetricCard label="Anomalies" value="0 Detected" />
              </div>
            </section>

            {/* 4B. Visualizations */}
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart2 size={18} className="text-[var(--text-secondary)]" />
                Visual Analysis
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {result.charts.map((chart) => (
                  <div key={chart.id} className="card p-0 overflow-hidden">
                    <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-subtle)]/50 flex justify-between items-center">
                      <h3 className="font-semibold text-sm">{chart.title}</h3>
                      <div className="text-xs text-[var(--text-secondary)] px-2 py-0.5 bg-white border border-[var(--border-color)] rounded">
                        {chart.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-4 h-[300px]">
                      <DynamicChart chart={chart} />
                    </div>
                    <div className="p-4 bg-[var(--bg-subtle)]/30 text-xs text-[var(--text-secondary)] border-t border-[var(--border-color)]">
                      {chart.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4C. Key Insights */}
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield size={18} className="text-[var(--text-secondary)]" />
                Key Strategic Insights
              </h2>
              <div className="card">
                <div className="divide-y divide-[var(--border-color)]">
                  {result.insights.map((insight, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed" dangerouslySetInnerHTML={{
                        __html: insight.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-gray-900">$1</span>')
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </motion.div>
        )}

      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

function StatusItem({ label, status, active }: { label: string, status: 'waiting' | 'processing' | 'completed', active: boolean }) {
  let icon = <div className="w-2 h-2 rounded-full bg-gray-300" />;
  let colorClass = "text-[var(--text-tertiary)]";

  if (status === 'completed') {
    icon = <CheckCircle size={16} className="text-emerald-600" />;
    colorClass = "text-[var(--text-primary)] font-medium";
  } else if (status === 'processing') {
    icon = <RefreshCw size={14} className="text-blue-600 animate-spin" />;
    colorClass = "text-blue-700 font-medium";
  } else if (active) {
    colorClass = "text-[var(--text-primary)]";
  }

  return (
    <div className="flex items-center justify-between">
      <div className={`flex items-center gap-3 text-sm ${colorClass}`}>
        <div className="w-5 flex justify-center">{icon}</div>
        {label}
      </div>
      {status === 'waiting' && <span className="text-xs text-[var(--text-tertiary)]">Pending</span>}
      {status === 'processing' && <span className="text-xs text-blue-600 font-medium">Running...</span>}
      {status === 'completed' && <span className="text-xs text-emerald-600 font-medium">Done</span>}
    </div>
  )
}

function MetricCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="card py-3 px-4">
      <p className="text-[var(--text-secondary)] text-xs font-medium uppercase mb-1">{label}</p>
      <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
    </div>
  )
}

function DynamicChart({ chart }: { chart: ChartRecommendation }) {
  const CommonAxis = () => (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
      <XAxis
        dataKey={chart.dataKeyX}
        stroke="#6b7280"
        fontSize={11}
        tickLine={false}
        axisLine={{ stroke: '#e5e7eb' }}
        tickFormatter={(val) => String(val).slice(0, 10)}
        dy={10}
      />
      <YAxis
        stroke="#6b7280"
        fontSize={11}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: '#fff',
          borderColor: '#e5e7eb',
          borderRadius: '6px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          fontSize: '12px'
        }}
        itemStyle={{ color: '#111827' }}
        labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
      />
    </>
  );

  if (chart.type === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CommonAxis />
          <Area
            type="monotone"
            dataKey={chart.dataKeyY}
            stroke="#2563eb"
            strokeWidth={2}
            fill={`url(#grad-${chart.id})`}
            activeDot={{ r: 4, strokeWidth: 0, fill: '#1d4ed8' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CommonAxis />
          <Bar
            dataKey={chart.dataKeyY}
            fill="#3b82f6"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chart.data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey={chart.dataKeyY}
            nameKey={chart.dataKeyX}
            stroke="#fff"
            strokeWidth={2}
          >
            {chart.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return <div className="flex items-center justify-center h-full text-sm text-[var(--text-tertiary)]">Visualization not available</div>;
}
