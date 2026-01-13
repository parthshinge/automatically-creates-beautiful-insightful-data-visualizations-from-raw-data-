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

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[var(--foreground)]">
              Data Analytics for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Marketing Leaders</span>
            </h1>

            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Turn messy CSV exports into beautiful, client-ready reports in seconds. No coding, no complex setup. Just drop your file.
            </p>

            {/* Upload Card */}
            <div className="card max-w-xl mx-auto mb-8 hover:border-indigo-300 transition-colors cursor-pointer group" onClick={triggerUpload}>
              <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 bg-[var(--surface-highlight)] group-hover:bg-indigo-50/50 group-hover:border-indigo-300 transition-all flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-indigo-600 mb-2">
                  <Upload size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">Upload CSV or Excel</h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">Drag & drop or click to browse</p>
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

            <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1"><CheckCircle size={14} /> No login required</span>
              <span className="flex items-center gap-1"><CheckCircle size={14} /> Free for early access</span>
              <span className="flex items-center gap-1"><CheckCircle size={14} /> Secure processing</span>
            </div>

          </motion.div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white border-t border-[var(--border)]">
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
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
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
              className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Analyzing Data</h3>
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
      <nav className="bg-white border-b border-[var(--border)] sticky top-0 z-40">
        <div className="container h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <TrendingUp size={18} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">InsightFlow Report</h1>
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
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
                    {chart.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{chart.description}</p>
                </div>
                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                  {chart.type === 'area' ? <Activity size={18} className="text-indigo-500" /> :
                    chart.type === 'pie' ? <PieIcon size={18} className="text-pink-500" /> :
                      <BarChart3 size={18} className="text-violet-500" />}
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
          className="card border-l-4 border-l-indigo-500 bg-white"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border)] pb-4">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Strategic Insights</h2>
              <p className="text-sm text-[var(--text-secondary)]">AI-generated observations based on your data patterns.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {result.insights.map((insight, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-xl hover:bg-[var(--surface-highlight)] transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold shadow-sm">
                  {i + 1}
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed pt-1">
                  {/* Render HTML for bolding logic from AI */}
                  <span dangerouslySetInnerHTML={{
                    __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
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
    <div className={`card p-5 border ${active ? 'border-green-200 bg-green-50/50' : ''}`}>
      <p className="text-[var(--text-tertiary)] text-xs uppercase font-bold tracking-wider mb-2">{label}</p>
      <p className={`text-2xl font-bold ${active ? 'text-green-600' : 'text-[var(--foreground)]'}`}>
        {value}
      </p>
    </div>
  )
}

function DynamicChart({ chart }: { chart: ChartRecommendation }) {
  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 shadow-xl rounded-lg p-3 text-sm">
          <p className="font-semibold text-gray-900 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 rounded-full" style={{ background: entry.color || entry.fill }}></div>
              <span>{entry.name}:</span>
              <span className="font-medium text-gray-900">
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
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
      <XAxis
        dataKey={chart.dataKeyX}
        stroke="#9ca3af"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(val) => String(val).slice(0, 10)}
        dy={10}
      />
      <YAxis
        stroke="#9ca3af"
        fontSize={12}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
        dx={-10}
      />
      <Tooltip content={<CustomTooltip />} />
    </>
  );

  if (chart.type === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CommonAxis />
          <Area
            type="monotone"
            dataKey={chart.dataKeyY}
            stroke="#4f46e5"
            strokeWidth={2}
            fill={`url(#grad-${chart.id})`}
            activeDot={{ r: 6, strokeWidth: 0 }}
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
