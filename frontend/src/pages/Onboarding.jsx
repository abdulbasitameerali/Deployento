import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const plans = [
        { name: 'Starter', price: '$0', features: ['3 Deployments', 'AI Basic Analysis', 'Shared Domain'] },
        { name: 'Pro', price: '$24', features: ['20 Deployments', 'Custom Domains', 'Priority Support'] },
        { name: 'Plus', price: '$64', features: ['100 Deployments', 'Dedicated Infrastructure', 'SLA Guarantee'] }
    ];

    const handlePlanSelect = async (planName) => {
        // Update user plan in "DB"
        const res = await fetch('http://localhost:5000/api/admin/update-plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, plan: planName })
        });
        if (res.ok) {
            login({ ...user, plan: planName });
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black tracking-tighter mb-4">Complete Your Setup</h1>
                    <p className="text-slate-400 font-medium">Choose the engine power that fits your scale.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((p, i) => (
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            key={i}
                            className={`p-8 rounded-[2rem] border transition-all cursor-pointer ${
                                p.name === 'Pro' ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-500/20' : 'bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                            onClick={() => handlePlanSelect(p.name)}
                        >
                            <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                            <div className="text-3xl font-black mb-8">{p.price}<span className="text-sm opacity-50 font-medium">/mo</span></div>
                            <ul className="space-y-4 mb-10">
                                {p.features.map(f => (
                                    <li key={f} className="text-xs font-bold flex items-center gap-2">
                                        <span className="text-cyan-400">✓</span> {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-xs">Select Plan</button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
