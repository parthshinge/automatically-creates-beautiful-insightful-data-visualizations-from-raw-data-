"use client";

import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  Upload, Zap, TrendingUp, Users, DollarSign,
  ArrowRight, Activity, PieChart as PieIcon, BarChart3,
  FileText, CheckCircle, Smartphone, Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeData, AnalysisResult, ChartRecommendation } from "../lib/ai-analyst";

const COLORS = ['#4f46e5', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];

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
      // Simulation steps for UX
      setLoadingStep("Identifying Data Structure...");
      await new Promise(r => setTimeout(r, 1000));

      setLoadingStep("Generating Visualizations...");
      const analysis = await analyzeData(file);

      setLoadingStep("Extracting Opportunities...");
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

  // --------------------------------------------------------------------------
  // LANDING PAGE VIEW
  // --------------------------------------------------------------------------
  if (!result) {
    return (
      <main className="min-h-screen relative overflow-hidden flex flex-col">
        <div className="bg-grid" />

        {/* Navigation */}
        <nav className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-[var(--foreground)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
                <Zap size={18} fill="currentColor" />
              </div>
              InsightFlow
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-[var(--text-secondary)]">
              <a href="#" className="hover:text-[var(--primary)] transition-colors">How it Works</a>
              <a href="#" className="hover:text-[var(--primary)] transition-colors">Features</a>
              <a href="#" className="hover:text-[var(--primary)] transition-colors">Pricing</a>
            </div>
            <button className="btn btn-primary text-sm">Get Started</button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center pt-20 pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New: AI Analyst Engine 2.0
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
              Data Analytics for <br />
              <span className="text-gradient">Marketing Leaders</span>
            </h1>

            <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
              Turn messy CSV exports into beautiful, client-ready reports in seconds. No coding, no complex setup. Just drop your file.
            </p>

            {/* Upload Card */}
            <div className="card max-w-xl mx-auto mb-10 group cursor-pointer border-dashed border-2 border-[var(--border)] hover:border-indigo-500/50 bg-[var(--surface-highlight)]" onClick={triggerUpload}>
              <div className="p-8 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
                  <Upload size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Upload CSV or Excel</h3>
                  <p className="text-[var(--text-tertiary)] text-sm mt-1">Drag & drop or click to browse</p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv"
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[var(--text-tertiary)]">
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> No login required</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Free for early access</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Secure processing</span>
            </div>

          </motion.div>
        </section>

        {/* How It Works */}
        <section className="py-24 border-t border-[var(--border)] relative bg-[var(--background)]">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">From Raw Data to Strategy</h2>
              <p className="text-[var(--text-secondary)]">Three simple steps to transform your workflow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <FileText size={24} />, title: "1. Upload Data", desc: "Export CSVs from your ad platforms or CRM." },
                { icon: <Zap size={24} />, title: "2. AI Analysis", desc: "Our engine detects trends, KPIs, and anomalies." },
                { icon: <BarChart3 size={24} />, title: "3. Get Insights", desc: "Receive a professional, visual report instantly." }
              ].map((step, i) => (
                <div key={i} className="card flex flex-col items-center text-center p-8 bg-[var(--surface)]">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/20">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{step.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0f172a]/90 backdrop-blur-md z-50 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <Zap className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Analyzing Data</h3>
                <p className="text-[var(--text-secondary)] animate-pulse">{loadingStep}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }

  // --------------------------------------------------------------------------
  // DASHBOARD VIEW
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen w-full bg-[var(--background)] pb-20">
      <div className="bg-grid" />

      <nav className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500/20 border border-indigo-500/30 rounded-lg flex items-center justify-center text-indigo-400">
              <TrendingUp size={18} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-white">InsightFlow Report</h1>
              <p className="text-xs text-[var(--text-secondary)]">Generated {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setResult(null)} className="btn btn-secondary text-sm">
              New Analysis
            </button>
            <button className="btn btn-primary text-sm flex items-center gap-2">
              <FileText size={16} /> Export PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-8 space-y-8">

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <SummaryCard label="Rows Analyzed" value={result.summary.totalRows} />
          <SummaryCard label="Metrics Found" value={result.summary.numericColumns.length} />
          <SummaryCard label="Categories" value={result.summary.categoricalColumns.length} />
          <SummaryCard label="Data Quality" value="98%" active />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {result.charts.map((chart, idx) => (
            <motion.div
              key={chart.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`card ${chart.type === 'area' ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {chart.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{chart.description}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  {chart.type === 'area' ? <Activity size={18} /> :
                    chart.type === 'pie' ? <PieIcon size={18} /> :
                      <BarChart3 size={18} />}
                </div>
              </div>

              <div className="h-[350px] w-full">
                <DynamicChart chart={chart} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card border-l-4 border-l-indigo-500"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Strategic Insights</h2>
              <p className="text-sm text-[var(--text-secondary)]">AI-generated observations based on your data patterns.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {result.insights.map((insight, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed pt-1">
                  <span dangerouslySetInnerHTML={{
                    __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                  }} />
                </p>
              </div>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}

// Sub-components

function SummaryCard({ label, value, active = false }: { label: string, value: string | number, active?: boolean }) {
  return (
    <div className={`card p-5 border ${active ? 'border-emerald-500/30 bg-emerald-500/10' : ''}`}>
      <p className="text-[var(--text-tertiary)] text-xs uppercase font-bold tracking-wider mb-2">{label}</p>
      <p className={`text-2xl font-bold ${active ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}

function DynamicChart({ chart }: { chart: ChartRecommendation }) {
  // Custom Tooltip for Recharts - Dark Mode
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e293b] border border-[#334155] shadow-xl rounded-lg p-3 text-sm">
          <p className="font-semibold text-white mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 rounded-full" style={{ background: entry.color || entry.fill }}></div>
              <span>{entry.name}:</span>
              <span className="font-medium text-white">
                {typeof entry.value === 'number' && entry.value > 1000
                  ? entry.value.toLocaleString()
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CommonAxis = () => (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
      <XAxis
        dataKey={chart.dataKeyX}
        stroke="#94a3b8"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(val) => String(val).slice(0, 10)}
        dy={10}
      />
      <YAxis
        stroke="#94a3b8"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
        dx={-10}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
    </>
  );

  if (chart.type === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CommonAxis />
          <Area
            type="monotone"
            dataKey={chart.dataKeyY}
            stroke="#818cf8"
            strokeWidth={2}
            fill={`url(#grad-${chart.id})`}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
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
            fill="#a78bfa"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
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
            stroke="none"
          >
            {chart.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return <div>Unsupported chart type</div>;
}
