import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('health');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [stats, setStats] = useState({ cpu: 42, ram: 58, disk: 31, totalDeployments: 124, totalUsers: 42 });
    const [users, setUsers] = useState([]);
    const [deployments, setDeployments] = useState([]);
    
    const [clusters, setClusters] = useState([
        { id: 'PK-01', name: 'Lahore', country: '🇵🇰', status: 'online', cpu: 12, ram: 22 },
        { id: 'US-EAST', name: 'New York', country: '🇺🇸', status: 'online', cpu: 8, ram: 18 },
        { id: 'DE-WEST', name: 'Frankfurt', country: '🇩🇪', status: 'online', cpu: 15, ram: 25 },
    ]);

    useEffect(() => {
        fetchStats();
        fetchUsers();
    }, []);

    const fetchStats = async () => {
        try {
            const r = await fetch('/api/admin/stats');
            const data = await r.json();
            setStats(data);
        } catch(e) {}
    };

    const fetchUsers = async () => {
        try {
            const r = await fetch('/api/admin/users');
            const data = await r.json();
            setUsers(data);
            // Derive deployments from users
            const allDeploys = data.reduce((acc, user) => {
                const userDeploys = (user.deployments || []).map(d => ({ ...d, userEmail: user.email }));
                return [...acc, ...userDeploys];
            }, []);
            setDeployments(allDeploys.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        } catch(e) {}
    };

    const handleUpdatePlan = async (userId, plan) => {
        try {
            await fetch('/api/admin/update-plan', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, plan })
            });
            fetchUsers();
        } catch(e) {}
    };

    const toggleCluster = (id) => {
        setClusters(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'online' ? 'offline' : 'online' } : c));
    };

    const NavLink = ({ id, label, icon }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === id 
                ? 'bg-[#457BFF] text-white shadow-lg shadow-blue-200' 
                : isDarkMode ? 'text-[#999] hover:bg-white/5' : 'text-[#666666] hover:bg-[#F8FAFC]'
            }`}
        >
            <span>{icon}</span> {label}
        </button>
    );

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0D0D0D] text-white' : 'bg-[#F8FAFC] text-[#1A1A1A]'}`}>
            {/* TOP ADMIN BAR */}
            <header className={`px-8 h-20 flex items-center justify-between sticky top-0 z-50 border-b ${isDarkMode ? 'bg-[#0D0D0D] border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            <div className="w-5 h-5 bg-[#1A1A1A] rounded-sm"></div>
                            <div className="w-5 h-5 bg-[#457BFF] rounded-sm rounded-tr-lg"></div>
                        </div>
                        <span className="text-xl font-black tracking-tighter">AdminPanel</span>
                    </div>
                    
                    <nav className="hidden md:flex gap-1">
                        <NavLink id="health" label="Infrastructure" icon="🌐" />
                        <NavLink id="users" label="User Accounts" icon="👥" />
                        <NavLink id="deployments" label="Live Feed" icon="🚀" />
                        <NavLink id="settings" label="System Config" icon="⚙️" />
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${isDarkMode ? 'border-white/20 bg-white/5' : 'border-[#E2E8F0] bg-[#F8FAFC]'}`}>
                        {isDarkMode ? '🌙' : '☀️'}
                    </button>
                    <div className="w-px h-6 bg-[#E2E8F0] mx-2"></div>
                    <button onClick={logout} className="text-sm font-bold text-[#666666] hover:text-[#457BFF]">Logout</button>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
                
                <AnimatePresence mode="wait">
                    {/* ========== SYSTEM HEALTH & CLUSTERS ========== */}
                    {activeTab === 'health' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <div className="mb-10">
                                <h1 className="text-4xl font-extrabold tracking-tight">Infrastructure Health</h1>
                                <p className="opacity-50 font-medium mt-2">Global server cluster management and real-time resource utilization.</p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {clusters.map(c => (
                                    <div key={c.id} className={`rounded-3xl p-8 border transition-all ${c.status === 'online' ? (isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]') : 'bg-rose-500/5 border-rose-500/20 opacity-60'}`}>
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <div className="text-2xl mb-1">{c.country}</div>
                                                <h3 className="font-bold text-lg">{c.id}</h3>
                                                <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{c.name}</div>
                                            </div>
                                            <button onClick={() => toggleCluster(c.id)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${c.status === 'online' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                                                {c.status}
                                            </button>
                                        </div>
                                        {c.status === 'online' ? (
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-bold opacity-50 uppercase tracking-widest">
                                                        <span>CPU Usage</span><span>{c.cpu}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-[#457BFF]/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#00F3FF] rounded-full" style={{ width: `${c.cpu}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-bold opacity-50 uppercase tracking-widest">
                                                        <span>RAM Pulse</span><span>{c.ram}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-[#457BFF]/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#457BFF] rounded-full" style={{ width: `${c.ram}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-6 text-center text-xs font-bold text-rose-500 uppercase tracking-widest">Failover Active: Rerouting Traffic</div>
                                        )}
                                    </div>
                                ))}

                                <div className={`lg:col-span-3 rounded-3xl p-8 border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                    <h3 className="font-bold mb-8">System-wide Latency (ms)</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={[
                                                { name: '00:00', pk: 42, us: 24, de: 31 },
                                                { name: '04:00', pk: 38, us: 22, de: 29 },
                                                { name: '08:00', pk: 55, us: 35, de: 45 },
                                                { name: '12:00', pk: 45, us: 25, de: 35 },
                                                { name: '16:00', pk: 42, us: 24, de: 31 },
                                                { name: '20:00', pk: 48, us: 28, de: 38 },
                                            ]}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#666' : '#999', fontSize: 10}} />
                                                <Tooltip contentStyle={{ borderRadius: '16px', background: isDarkMode ? '#1A1A1A' : '#fff', border: 'none' }} />
                                                <Area type="monotone" dataKey="pk" stroke="#00F3FF" fillOpacity={0.1} fill="#00F3FF" strokeWidth={3} />
                                                <Area type="monotone" dataKey="us" stroke="#457BFF" fillOpacity={0.1} fill="#457BFF" strokeWidth={3} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ========== USER MANAGEMENT ========== */}
                    {activeTab === 'users' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-4xl font-extrabold tracking-tight">User Accounts</h1>
                                <div className="bg-[#457BFF] text-white px-4 py-2 rounded-xl text-xs font-bold">{users.length} Registered</div>
                            </div>
                            
                            <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className={`text-[10px] font-black uppercase tracking-widest border-b ${isDarkMode ? 'border-white/10 text-slate-500' : 'border-[#F8FAFC] text-slate-400'}`}>
                                            <th className="p-6">Account Email</th>
                                            <th className="p-6">Subscription Plan</th>
                                            <th className="p-6">Deploys</th>
                                            <th className="p-6 text-right">Administrative Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {users.map(u => (
                                            <tr key={u.id} className={`border-b transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-[#F8FAFC] hover:bg-[#F8FAFC]'}`}>
                                                <td className="p-6 font-bold">{u.email}</td>
                                                <td className="p-6">
                                                    <div className="flex gap-2">
                                                        {['Starter','Pro','Plus'].map(p => (
                                                            <button key={p} onClick={() => handleUpdatePlan(u.id, p)}
                                                                className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-all ${u.plan === p ? 'bg-[#457BFF] text-white border-[#457BFF]' : isDarkMode ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
                                                                {p}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-6 font-mono text-xs opacity-50">{u.deployments?.length || 0}</td>
                                                <td className="p-6 text-right">
                                                    <button className="text-rose-500 font-black text-[10px] uppercase tracking-widest hover:underline">Suspend Account</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* ========== DEPLOYMENTS FEED ========== */}
                    {activeTab === 'deployments' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-8">Global Deployment Feed</h1>
                            <div className="grid md:grid-cols-4 gap-6 mb-8">
                                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                    <div className="text-2xl font-black text-[#457BFF]">{deployments.length}</div>
                                    <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">Total Shipped</div>
                                </div>
                                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                    <div className="text-2xl font-black text-[#00F3FF]">3.2s</div>
                                    <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">Avg Build Time</div>
                                </div>
                                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                    <div className="text-2xl font-black text-emerald-500">99.8%</div>
                                    <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">Success Rate</div>
                                </div>
                                <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                    <div className="text-2xl font-black text-amber-500">PK-01</div>
                                    <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">Hottest Node</div>
                                </div>
                            </div>

                            <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                <div className="space-y-0">
                                    {deployments.map((d, i) => (
                                        <div key={i} className={`p-6 flex items-center justify-between border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-[#F8FAFC]'}`}>
                                            <div className="flex items-center gap-6">
                                                <div className={`w-2 h-2 rounded-full animate-pulse ${i === 0 ? 'bg-emerald-500' : 'bg-[#457BFF]'}`}></div>
                                                <div>
                                                    <div className="font-bold text-sm">{d.slug}</div>
                                                    <div className="text-[10px] opacity-40 mt-1 font-mono">{d.userEmail}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold opacity-50">{new Date(d.timestamp).toLocaleTimeString()}</div>
                                                <div className="text-[9px] font-black text-emerald-500 uppercase mt-1">Live on Edge</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ========== SYSTEM SETTINGS ========== */}
                    {activeTab === 'settings' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-8">System Configuration</h1>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                    <h3 className="font-bold mb-8">Service Limits</h3>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold opacity-60">Max ZIP Size (MB)</span>
                                            <input type="number" defaultValue={50} className={`w-20 p-2 rounded-lg text-center font-bold text-sm border ${isDarkMode ? 'bg-black border-white/20' : 'bg-[#F8FAFC] border-slate-200'}`} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold opacity-60">Build Timeout (sec)</span>
                                            <input type="number" defaultValue={30} className={`w-20 p-2 rounded-lg text-center font-bold text-sm border ${isDarkMode ? 'bg-black border-white/20' : 'bg-[#F8FAFC] border-slate-200'}`} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold opacity-60">Maintenance Mode</span>
                                            <button className="w-12 h-6 rounded-full bg-slate-200 relative"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div></button>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
                                    <h3 className="font-bold mb-8">Audit Logs</h3>
                                    <div className="space-y-4 font-mono text-[10px] opacity-40">
                                        <div>[09:42:01] ADMIN: Logged in from 192.168.1.1</div>
                                        <div>[10:15:12] SYSTEM: Cluster DE-WEST reported high load</div>
                                        <div>[10:15:45] AI: Traffic rerouted to US-EAST automatically</div>
                                        <div>[11:02:12] ADMIN: Updated plan for user_id: 812</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminDashboard;
