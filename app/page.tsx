"use client";

import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  Upload, FileText, CheckCircle, BarChart2,
  ArrowRight, RefreshCw, Download, Layers, Shield,
  ChevronRight, MoreHorizontal, Maximize2, Bell, Search, LayoutDashboard, Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { analyzeData, AnalysisResult, ChartRecommendation } from "../lib/ai-analyst";

// Professional Enterprise Palette (No gradients)
const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#6B7280'];

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
    <div className="min-h-screen w-full bg-slate-50 flex font-sans text-slate-900">

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed h-full inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 tracking-tight">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm shadow-blue-200">
              <Layers size={18} />
            </div>
            InsightFlow
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Workspace</div>
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem icon={<FileText size={18} />} label="All Reports" />
          <SidebarItem icon={<BarChart2 size={18} />} label="Analytics" />
          <div className="px-3 mt-8 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Settings</div>
          <SidebarItem icon={<Settings size={18} />} label="Configuration" />
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium text-xs">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">Jane Doe</p>
              <p className="text-xs text-slate-500 truncate">Marketing Lead</p>
            </div>
            <Settings size={14} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">

        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer transition-colors">Workspace</span>
            <ChevronRight size={14} />
            <span className="text-sm font-semibold text-slate-900">Q3 Marketing Analysis</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search insights..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64" />
            </div>
            <button className="relative w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-6xl mx-auto w-full">

          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Analytics Overview</h1>
              <p className="text-slate-500">Upload your raw data to generate an automated executive summary.</p>
            </div>
            {result && (
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm flex items-center gap-2">
                  <RefreshCw size={14} /> Reset
                </button>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm shadow-slate-300 flex items-center gap-2">
                  <Download size={14} /> Export Report
                </button>
              </div>
            )}
          </div>

          {/* Analysis Workspace */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Left Column: Upload & Status */}
            <div className="xl:col-span-2 space-y-8">

              {/* Upload Area */}
              {!result && !loading && (
                <div
                  onClick={triggerUpload}
                  className="group relative border-2 border-dashed border-slate-300 rounded-xl p-12 bg-white hover:bg-slate-50/50 hover:border-blue-400 transition-all cursor-pointer flex flex-col items-center justify-center text-center shadow-sm"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Simply drop your CSV file here</h3>
                  <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                    Our AI automatically analyzes columns, detects dates, and identifies key metrics for instant visualization.
                  </p>
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/30 transition-all">
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
              )}

              {/* Processing State */}
              {loading && (
                <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center text-center h-[400px]">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyzing Data Structure</h3>
                  <p className="text-slate-500 text-sm">{loadingStep}</p>
                </div>
              )}

              {/* Results: Charts */}
              {result && (
                <div className="space-y-8">
                  {/* Summary Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard label="Total Rows" value={result.summary.totalRows.toLocaleString()} />
                    <MetricCard label="Columns" value={result.summary.totalColumns} />
                    <MetricCard label="Numeric Fields" value={result.summary.numericColumns.length} />
                    <MetricCard label="Categories" value={result.summary.categoricalColumns.length} />
                  </div>

                  {/* Chart Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {result.charts.map((chart) => (
                      <div key={chart.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <div>
                            <h3 className="font-semibold text-slate-900">{chart.title}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{chart.description}</p>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600 p-1">
                            <Maximize2 size={16} />
                          </button>
                        </div>
                        <div className="p-6 h-[320px] w-full">
                          <DynamicChart chart={chart} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Status & Insights */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Pipeline Status</h4>
                <div className="space-y-4">
                  <StatusStep label="System Ready" status="completed" />
                  <StatusStep label="Data Upload" status={loading || result ? "completed" : "active"} />
                  <StatusStep label="Structure Analysis" status={loading ? "processing" : result ? "completed" : "waiting"} />
                  <StatusStep label="Insight Generation" status={result ? "completed" : "waiting"} />
                </div>
              </div>

              {/* Insights Panel */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white border border-blue-100 rounded-xl shadow-sm p-0 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-blue-50 bg-blue-50/30 flex items-center gap-2">
                    <Shield size={16} className="text-blue-600" />
                    <h4 className="font-semibold text-slate-900">AI Strategic Insights</h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {result.insights.map((insight, i) => (
                      <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex gap-3 group">
                        <span className="flex-shrink-0 w-5 h-5 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <div className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                          <span dangerouslySetInnerHTML={{
                            __html: insight.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-slate-900">$1</span>')
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                      View All Observations
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Styled Components
// ----------------------------------------------------------------------

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`px-3 py-2 rounded-lg flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${active
      ? 'bg-blue-50 text-blue-700'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}>
      {icon}
      {label}
    </div>
  )
}

function StatusStep({ label, status }: { label: string, status: 'waiting' | 'active' | 'processing' | 'completed' }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ring-4 ${status === 'completed' ? 'bg-emerald-500 ring-emerald-50' :
        status === 'processing' ? 'bg-blue-500 ring-blue-50 animate-pulse' :
          status === 'active' ? 'bg-slate-400 ring-slate-100' :
            'bg-slate-200 ring-slate-50'
        }`} />
      <span className={`text-sm ${status === 'completed' ? 'text-slate-900 font-medium' :
        status === 'processing' ? 'text-blue-600 font-medium' :
          status === 'active' ? 'text-slate-700' :
            'text-slate-400'
        }`}>
        {label}
      </span>
      {status === 'completed' && <CheckCircle size={14} className="ml-auto text-emerald-500" />}
    </div>
  )
}

function MetricCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  )
}


function CommonAxis({ chart }: { chart: ChartRecommendation }) {
  return (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
      <XAxis
        dataKey={chart.dataKeyX}
        stroke="#94A3B8"
        fontSize={11}
        tickLine={false}
        axisLine={{ stroke: '#E2E8F0' }}
        tickFormatter={(val) => String(val).slice(0, 10)}
        dy={10}
      />
      <YAxis
        stroke="#94A3B8"
        fontSize={11}
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
      />
      <Tooltip
        cursor={{ fill: '#F8FAFC' }}
        contentStyle={{
          backgroundColor: '#fff',
          borderColor: '#E2E8F0',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          fontSize: '12px',
          padding: '8px 12px'
        }}
        itemStyle={{ color: '#1E293B', fontWeight: 500 }}
        labelStyle={{ color: '#64748B', marginBottom: '4px' }}
      />
    </>
  );
}

function DynamicChart({ chart }: { chart: ChartRecommendation }) {
  if (chart.type === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${chart.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CommonAxis chart={chart} />
          <Area
            type="monotone"
            dataKey={chart.dataKeyY}
            stroke="#2563EB"
            strokeWidth={2}
            fill={`url(#grad-${chart.id})`}
            activeDot={{ r: 4, fill: '#1E40AF', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CommonAxis chart={chart} />
          <Bar
            dataKey={chart.dataKeyY}
            fill="#3B82F6"
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

  return <div className="flex items-center justify-center h-full text-sm text-slate-400">Visualization not available</div>;
}
