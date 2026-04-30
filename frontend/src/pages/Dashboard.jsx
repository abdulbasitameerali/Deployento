import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const trafficData = [
  { name: 'Mon', traffic: 400 },
  { name: 'Tue', traffic: 300 },
  { name: 'Wed', traffic: 550 },
  { name: 'Thu', traffic: 450 },
  { name: 'Fri', traffic: 700 },
  { name: 'Sat', traffic: 600 },
  { name: 'Sun', traffic: 900 },
];

const Dashboard = () => {
    const auth = useAuth();
    if (!auth || auth.loading) return <div className="min-h-screen bg-white text-[#1A1A1A] flex items-center justify-center font-bold">Verifying Session...</div>;
    if (!auth.user) return null;
    return <DashboardContent auth={auth} />;
};

const DashboardContent = ({ auth }) => {
    const { user, updateDeployments, logout } = auth;
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
    const [region, setRegion] = useState('PK');
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // Deploy State
    const [slug, setSlug] = useState('');
    const [file, setFile] = useState(null);
    const [buildLogs, setBuildLogs] = useState([]);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployResult, setDeployResult] = useState(null);
    const socketRef = useRef(null);

    // Feature States
    const [envKey, setEnvKey] = useState('');
    const [envValue, setEnvValue] = useState('');
    const [envVars, setEnvVars] = useState(user.envVars || {});
    const [stageMode, setStageMode] = useState('production');
    const [showConfetti, setShowConfetti] = useState(false);
    const [edgeCode, setEdgeCode] = useState('// Edge Function — Contact Form Handler\nmodule.exports = async (req, res) => {\n  const { name, email, message } = req.body;\n  // TODO: send to your email service\n  res.json({ success: true });\n};');

    useEffect(() => {
        const socket = io('');
        socketRef.current = socket;
        socket.on('build_log', (data) => {
            setBuildLogs(prev => [...prev, data]);
        });
        return () => socket.disconnect();
    }, []);

    const handleDeploy = async (e) => {
        e.preventDefault();
        if (!file || !slug) return;
        setIsDeploying(true);
        setDeployResult(null);
        setBuildLogs([{ msg: '⚡ Connection established. Starting build...', timestamp: new Date() }]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('slug', slug);
        formData.append('userId', user.id);
        formData.append('socketId', socketRef.current?.id || '');

        try {
            const res = await fetch('/api/deploy', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) {
                const liveUrl = data.userDeployments?.[0]?.url || `/deployments/${slug}/index.html`;
                setDeployResult({ success: true, url: liveUrl });
                updateDeployments(data.userDeployments);
                setBuildLogs(prev => [...prev, { msg: `✅ LIVE! Your site is deployed at: ${liveUrl}`, timestamp: new Date() }]);
            } else {
                setDeployResult({ success: false, error: data.error || 'Deployment failed' });
                setBuildLogs(prev => [...prev, { msg: `❌ ERROR: ${data.error}`, timestamp: new Date() }]);
            }
        } catch (err) {
            setDeployResult({ success: false, error: 'Server unreachable.' });
            setBuildLogs(prev => [...prev, { msg: `❌ Connection failed: ${err.message}`, timestamp: new Date() }]);
        } finally {
            setIsDeploying(false);
        }
    };

    const handleRollback = async (dep) => {
        try {
            const res = await fetch('/api/rollback', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, slug: dep.slug, historyPath: dep.historyPath })
            });
            const data = await res.json();
            if (data.success) alert(`✅ Rolled back "${dep.slug}" successfully!`);
            else alert('❌ Rollback failed: ' + (data.error || 'Unknown error'));
        } catch (err) { alert('❌ Server error: ' + err.message); }
    };

    const handleDelete = async (slug) => {
        if (!confirm(`Are you sure you want to permanently delete "${slug}"?`)) return;
        try {
            const res = await fetch('/api/delete-project', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, slug })
            });
            const data = await res.json();
            if (data.success) {
                updateDeployments(data.userDeployments);
                alert(`🗑️ Project "${slug}" deleted.`);
            }
        } catch (err) { alert('❌ Server error: ' + err.message); }
    };

    const handleAddEnv = async () => {
        if (!envKey || !envValue) return;
        try {
            const res = await fetch('/api/env-vars', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, key: envKey, value: envValue })
            });
            const data = await res.json();
            if (data.success) { setEnvVars(data.envVars); setEnvKey(''); setEnvValue(''); }
        } catch (err) { console.error(err); }
    };

    const limits = { 'Starter': 3, 'Pro': 20, 'Plus': 100 };
    const uniqueSlugs = [...new Set((user.deployments || []).map(d => d.slug))];
    const currentCount = uniqueSlugs.length;
    const limit = limits[user.plan] || 3;
    const usagePercent = Math.min((currentCount / limit) * 100, 100);

    const SidebarItem = ({ id, label, icon, badge }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === id ? 'bg-[#457BFF] text-white shadow-md' : 'text-[#666666] hover:bg-[#F8FAFC] hover:text-[#1A1A1A]'
            }`}
        >
            <span className="text-base">{icon}</span> 
            {label}
            {badge && <span className="ml-auto w-2 h-2 rounded-full bg-[#00F3FF] animate-pulse"></span>}
        </button>
    );

    return (
        <div className={`min-h-screen flex font-sans ${isDarkMode ? 'bg-[#0D0D0D] text-white' : 'bg-white text-[#1A1A1A]'}`}>
            {/* SIDEBAR */}
            <aside className={`w-64 border-r p-6 flex flex-col hidden lg:flex ${isDarkMode ? 'border-white/10 bg-[#0D0D0D]' : 'border-[#E2E8F0] bg-white'}`}>
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="flex gap-0.5">
                        <div className="w-5 h-5 bg-[#457BFF] rounded-sm"></div>
                        <div className="w-5 h-5 bg-[#00F3FF] rounded-sm rounded-tr-lg"></div>
                    </div>
                    <span className="text-xl font-black tracking-tighter">deployento</span>
                </div>
                
                <nav className="flex-1 space-y-1">
                    <div className="text-[10px] font-bold text-[#666666] uppercase tracking-widest px-2 mb-3">Main</div>
                    <SidebarItem id="dashboard" label="Overview" icon="▦" />
                    <SidebarItem id="projects" label="Projects" icon="📂" />
                    <SidebarItem id="deployments" label="History" icon="🕒" />
                    
                    <div className="text-[10px] font-bold text-[#666666] uppercase tracking-widest px-2 mb-3 mt-6">DevOps</div>
                    <SidebarItem id="pipeline" label="Build Pipeline" icon="⛓" />
                    <SidebarItem id="staging" label="Staging" icon="🔀" />
                    <SidebarItem id="env" label="Env Variables" icon="🔑" />
                    <SidebarItem id="edge" label="Edge Functions" icon="⚡" />

                    <div className="text-[10px] font-bold text-[#666666] uppercase tracking-widest px-2 mb-3 mt-6">Security & Ops</div>
                    <SidebarItem id="audit" label="AI Audit" icon="🤖" />
                    <SidebarItem id="domains" label="Domains" icon="🌐" />
                </nav>

                <div className={`mt-auto pt-6 border-t flex flex-col gap-4 px-2 ${isDarkMode ? 'border-white/10' : 'border-[#E2E8F0]'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#457BFF]/10 flex items-center justify-center text-[#457BFF] font-bold">
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 truncate">
                            <div className="text-xs font-bold truncate">{user.email}</div>
                            <div className="text-[10px] opacity-60 font-bold uppercase">{user.plan}</div>
                        </div>
                    </div>
                    <button 
                        onClick={() => { if(confirm('Are you sure you want to sign out?')) logout(); }} 
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            isDarkMode 
                            ? 'border-white/10 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20' 
                            : 'border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-200'
                        }`}
                    >
                        <span>🚪</span> Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN WORKSPACE */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto h-screen relative">
                {/* TOP BAR */}
                <div className="absolute top-8 right-12 flex gap-4 items-center z-10">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${isDarkMode ? 'border-white/20 bg-white/5' : 'border-[#E2E8F0] bg-[#F8FAFC]'}`}>
                        {isDarkMode ? '🌙' : '☀️'}
                    </button>
                    <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-xl text-xs font-bold cursor-pointer ${isDarkMode ? 'border-white/20 bg-white/5' : 'border-[#E2E8F0] bg-[#F8FAFC]'}`}>
                        <span>{region === 'PK' ? '🇵🇰' : region === 'US' ? '🇺🇸' : '🇩🇪'}</span> {region} <span className="text-[8px]">▼</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {/* ========== OVERVIEW ========== */}
                    {activeTab === 'dashboard' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className={`rounded-3xl p-10 mb-8 flex justify-between items-center shadow-sm ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-[#F8FAFC] border border-[#E2E8F0]'}`}>
                                <div>
                                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Welcome, {user.email.split('@')[0]}</h1>
                                    <p className="opacity-60 font-medium">Infrastructure active in {region === 'PK' ? 'Lahore (PK-01)' : 'US-EAST'}.</p>
                                </div>
                                <button onClick={() => setIsDeployModalOpen(true)} className="bg-[#457BFF] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all">
                                    Launch New Project +
                                </button>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6">
                                <div className={`rounded-2xl p-6 shadow-sm col-span-2 ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-[#F8FAFC] border border-[#E2E8F0]'}`}>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold">Live Traffic Pulse</h3>
                                        <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Real-time stats</span>
                                    </div>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={trafficData}>
                                                <defs>
                                                    <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#457BFF" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#457BFF" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#999' : '#666', fontSize: 12}} dy={10} />
                                                <Tooltip contentStyle={{ borderRadius: '16px', background: isDarkMode ? '#1A1A1A' : '#fff', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                                                <Area type="monotone" dataKey="traffic" stroke="#457BFF" strokeWidth={4} fillOpacity={1} fill="url(#pulseGrad)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className={`rounded-2xl p-6 shadow-sm ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-[#F8FAFC] border border-[#E2E8F0]'}`}>
                                        <h3 className="font-bold mb-4">Resource Quota</h3>
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">
                                            <span>Slots Used</span>
                                            <span>{currentCount} / {limit}</span>
                                        </div>
                                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-inner'}`}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${usagePercent}%` }} className="h-full bg-gradient-to-r from-[#457BFF] to-[#00F3FF]"></motion.div>
                                        </div>
                                        <div className="mt-4 text-[11px] font-bold text-[#457BFF]">{user.plan} Subscription</div>
                                    </div>

                                    <div className={`rounded-2xl p-6 shadow-sm flex items-center justify-between ${isDarkMode ? 'bg-[#00F3FF]/10 border border-[#00F3FF]/20' : 'bg-[#00F3FF]/5 border border-[#00F3FF]/20'}`}>
                                        <div>
                                            <div className="text-[10px] font-black text-[#00F3FF] uppercase tracking-widest mb-1">AI Health Score</div>
                                            <div className="text-2xl font-black">94%</div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-4 border-[#00F3FF]/30 border-t-[#00F3FF] animate-spin"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ========== PROJECTS ========== */}
                    {activeTab === 'projects' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black tracking-tight">Active Projects</h2>
                                <button onClick={() => setIsDeployModalOpen(true)} className="bg-[#457BFF] text-white px-5 py-2.5 rounded-xl font-bold text-sm">New +</button>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {uniqueSlugs.map((slug, i) => {
                                    const dep = user.deployments.find(d => d.slug === slug);
                                    return (
                                        <div key={i} className={`rounded-2xl p-6 border transition-all hover:shadow-xl hover:-translate-y-1 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-10 h-10 rounded-xl bg-[#457BFF]/10 flex items-center justify-center text-xl">🌐</div>
                                                <span className="bg-[#00F3FF]/10 text-[#00F3FF] text-[9px] font-black px-2 py-1 rounded-full uppercase">Active</span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{slug}</h3>
                                            <div className="text-xs opacity-50 font-mono truncate mb-6">{dep.url}</div>
                                            <div className="flex gap-2">
                                                <a href={dep.url} target="_blank" rel="noreferrer" className="flex-1 text-center py-2 bg-[#457BFF] text-white text-[10px] font-bold rounded-lg">Visit</a>
                                                <button onClick={() => handleDelete(slug)} className="w-10 flex items-center justify-center bg-rose-500/10 text-rose-500 rounded-lg">🗑</button>
                                            </div>
                                        </div>
                                    );
                                })}
                                {uniqueSlugs.length === 0 && <div className="col-span-3 py-20 text-center opacity-30 font-bold">No projects found. Launch your first one!</div>}
                            </div>
                        </motion.div>
                    )}

                    {/* ========== DEPLOYMENTS / HISTORY ========== */}
                    {activeTab === 'deployments' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-3xl font-black tracking-tight mb-8">Deployment History</h2>
                            <div className="space-y-4">
                                {user.deployments?.map((dep, i) => (
                                    <div key={i} className={`p-5 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xs font-bold text-slate-400">#{user.deployments.length - i}</div>
                                            <div>
                                                <div className="font-bold">{dep.slug}</div>
                                                <div className="text-[10px] opacity-50 font-bold uppercase tracking-widest mt-1">{new Date(dep.timestamp).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            {i !== 0 && <button onClick={() => handleRollback(dep)} className="px-4 py-2 bg-amber-500/10 text-amber-600 rounded-lg text-xs font-bold">Rollback</button>}
                                            <a href={dep.url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#F8FAFC] border rounded-lg text-xs font-bold">View</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ========== PIPELINE ========== */}
                    {activeTab === 'pipeline' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-3xl font-black tracking-tight mb-4">Build Pipeline</h2>
                            <p className="opacity-50 mb-12">Visual orchestration of our AI-driven deployment engine.</p>
                            <div className="max-w-2xl relative">
                                <div className={`absolute left-[23px] top-6 bottom-6 w-0.5 ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}></div>
                                {[
                                    { t: 'Source Analysis', d: 'Scanning files and resolving structure', s: 'done' },
                                    { t: 'Security Audit', d: 'Checking for secrets and vulnerabilities', s: 'done' },
                                    { t: 'Asset Optimization', d: 'WebP conversion and minification', s: 'active' },
                                    { t: 'Edge Distribution', d: 'Pushing to global nodes', s: 'pending' },
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6 mb-10 relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold transition-all ${step.s === 'done' ? 'bg-emerald-500' : step.s === 'active' ? 'bg-[#457BFF] shadow-lg shadow-blue-200 animate-pulse' : 'bg-slate-200'}`}>
                                            {step.s === 'done' ? '✓' : i + 1}
                                        </div>
                                        <div className="pt-2">
                                            <div className={`font-bold ${step.s === 'pending' ? 'opacity-30' : ''}`}>{step.t}</div>
                                            <div className="text-xs opacity-50 mt-1">{step.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ========== STAGING ========== */}
                    {activeTab === 'staging' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-3xl font-black tracking-tight mb-4">Staging Environments</h2>
                            <p className="opacity-50 mb-12">Preview updates on secure subdomains before pushing live.</p>
                            
                            <div className="flex gap-4 mb-10">
                                <button onClick={() => setStageMode('production')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${stageMode === 'production' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/5 border border-white/10 opacity-40'}`}>🚀 Production</button>
                                <button onClick={() => setStageMode('staging')} className={`flex-1 py-4 rounded-2xl font-bold transition-all ${stageMode === 'staging' ? 'bg-amber-500 text-white shadow-lg' : 'bg-white/5 border border-white/10 opacity-40'}`}>🧪 Staging</button>
                            </div>

                            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                                {uniqueSlugs.map((s, i) => (
                                    <div key={i} className="flex items-center justify-between mb-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-bold">{s}</div>
                                            <div className="text-[10px] opacity-50 font-mono mt-1">{stageMode === 'staging' ? `stg.${s}.deployento.io` : `${s}.deployento.app`}</div>
                                        </div>
                                        <button className="px-4 py-2 bg-[#457BFF] text-white text-[10px] font-bold rounded-lg">Promote ✨</button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ========== ENV VARS ========== */}
                    {activeTab === 'env' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-3xl font-black tracking-tight mb-8">Environment Variables</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                                    <div className="space-y-4">
                                        <input type="text" placeholder="STRIPE_SECRET" className="w-full bg-white border border-[#E2E8F0] p-4 rounded-xl text-sm outline-none focus:border-[#457BFF]" value={envKey} onChange={e => setEnvKey(e.target.value)} />
                                        <input type="password" placeholder="sk_test_..." className="w-full bg-white border border-[#E2E8F0] p-4 rounded-xl text-sm outline-none focus:border-[#457BFF]" value={envValue} onChange={e => setEnvValue(e.target.value)} />
                                        <button onClick={handleAddEnv} className="w-full py-4 bg-[#457BFF] text-white font-bold rounded-xl shadow-lg">Save Variable</button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {Object.keys(envVars).map(k => (
                                        <div key={k} className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                                            <span className="font-mono text-sm">{k}</span>
                                            <span className="opacity-30">••••••••</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ========== EDGE FUNCTIONS ========== */}
                    {activeTab === 'edge' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-3xl font-black tracking-tight mb-8">Edge Functions</h2>
                            <div className="bg-[#1E293B] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <div className="bg-[#0F172A] px-6 py-3 border-b border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-slate-500 tracking-widest">api/handler.js</span>
                                    <span className="text-[10px] font-black text-[#00F3FF] uppercase">Ready</span>
                                </div>
                                <textarea value={edgeCode} onChange={e => setEdgeCode(e.target.value)} className="w-full h-96 bg-transparent text-[#00F3FF] font-mono text-sm p-8 outline-none resize-none leading-relaxed" spellCheck="false" />
                            </div>
                        </motion.div>
                    )}

                    {/* ========== AI AUDIT ========== */}
                    {activeTab === 'audit' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-3xl font-black tracking-tight mb-8">AI Performance Audit</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { t: 'Image WebP Optimization', d: 'Converted 12 assets. Saved 4.2MB.', i: '🖼️', s: 'Active' },
                                    { t: 'Path Scrubber Engine', d: 'Rewrote 8 absolute paths to relative.', i: '🔧', s: 'Active' },
                                    { t: 'Security Scan', d: 'No unencrypted keys found in source.', i: '🛡️', s: 'Clean' },
                                    { t: 'SEO Auto-Header', d: 'Injected meta tags for social graph.', i: '📈', s: 'Active' },
                                ].map((item, i) => (
                                    <div key={i} className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-2xl">{item.i}</div>
                                            <div className="font-bold">{item.t}</div>
                                        </div>
                                        <p className="text-sm opacity-50 mb-4">{item.d}</p>
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.s}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ========== DOMAINS ========== */}
                    {activeTab === 'domains' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-3xl font-black tracking-tight mb-8">Domains & SSL</h2>
                            <div className={`p-10 rounded-3xl border max-w-2xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F8FAFC] border-[#E2E8F0]'}`}>
                                <h3 className="font-bold mb-6">Nameservers & SSL</h3>
                                {uniqueSlugs.map(s => (
                                    <div key={s} className="flex items-center justify-between mb-4 last:mb-0">
                                        <div className="font-mono text-sm text-[#457BFF]">{s}.deployento.app</div>
                                        <span className="text-[10px] font-black text-emerald-500 uppercase">SSL Locked 🔐</span>
                                    </div>
                                ))}
                                <div className="mt-10 pt-10 border-t border-white/5">
                                    <p className="text-sm opacity-50 mb-6">Point your custom domain CNAME to:</p>
                                    <div className={`p-4 rounded-xl font-mono text-xs text-[#00F3FF] ${isDarkMode ? 'bg-black' : 'bg-white border'}`}>cname.deployento.app</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DEPLOY MODAL */}
                {isDeployModalOpen && (
                    <div className="fixed inset-0 bg-[#0D0D0D]/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1A1A1A] text-white w-full max-w-2xl rounded-[40px] p-10 border border-white/10 relative overflow-hidden shadow-2xl">
                            <button onClick={() => setIsDeployModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">✕</button>
                            <h2 className="text-3xl font-black mb-8">Deploy New Site</h2>
                            
                            <form onSubmit={handleDeploy} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Project Identifier</label>
                                    <input type="text" placeholder="my-awesome-site" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-[#00F3FF] transition-all" value={slug} onChange={e => setSlug(e.target.value)} />
                                </div>
                                <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-[#00F3FF]/50 relative transition-all group">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setFile(e.target.files[0])} />
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📁</div>
                                    <div className="text-sm font-bold text-slate-500">{file ? `✅ ${file.name}` : "Upload ZIP or Folder"}</div>
                                </div>
                                <button disabled={isDeploying || !slug || !file} className="w-full bg-gradient-to-r from-[#457BFF] to-[#00F3FF] py-5 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-cyan-500/20 disabled:opacity-30 transition-all">
                                    {isDeploying ? 'AI ORCHESTRATION IN PROGRESS...' : 'START DEPLOYMENT'}
                                </button>
                            </form>

                            <div className="mt-8 bg-black/40 rounded-2xl p-6 h-40 overflow-y-auto font-mono text-[10px] space-y-2 custom-scrollbar border border-white/5">
                                {buildLogs.map((l, i) => (
                                    <div key={i} className={l.msg.startsWith('✅') ? 'text-emerald-400' : l.msg.startsWith('❌') ? 'text-rose-400' : 'text-[#00F3FF]'}>
                                        <span className="text-slate-600 mr-2">[{new Date(l.timestamp).toLocaleTimeString()}]</span> {l.msg}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
