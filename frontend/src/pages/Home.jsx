import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [activeTab, setActiveTab] = useState('marketing');

  const tabs = {
    marketing: {
      title: 'Campaign-ready pages that convert',
      desc: 'Launch pages, product storytelling, and structured content — tuned for performance, SEO, and crisp brand execution. Built to iterate as your offers evolve.',
    },
    business: {
      title: 'Corporate sites with authority',
      desc: 'Clear corporate and service sites with disciplined IA, credibility signals, and conversion paths — designed to earn trust at scale.',
    },
    saas: {
      title: 'Product dashboards that scale',
      desc: 'Complex application interfaces with real-time data, user management, and API integrations — engineered for growth-stage SaaS teams.',
    },
    portals: {
      title: 'Secure client-facing portals',
      desc: 'Gated environments with role-based access, document management, and white-label branding — built for agencies and enterprise.',
    },
  };

  const clients = [
    { name: 'Railtown', type: 'LOGISTICS' },
    { name: 'Signal Yard', type: 'PLATFORM' },
    { name: 'Cedar OS', type: 'OPERATIONS' },
    { name: 'Baseline', type: 'CONSULTING' },
    { name: 'Northline', type: 'SAAS' },
    { name: 'Vertex Labs', type: 'DATA' },
    { name: 'Kestrel', type: 'FINTECH' },
    { name: 'Apex Forge', type: 'DEVOPS' },
  ];

  return (
    <div className="bg-white text-[#1A1A1A]" style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-10">
              <span className="w-1.5 h-1.5 bg-[#00F3FF] rounded-full animate-pulse"></span>
              AI-Powered Infrastructure
            </div>
            <h1 className="text-[52px] lg:text-[64px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#1A1A1A] mb-8">
              Deployment infrastructure<br />
              <span className="bg-gradient-to-r from-[#457BFF] to-[#00F3FF] bg-clip-text text-transparent">built for serious</span><br />
              creators.
            </h1>
            <p className="text-[17px] text-[#666666] leading-[1.7] max-w-lg mb-12">
              Deployento combines AI-driven file orchestration and high-performance cloud hosting to turn code into live production systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="bg-gradient-to-r from-[#457BFF] to-[#00F3FF] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-cyan-200/50 hover:-translate-y-0.5 transition-all">
                Request Access →
              </Link>
              <Link to="/services" className="bg-white border border-slate-200 text-[#1A1A1A] px-8 py-4 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                Explore Capabilities
              </Link>
            </div>
          </motion.div>

          {/* Layered Dashboard Mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }} className="relative h-[550px] hidden lg:block">
            {/* Main Browser Window */}
            <div className="absolute inset-x-0 top-8 bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-10">
              <div className="bg-slate-50 px-5 py-3 flex items-center gap-3 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="mx-auto text-[11px] font-medium text-slate-400 bg-white border border-slate-100 px-6 py-1 rounded-full">app.deployento.com</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/3 h-20 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Uptime</div>
                    <div className="text-xl font-black text-[#1A1A1A] mt-1">99.99%</div>
                  </div>
                  <div className="w-1/3 h-20 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Latency</div>
                    <div className="text-xl font-black text-[#1A1A1A] mt-1">24ms</div>
                  </div>
                  <div className="w-1/3 h-20 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Deploys</div>
                    <div className="text-xl font-black text-[#1A1A1A] mt-1">5.2k+</div>
                  </div>
                </div>
                <div className="h-32 bg-slate-50 rounded-xl border border-slate-100"></div>
              </div>
            </div>

            {/* Floating AI Console */}
            <div className="absolute top-4 right-[-20px] w-72 bg-[#0F172A] text-white p-5 rounded-2xl shadow-2xl z-30 transform rotate-2 animate-float">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Console</span>
                <span className="w-2 h-2 bg-[#00F3FF] rounded-full animate-pulse shadow-[0_0_8px_#00F3FF]"></span>
              </div>
              <div className="font-mono text-[10px] space-y-1.5 text-cyan-400/80">
                <div>&gt; Scanning directory...</div>
                <div>&gt; Entry point verified ✓</div>
                <div>&gt; Path scrubber: 3 fixes</div>
                <div className="text-emerald-400">&gt; DEPLOYED to edge</div>
              </div>
            </div>

            {/* Floating Pipeline Badge */}
            <div className="absolute bottom-16 left-[-10px] bg-white border border-slate-100 px-5 py-3 rounded-xl shadow-xl z-30 transform -rotate-1">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#00F3FF] rounded-full animate-pulse shadow-[0_0_8px_#00F3FF]"></span>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pipeline Status</div>
                  <div className="text-sm font-black text-[#00F3FF]">Active</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SOCIAL PROOF & STATS ========== */}
      <section className="py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[15px] text-[#666666] max-w-2xl mx-auto mb-16">
            From product-led SaaS to enterprise operations, we partner long-term with teams that care about quality, speed, and predictable delivery.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { value: '40+', label: 'ACTIVE CLIENTS' },
              { value: '150+', label: 'PROJECTS SHIPPED' },
              { value: '99.9%', label: 'UPTIME GUARANTEED' },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-[#457BFF]/30 hover:shadow-lg hover:shadow-blue-50 transition-all">
                <div className="text-4xl font-black text-[#1A1A1A] mb-2">{stat.value}</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Client Logo Ribbon */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {clients.map((c, i) => (
              <div key={i} className="flex-shrink-0 bg-white/80 backdrop-blur border border-slate-100 rounded-2xl px-6 py-4 min-w-[160px] hover:border-[#457BFF]/30 hover:shadow-lg hover:shadow-blue-50 cursor-default transition-all group">
                <div className="text-sm font-bold text-slate-400 group-hover:text-[#1A1A1A] transition-colors">{c.name}</div>
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-[#457BFF] transition-colors">{c.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CAPABILITIES BENTO GRID ========== */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-20">
            <h2 className="text-[42px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-6">
              Software and sites built for<br />serious operators.
            </h2>
            <p className="text-[15px] text-[#666666] leading-[1.7]">
              End-to-end delivery across the surface web and the systems behind it — one partner accountable for quality from first commit to production.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {['SAAS', 'FINTECH', 'ENTERPRISE', 'CLIENT PORTALS', 'ADMIN SYSTEMS', 'INTERNAL TOOLS'].map(tag => (
              <span key={tag} className="px-4 py-2 border border-slate-200 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em] hover:border-[#457BFF] hover:text-[#457BFF] transition-colors cursor-default">{tag}</span>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
              <div className="text-3xl font-black text-[#1A1A1A] mb-1">8</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Capability Tracks</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
              <div className="text-3xl font-black text-[#1A1A1A] mb-1">Build + Ops</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Engineering Lifecycle</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
              <div className="text-3xl font-black text-[#1A1A1A] mb-1">Single Owner</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Strategy to Delivery</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '↗', title: 'Marketing Sites', desc: 'High-performance pages for launches, lead capture, and brand campaigns — structured for SEO and conversion.' },
              { icon: '◈', title: 'Business Websites', desc: 'Clear corporate and service sites with disciplined IA, credibility, and contact paths that earn trust.' },
              { icon: '</ >', title: 'Web Applications', desc: 'Purpose-built interfaces and workflows on modern stacks — not rigid templates, real engineering.' },
              { icon: '⊞', title: 'Admin Panels', desc: 'Internal consoles for operations teams: permissions, queues, bulk actions, and audit trails.' },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-8 hover:border-[#457BFF]/30 hover:shadow-lg hover:shadow-blue-50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#457BFF]/10 flex items-center justify-center text-[#457BFF] font-bold text-lg mb-6 group-hover:bg-[#457BFF] group-hover:text-white transition-all">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">{card.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TABBED PREVIEW ========== */}
      <section className="py-32 bg-[#FAFAFA] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-[11px] font-bold text-[#457BFF] uppercase tracking-[0.2em] mb-4">Inside the Build</div>
            <h2 className="text-[42px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-6">
              What we ship, tab by tab.
            </h2>
            <p className="text-[15px] text-[#666666] leading-[1.7] max-w-xl">
              A quick visual read on how Deployento translates briefs into working software — pick a lane to see how we think and build.
            </p>
          </div>

          {/* Browser Mockup */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 flex items-center gap-3 border-b border-slate-100">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              </div>
              <div className="mx-auto text-[11px] font-medium text-slate-400">DEPLOYENTO — capability preview</div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              {Object.keys(tabs).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-8 py-4 text-sm font-bold transition-all relative ${
                    activeTab === key ? 'text-[#1A1A1A]' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {key === 'marketing' ? 'Marketing websites' : key === 'business' ? 'Business websites' : key === 'saas' ? 'SaaS platforms' : 'Client portals'}
                  {activeTab === key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A1A1A]"></div>}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-10">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{tabs[activeTab].title}</h3>
                <p className="text-[15px] text-[#666666] leading-[1.7] max-w-2xl mb-8">{tabs[activeTab].desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="h-16 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-4 left-4 h-2 w-32 bg-[#457BFF]/20 rounded-full"></div>
                  </div>
                  <div className="h-16 bg-slate-50 rounded-xl border border-slate-100"></div>
                  <div className="h-16 bg-slate-50 rounded-xl border border-slate-100 col-span-2"></div>
                </div>
                <Link to="/login" className="inline-flex bg-gradient-to-r from-[#457BFF] to-[#00F3FF] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:shadow-xl transition-all">
                  Get started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY DEPLOYENTO ========== */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[42px] font-extrabold tracking-[-0.02em] text-[#1A1A1A] mb-6">Why serious teams choose us</h2>
            <p className="text-[15px] text-[#666666] max-w-xl mx-auto">Architecture decisions that compound. Not shortcuts that collapse.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Feature</th>
                  <th className="py-5 px-6 text-[11px] font-bold text-[#457BFF] uppercase tracking-[0.15em] bg-blue-50/50 rounded-t-xl">Deployento AI</th>
                  <th className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Traditional Hosting</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Setup Time', '< 30 Seconds', '30 – 60 Minutes'],
                  ['File Logic', 'AI Auto-Fix Engine', 'Manual Config'],
                  ['Path Fixing', 'Auto Scrubber', 'Developer Responsibility'],
                  ['SSL Security', 'Free & Automated', 'Paid / Manual'],
                  ['Scaling', 'Instant Containers', 'Manual Upgrade'],
                ].map(([feature, us, them], i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-bold text-[#1A1A1A]">{feature}</td>
                    <td className="py-5 px-6 font-bold text-[#457BFF] bg-blue-50/30">{us}</td>
                    <td className="py-5 px-6 text-[#666666]">{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#457BFF_0%,transparent_50%)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#00F3FF_0%,transparent_50%)] opacity-10"></div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-6">Ready to ship something real?</h2>
          <p className="text-slate-400 text-[15px] mb-10 max-w-lg mx-auto">Join the operators who deploy with confidence. No terminal expertise required.</p>
          <Link to="/login" className="inline-flex bg-gradient-to-r from-[#457BFF] to-[#00F3FF] text-white px-10 py-4 rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all">
            Request Access →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
