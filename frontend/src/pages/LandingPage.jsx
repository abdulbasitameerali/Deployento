import React from 'react';

const LandingPage = ({ onStartDeploying }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-200 selection:text-cyan-900 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100/40 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-blue-100/30 blur-[100px] rounded-full -z-10"></div>

      {/* Social Sidebar (Aesthetic) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-40">
        {['in', 'f', 'ig', 'gh', 'w'].map((icon) => (
          <div key={icon} className="w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:border-cyan-200 hover:shadow-lg transition-all cursor-pointer group">
            <span className="text-xs font-bold uppercase group-hover:scale-110 transition-transform">{icon}</span>
          </div>
        ))}
      </div>

      {/* 1. Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
              <div className="w-6 h-6 bg-cyan-400 rounded-sm rounded-tr-xl"></div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 ml-1">
              deployento
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#docs" className="hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#showcase" className="hover:text-blue-600 transition-colors">Showcases</a>
            <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors">
              🌐 Region <span className="text-[8px]">▼</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-xs font-bold text-slate-900 border border-slate-200 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-all">Log in</button>
            <button 
              onClick={onStartDeploying}
              className="bg-[#457BFF] text-white px-6 py-2.5 rounded-lg font-bold text-xs shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Start Deploying
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-8">
              • CUSTOM DIGITAL SYSTEMS
            </div>
            <h1 className="text-6xl lg:text-[80px] font-black leading-[1.05] tracking-tight text-slate-900 mb-8">
              Revenue systems <br />
              <span className="bg-gradient-to-r from-[#457BFF] to-[#00F3FF] bg-clip-text text-transparent italic">built to close </span> <br />
              <span className="text-[#00C292]">more clients</span>
            </h1>
            <p className="text-[17px] text-slate-500 mb-12 leading-relaxed max-w-lg font-medium">
              DEPLOYENTO combines conversion-focused websites, AI automation, and cloud workflows to turn static code into live production systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStartDeploying}
                className="bg-[#457BFF] text-white px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-3 shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all group"
              >
                Deploy My First Project <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
                See How It Works
              </button>
            </div>
          </div>

          {/* Layered Mockup Visual */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main Browser Window */}
            <div className="relative w-full max-w-lg aspect-[4/3] bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-700 group">
              <div className="bg-slate-50/50 px-4 py-3 flex items-center gap-2 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
                <div className="mx-auto text-[10px] font-medium text-slate-400 bg-white border border-slate-100 px-8 py-1 rounded-full shadow-sm">app.deployento.com/dashboard</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-6 w-2/3 bg-slate-50 rounded-full"></div>
                <div className="h-4 w-full bg-slate-50/50 rounded-full"></div>
                <div className="h-4 w-full bg-slate-50/50 rounded-full"></div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="h-24 bg-slate-50/80 rounded-xl border border-slate-100 border-dashed"></div>
                  <div className="h-24 bg-slate-50/80 rounded-xl border border-slate-100 border-dashed"></div>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="px-4 py-2 bg-[#00C292] text-white text-[10px] font-bold rounded-lg shadow-lg shadow-emerald-100 flex items-center gap-2">Request access →</div>
                </div>
              </div>
            </div>

            {/* Floating Admin Console Card */}
            <div className="absolute top-20 left-[-40px] w-64 bg-white/80 backdrop-blur-xl border border-white p-4 rounded-xl shadow-2xl z-30 transform rotate-1 animate-float">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">AI Admin Console</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <div className="h-1 w-24 bg-slate-200 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <div className="h-1 w-32 bg-slate-200 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="h-1 w-20 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Pipeline Status Card */}
            <div className="absolute bottom-10 right-[-20px] w-56 bg-white border border-slate-100 p-5 rounded-2xl shadow-2xl z-30">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[10px] font-bold text-slate-800">Pipeline Status</div>
                <div className="text-[8px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded font-black uppercase">Active</div>
              </div>
              <div className="h-16 w-full bg-slate-50 rounded-lg overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end gap-1 px-2 pb-2">
                  {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-100 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Sequence */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-5xl font-black mb-6 tracking-tight">From signed scope to <br /> software in production</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              A transparent sequence you can plan around — with artifacts at each gate so leadership and technical leads stay aligned.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 relative">
            {[
              { step: "Step 1", title: "Discovery & scope", desc: "Structured workshops and written scope: users, integrations, success metrics, and constraints.", icon: "🧭" },
              { step: "Step 2", title: "Solution design", desc: "Information architecture, UX flows, and technical approach — including data model and API boundaries.", icon: "▦" },
              { step: "Step 3", title: "Build, integrate, verify", desc: "Incremental delivery with staging environments, automated checks, and UAT windows.", icon: "</>" },
              { step: "Step 4", title: "Launch, handoff, iterate", desc: "Production cutover, monitoring hooks, training, and a defined path for enhancements.", icon: "🚀" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm relative group hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-blue-600 mb-8 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{item.step}</div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 leading-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tangible Outputs Grid */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <p className="text-slate-500 max-w-2xl font-medium leading-relaxed">
              Tangible outputs — not vague promises. Every build is structured so your organization can operate, extend, or transition the system confidently.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Repository & build pipeline", desc: "Version-controlled source, environment configuration patterns, and CI hooks you can extend.", icon: "📂" },
              { title: "Admin & permissions model", desc: "Role-based access, audit-friendly actions, and operator workflows documented for safe onboarding.", icon: "▨" },
              { title: "Technical documentation", desc: "Architecture notes, deployment steps, integration touchpoints, and runbooks for common tasks.", icon: "📄" },
              { title: "Hosting & release readiness", desc: "Staging and production parity guidance, secrets handling, backups, and observability baselines.", icon: "▤" },
              { title: "Enablement session", desc: "Walkthrough with your leads covering day-two operations, safe change practices, and enhancement requests.", icon: "🎓" },
              { title: "Roadmap for phase two", desc: "Prioritized backlog of improvements — performance, automation, new modules — for future growth.", icon: "🚀" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-10 h-10 bg-slate-50 rounded flex items-center justify-center text-slate-400 mb-6 group-hover:text-blue-500 transition-colors border border-slate-50">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-4 text-slate-900 leading-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4 tracking-tight">Why Choose <span className="text-[#457BFF]">Deployento</span>?</h2>
             <p className="text-slate-500 max-w-2xl mx-auto font-medium">Most hosts just give you a server; we give you an intelligent partner that handles the heavy lifting.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 border-b-4 border-cyan-400 bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-50 rounded-xl shadow-sm flex items-center justify-center text-2xl mb-6">🚀</div>
              <h3 className="text-xl font-bold mb-4">Zero-Config Engine</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">No package.json or Dockerfile knowledge needed. Our AI builds the environment for you automatically.</p>
            </div>
            <div className="p-10 border-b-4 border-blue-600 bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-50 rounded-xl shadow-sm flex items-center justify-center text-2xl mb-6">🔒</div>
              <h3 className="text-xl font-bold mb-4">Bulletproof Security</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">Automatic SSL issuance and AI-driven directory protection. Your source code remains isolated and secure.</p>
            </div>
            <div className="p-10 border-b-4 border-cyan-400 bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-50 rounded-xl shadow-sm flex items-center justify-center text-2xl mb-6">🌍</div>
              <h3 className="text-xl font-bold mb-4">Global Edge Performance</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">High-speed delivery with 99.9% uptime. Served from NVMe-backed edge nodes for sub-100ms latency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reliability Testimonials */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[52px] font-black text-slate-900 tracking-tighter mb-4 leading-none">Teams that needed reliability, <br /> not noise</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Operators who valued clear ownership, technical depth, and delivery discipline on high-stakes projects.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "John Smith", role: "CEO, TechStart Inc", quote: "DEPLOYENTO transformed our digital presence completely. Their team delivered a stunning website and mobile app that exceeded our expectations.", img: "https://i.pravatar.cc/100?img=11" },
              { name: "Sarah Johnson", role: "CTO, Innovate Solutions", quote: "Working with DEPLOYENTO was a game-changer. They helped us migrate to the cloud seamlessly and improved our system performance by 300%.", img: "https://i.pravatar.cc/100?img=26" },
              { name: "Michael Chen", role: "Product Manager, Digital Dynamics", quote: "The AI orchestration they developed for us has revolutionized our customer support. Response times improved dramatically and satisfaction is at an all-time high.", img: "https://i.pravatar.cc/100?img=33" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="flex gap-1 text-[#457BFF] mb-6">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
                <p className="text-slate-600 font-medium leading-relaxed mb-10 text-[15px]">"{t.quote}"</p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-8">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-[11px] text-slate-400 font-bold uppercase">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Bar */}
      <section className="py-20 bg-slate-900 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-blue-400 font-mono mb-10 text-xs uppercase tracking-[0.3em] font-black">Built on Enterprise Hardware</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60">
            {['AMD EPYC™', 'DOCKER', 'NVMe GEN4', 'LITESPEED'].map((brand) => (
              <div key={brand} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-pointer group">
                <span className="text-2xl font-black tracking-tighter group-hover:text-blue-400 transition-colors">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Pricing Packages */}
      <section id="pricing" className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl mb-12">
              <button className="px-6 py-2 rounded-lg text-sm font-bold text-slate-500">Monthly</button>
              <button className="px-6 py-2 rounded-lg text-sm font-bold bg-white text-blue-600 shadow-sm">Annual <span className="text-[10px] ml-1 opacity-60 text-emerald-500">Save ~18%</span></button>
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight">Flexible Pricing for Every Scale</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col text-left">
              <h4 className="text-slate-900 text-lg font-black mb-2">Starter</h4>
              <p className="text-slate-400 text-sm mb-8">Solo makers and small teams testing the waters.</p>
              <div className="text-[44px] font-black mb-8 text-slate-900">$24 <span className="text-lg text-slate-400 font-bold">/mo per seat</span></div>
              <ul className="space-y-4 mb-12 flex-1">
                {['5 projects', 'Core analytics', 'Email support', 'Community templates'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <span className="text-blue-500 font-bold text-lg">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border border-slate-200 rounded-xl font-black text-sm hover:bg-slate-50 transition-all">Start trial</button>
            </div>

            {/* Pro */}
            <div className="bg-white p-10 rounded-3xl border-2 border-blue-500 shadow-2xl shadow-blue-100 flex flex-col text-left relative scale-105 z-10">
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Recommended</div>
              <h4 className="text-slate-900 text-lg font-black mb-2">Pro</h4>
              <p className="text-slate-400 text-sm mb-8">The default for product orgs that ship every sprint.</p>
              <div className="text-[44px] font-black mb-8 text-slate-900">$64 <span className="text-lg text-slate-400 font-bold">/mo per seat</span></div>
              <ul className="space-y-4 mb-12 flex-1">
                {['Everything in Starter', 'SSO add-on', 'Advanced workflows', 'Priority support', 'API & webhooks'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-bold text-slate-900">
                    <span className="text-blue-500 font-bold text-lg">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">Start trial</button>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col text-left">
              <h4 className="text-slate-900 text-lg font-black mb-2">Enterprise</h4>
              <p className="text-slate-400 text-sm mb-8">Security, contracts, and white-glove onboarding.</p>
              <div className="text-[44px] font-black mb-8 text-slate-900">Let's talk</div>
              <ul className="space-y-4 mb-12 flex-1">
                {['Everything in Pro', 'VPC options', 'Dedicated CSM', 'Custom SLA', 'Invoice billing'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <span className="text-blue-500 font-bold text-lg">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 border border-slate-200 rounded-xl font-black text-sm hover:bg-slate-50 transition-all">Contact sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-0.5">
                  <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
                  <div className="w-6 h-6 bg-cyan-400 rounded-sm rounded-tr-xl"></div>
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900">deployento</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
                The world's first AI-assisted static deployment platform. Building the future of the web, one click at a time.
              </p>
              <div className="space-y-4">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">USA HEADQUARTERS</div>
                  <div className="text-sm font-bold text-slate-700">+1 (539) 215-0446</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">GLOBAL SUPPORT</div>
                  <div className="text-sm font-bold text-slate-700">support@deployento.com</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
              <div>
                <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Product</h5>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">Features</a></li>
                  <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
                  <li><a href="#" className="hover:text-blue-600">Services</a></li>
                  <li><a href="#" className="hover:text-blue-600">Portfolio</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Company</h5>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">About</a></li>
                  <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                  <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-600">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Policies</h5>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-600">Cookies Policy</a></li>
                  <li><a href="#" className="hover:text-blue-600">Security</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Regions</h5>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li><a href="#" className="hover:text-blue-600">PK Pakistan</a></li>
                  <li><a href="#" className="hover:text-blue-600">US United States</a></li>
                  <li><a href="#" className="hover:text-blue-600">GB United Kingdom</a></li>
                  <li><a href="#" className="hover:text-blue-600">DE Germany</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">© 2026 DEPLOYENTO SYSTEMS. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              {['LinkedIn', 'Twitter', 'GitHub', 'Email'].map(social => (
                <a key={social} href="#" className="text-[11px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
