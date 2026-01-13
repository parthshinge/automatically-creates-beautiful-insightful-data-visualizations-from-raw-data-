
"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import {
  Upload, Zap, TrendingUp, Users, DollarSign,
  ArrowRight, Activity, PieChart as PieIcon, BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data Types
type DataPoint = {
  name: string;
  revenue: number;
  spend: number;
  roas: number;
};

// Initial Mock Data
const generateMockData = (): DataPoint[] => [
  { name: 'Jan', revenue: 45000, spend: 12000, roas: 3.75 },
  { name: 'Feb', revenue: 52000, spend: 13500, roas: 3.85 },
  { name: 'Mar', revenue: 48000, spend: 15000, roas: 3.2 },
  { name: 'Apr', revenue: 61000, spend: 18000, roas: 3.38 },
  { name: 'May', revenue: 55000, spend: 14000, roas: 3.92 },
  { name: 'Jun', revenue: 67000, spend: 16500, roas: 4.06 },
  { name: 'Jul', revenue: 72000, spend: 19000, roas: 3.79 },
];

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981'];

export default function Home() {
  const [data, setData] = useState<DataPoint[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate AI Analysis
  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 1500);
  };

  if (!data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6 text-sm font-medium text-pink-400 border-pink-500/30">
            <Zap size={14} />
            <span>AI-Powered Analytics for Agencies</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            Turn Raw Data into <span className="heading-gradient">Actionable Insights</span>
          </h1>

          <p className="text-xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your marketing CSVs and let our AI build beautiful, client-ready visualizations instantly. No coding required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleAnalyze}
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Upload size={20} />
              Import Data
            </button>
            <button className="px-8 py-4 rounded-xl glass hover:bg-white/5 transition-all font-medium flex items-center gap-2">
              Watch Demo <ArrowRight size={16} />
            </button>
          </div>

          {/* Feature Grid Mini */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">
            {[
              { icon: <Activity size={20} className="text-blue-400" />, title: "Real-time Tracking", desc: "Monitor campaign performance live." },
              { icon: <PieIcon size={20} className="text-purple-400" />, title: "Smart Segmentation", desc: "Auto-cluster audience based on ROI." },
              { icon: <BarChart3 size={20} className="text-pink-400" />, title: "Automated Reports", desc: "Generate white-label PDF reports." }
            ].map((f, i) => (
              <div key={i} className="glass p-5 rounded-xl border border-white/5">
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {loading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl font-medium animate-pulse">Analyzing Data Structure...</p>
            </div>
          </div>
        )}
      </main>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen w-full relative">
      <nav className="border-b border-white/10 glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={18} color="white" />
            </div>
            InsightFlow
          </div>

          <div className="flex gap-2">
            <button onClick={() => setData(null)} className="text-sm text-gray-400 hover:text-white transition-colors">
              Upload New File
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500"></div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Campaign Overview</h2>
            <p className="text-gray-400">Analysis for Q1-Q2 2026 • Marketing Agencies Cohort</p>
          </div>
          <div className="flex gap-2">
            {['Overview', 'Channels', 'Demographics'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.toLowerCase()
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass text-gray-300 hover:bg-white/5'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard title="Total Revenue" value="$400,000" change="+12.5%" icon={<DollarSign size={20} />} color="text-green-400" />
          <KpiCard title="Total Ad Spend" value="$108,000" change="+5.2%" icon={<TrendingUp size={20} />} color="text-blue-400" />
          <KpiCard title="Avg. ROAS" value="3.7x" change="-0.4%" icon={<Zap size={20} />} color="text-yellow-400" />
          <KpiCard title="New Clients" value="1,240" change="+18.2%" icon={<Users size={20} />} color="text-pink-400" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass-card lg:col-span-2 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Revenue vs Spend Trend
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                <Area type="monotone" dataKey="spend" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" name="Ad Spend" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-6">Budget Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Google Ads', value: 400 },
                    { name: 'Meta Ads', value: 300 },
                    { name: 'TikTok', value: 300 },
                    { name: 'LinkedIn', value: 200 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {[
                { n: "Google Ads", v: "40%", c: COLORS[0] },
                { n: "Meta Ads", v: "25%", c: COLORS[1] },
                { n: "TikTok", v: "20%", c: COLORS[2] },
                { n: "LinkedIn", v: "15%", c: COLORS[3] },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 rounded-full" style={{ background: item.c }}></span>
                    {item.n}
                  </span>
                  <span className="font-semibold">{item.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="glass-card border-l-4 border-l-indigo-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <Zap className="text-indigo-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">AI-Generated Key Insights</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Based on the uploaded data, your **ROAS efficiency checks** indicate a strong correlation between **TikTok Creative updates** and revenue spikes in June.
                Consider reallocating 15% of LinkedIn budget to TikTok for Q3 to maximize the current trend.
              </p>
              <div className="flex gap-3">
                <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">High Confidence</span>
                <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">Growth Opp</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

function KpiCard({ title, value, change, icon, color }: { title: string, value: string, change: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="glass-card hover:bg-white/[0.03]">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 bg-white/5 rounded-lg ${color}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'} bg-white/5 px-2 py-1 rounded`}>
          {change}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <h4 className="text-3xl font-bold">{value}</h4>
    </div>
  )
}
