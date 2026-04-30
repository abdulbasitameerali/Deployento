import React from 'react';

const Showcase = () => {
  const projects = [
    { name: "EcoStore Global", url: "ecostore.deployento.app", type: "E-commerce", speed: "0.8s" },
    { name: "Nexus Portfolio", url: "nexus.deployento.app", type: "Creative", speed: "0.4s" },
    { name: "FinTech Dashboard", url: "fintech-ui.deployento.app", type: "SaaS", speed: "1.1s" },
    { name: "Traveler Blog", url: "explore.deployento.app", type: "Media", speed: "0.6s" },
  ];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter italic">Live on Edge.</h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            A gallery of high-performance websites deployed instantly using the Deployento AI Engine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <div key={i} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
               <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {/* Mock Screenshot UI */}
                  <div className="absolute inset-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                     <div className="flex gap-1 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                     </div>
                     <div className="space-y-2">
                        <div className="h-2 w-2/3 bg-slate-50 rounded"></div>
                        <div className="h-2 w-full bg-slate-50 rounded"></div>
                        <div className="h-12 w-full bg-blue-50 rounded-lg mt-4"></div>
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors"></div>
               </div>
               <div className="p-10 flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{p.type}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1">{p.name}</h3>
                    <p className="text-sm text-slate-400 font-bold">{p.url}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Load Time</div>
                    <div className="text-xl font-black text-emerald-500">{p.speed}</div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
           <button className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-slate-200">
              Deploy Your Site Next →
           </button>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
