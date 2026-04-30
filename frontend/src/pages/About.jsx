import React from 'react';

const About = () => {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter">
            Architecting the <br />
            <span className="text-blue-600 italic">Future of Deployment.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Deployento was founded with a single mission: to remove the friction between code and production. We believe that developers should focus on building, not managing servers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-24 mb-32">
           <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900">Our Story</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                 Starting as a specialized project to serve the rapidly growing tech ecosystem in Pakistan, Deployento quickly expanded into a global platform. By leveraging AI to handle directory orchestration, we've enabled thousands of developers to launch sites in seconds.
              </p>
              <div className="flex gap-12 pt-8">
                 <div>
                    <div className="text-4xl font-black text-slate-900 mb-1">2026</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Founded</div>
                 </div>
                 <div>
                    <div className="text-4xl font-black text-slate-900 mb-1">Global</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Network</div>
                 </div>
              </div>
           </div>
           <div className="bg-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
              <h3 className="text-2xl font-black mb-6">The Mission</h3>
              <p className="text-blue-50 font-medium leading-relaxed opacity-80">
                 "To democratize web hosting by building the world's most intelligent, zero-config deployment infrastructure."
              </p>
           </div>
        </div>

        {/* Meet the Architect */}
        <div className="bg-slate-50 rounded-3xl p-12 md:p-24 border border-slate-100">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
              <div className="w-48 h-48 bg-slate-200 rounded-2xl overflow-hidden grayscale shrink-0 shadow-2xl">
                 <img src="https://i.pravatar.cc/300?u=abdul" alt="Abdul Basit" className="w-full h-full object-cover" />
              </div>
              <div>
                 <div className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Leadership</div>
                 <h2 className="text-4xl font-black text-slate-900 mb-4">Abdul Basit</h2>
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Technical Managing Director</p>
                 <p className="text-slate-500 font-medium leading-relaxed mb-8">
                    Abdul is the lead architect behind the Deployento AI File Orchestrator. With a deep focus on cloud infrastructure and high-performance virtualization, he leads the technical strategy for our global operations.
                 </p>
                 <div className="flex gap-6">
                    <a href="#" className="text-xs font-black text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-widest">LinkedIn</a>
                    <a href="#" className="text-xs font-black text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-widest">Twitter</a>
                    <a href="#" className="text-xs font-black text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-widest">Portfolio</a>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
