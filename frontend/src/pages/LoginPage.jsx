import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/api/login' : '/api/signup';
        console.log(`🔑 Attempting ${isLogin ? 'Login' : 'Signup'} at ${endpoint}...`);
        
        try {
            const res = await fetch(`${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            console.log('📦 Server Response:', data);
            
            if (data.success) {
                login(data.user);
                // If it's a new signup, take them to onboarding, otherwise dashboard
                if (!isLogin) navigate('/onboarding');
                else if (data.user.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            console.error('❌ Connection Error:', err);
            setError('Could not connect to the Deployento Server. Please ensure your backend is running on port 5000.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Branded Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-400/10 blur-[150px] rounded-full"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center gap-1 mb-6">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                        <div className="w-8 h-8 bg-cyan-400 rounded-lg rounded-tr-3xl"></div>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter">
                        {isLogin ? 'Access Command Center' : 'Start Your Journey'}
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 font-medium">
                        {isLogin ? 'Welcome back to the future of deployment.' : 'Join the elite tier of developers.'}
                    </p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs py-3 px-4 rounded-xl mb-6 text-center font-bold"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Enterprise Email</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                            placeholder="name@company.com"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Secure Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all mt-4"
                    >
                        {isLogin ? 'Sign In' : 'Create My Account'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-400 text-xs font-bold hover:text-cyan-400 transition-colors"
                    >
                        {isLogin ? "New to Deployento? Create Account" : "Already a member? Sign In"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
