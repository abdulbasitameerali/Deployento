import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="pt-24 pb-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
               Enterprise Deployment <br />
               <span className="text-blue-600">Solutions.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
               More than just hosting. We provide a full-spectrum AI orchestration engine that optimizes, secures, and delivers your code at global scale.
            </p>
          </motion.div>
        </div>

        {/* Technical Depth Block */}
        <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
           <div className="space-y-12">
              {[
                { title: "AI File Orchestrator", desc: "Our engine scans every file in your project, identifying the entry point and automatically reorganizing nested directories to ensure a perfect launch.", icon: "🤖" },
                { title: "Automated SSL (Let's Encrypt)", desc: "Zero-touch security. We issue and renew SSL certificates for every project and custom domain automatically.", icon: "🔒" },
                { title: "Edge Caching & CDN", desc: "Your static files are cached across our global NVMe edge nodes, ensuring sub-100ms load times for users in any region.", icon: "⚡" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                   <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {item.icon}
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
           
           {/* AI Console Preview (Visual) */}
           <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>
              <div className="relative font-mono text-[11px] space-y-3">
                 <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                 </div>
                 <div className="text-slate-500"># Initializing Deployento AI...</div>
                 <div className="text-cyan-400"># Scanning root directory for entry points...</div>
                 <div className="text-white">&gt; Found home.html in /website-v1/subfolder</div>
                 <div className="text-blue-400">&gt; Reorganizing: home.html -&gt; /index.html</div>
                 <div className="text-white">&gt; Injecting security headers...</div>
                 <div className="text-emerald-400">&gt; Deployment successful. Live at https://project-id-102.app</div>
                 <div className="pt-6">
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="bg-blue-500 h-full"
                       ></motion.div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Platform Compatibility Grid */}
        <div className="text-center mb-16">
           <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Universal Compatibility</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {[
                { name: "HTML5", color: "text-orange-500" },
                { name: "CSS3", color: "text-blue-500" },
                { name: "JavaScript", color: "text-yellow-500" },
                { name: "React", color: "text-cyan-400" },
                { name: "Node.js", color: "text-emerald-500" }
              ].map(tech => (
                <div key={tech.name} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group cursor-default">
                   <div className={`text-xl font-black mb-2 ${tech.color} group-hover:scale-110 transition-transform`}>{tech.name}</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimized</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
