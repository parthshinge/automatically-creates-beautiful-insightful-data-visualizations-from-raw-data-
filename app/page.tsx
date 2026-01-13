"use client";

import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  Upload, Zap, TrendingUp, ArrowRight, Activity, PieChart as PieIcon, FileText, CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { analyzeData, AnalysisResult, ChartRecommendation } from "../lib/ai-analyst";

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLoadingStep("Reading File...");

    try {
      setLoadingStep("Identifying Data Types...");
      // Artificial delay to make it feel like "Deep Analysis"
      await new Promise(r => setTimeout(r, 800));

      setLoadingStep("Generating Visualizations...");
      const analysis = await analyzeData(file);

      setLoadingStep("Extracting Strategic Insights...");
      await new Promise(r => setTimeout(r, 800));

      setResult(analysis);
    } catch (error) {
      console.error(error);
      alert("Error analyzing file. Please ensure it is a valid CSV.");
    } finally {
      setLoading(false);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (!result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".csv"
          className="hidden"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6 text-sm font-medium text-pink-400 border-pink-500/30">
            <Zap size={14} />
            <span>AI-Powered Analytics for Agencies</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            Turn Raw Data into <span className="heading-gradient">Actionable Insights</span>
          </h1>

          <p className="text-xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your CSV files and let our AI automatically detect patterns, generate professional visual reports, and provide strategic recommendations in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={triggerUpload}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Upload size={20} />
              Upload Dataset
            </button>
            <button className="px-8 py-4 rounded-xl glass hover:bg-white/5 transition-all font-medium flex items-center gap-2 text-gray-300">
              Supported: CSV, Excel <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left relative">
            {[
              { icon: <Activity size={20} className="text-blue-400" />, title: "Auto-Analysis", desc: "Instantly detects numeric trends and categorical splits." },
              { icon: <PieIcon size={20} className="text-purple-400" />, title: "Smart Visuals", desc: "Selects the perfect chart type for your specific data." },
              { icon: <FileText size={20} className="text-pink-400" />, title: "Executive Summary", desc: "Generates written insights for stakeholder reports." }
            ].map((f, i) => (
              <div key={i} className="glass p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {loading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <Zap className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Analyzing Data</h3>
              <p className="text-gray-400 animate-pulse">{loadingStep}</p>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <div className="min-h-screen w-full relative pb-20">
      <div className="grid-bg" />

      <nav className="border-b border-white/10 glass sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} color="white" />
            </div>
            InsightFlow <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-400 font-normal">Auto-Generated Report</span>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setResult(null)} className="text-sm px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-gray-300">
              Analyze New File
            </button>
            <button className="btn-primary text-sm px-4 py-2">
              Export PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Section 1: Dataset Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <SummaryCard label="Total Rows" value={result.summary.totalRows} />
          <SummaryCard label="Columns Identified" value={result.summary.totalColumns} />
          <SummaryCard label="Numeric Fields" value={result.summary.numericColumns.length} />
          <SummaryCard label="Date Ranges" value={result.summary.dateColumns.length > 0 ? "Detected" : "None"} />
        </motion.section>

        {/* Section 2: Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {result.charts.map((chart, idx) => (
            <motion.div
              key={chart.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card flex flex-col ${chart.type === 'area' ? 'lg:col-span-2' : ''}`}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {chart.title}
                </h3>
                <p className="text-sm text-gray-400">{chart.description}</p>
              </div>

              <div className="flex-1 min-h-[350px] w-full">
                <DynamicChart chart={chart} />
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400">
                  AI analyzed <strong>{chart.data.length} records</strong> to generate this view.
                  Focus on peaks in {chart.dataKeyX} for maximum impact.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 3: Key Insights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card border-l-4 border-l-indigo-500"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Zap className="text-indigo-400" size={24} />
            </div>
            <h2 className="text-xl font-bold">Key Strategic Insights</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {result.insights.map((insight, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold font-mono">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{
                    __html: insight.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-semibold">$1</span>')
                  }} />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}

// Sub-components

function SummaryCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="glass p-6 rounded-xl border-l border-t border-white/10">
      <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-medium">{label}</p>
      <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-indigo-200">
        {value}
      </p>
    </div>
  )
}

function DynamicChart({ chart }: { chart: ChartRecommendation }) {
  const CommonAxis = () => (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
      <XAxis
        dataKey={chart.dataKeyX}
        stroke="#71717a"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(val) => String(val).slice(0, 10)}
      />
      <YAxis
        stroke="#71717a"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
      />
      <Tooltip
        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
        labelStyle={{ color: '#a1a1aa' }}
      />
    </>
  );

  if (chart.type === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CommonAxis />
          <Area
            type="monotone"
            dataKey={chart.dataKeyY}
            stroke="#6366f1"
            strokeWidth={3}
            fill={`url(#grad-${chart.id})`}
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
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
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
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey={chart.dataKeyY}
            nameKey={chart.dataKeyX}
          >
            {chart.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return <div>Unsupported chart type</div>;
}
