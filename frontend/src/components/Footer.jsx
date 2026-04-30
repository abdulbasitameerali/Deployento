import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const regions = [
    { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
    { code: 'US', flag: '🇺🇸', name: 'United States' },
    { code: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  ];

  return (
    <footer className="bg-[#0D0D0D] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex gap-0.5">
                <div className="w-6 h-6 bg-[#457BFF] rounded-sm"></div>
                <div className="w-6 h-6 bg-[#00F3FF] rounded-sm rounded-tr-xl"></div>
              </div>
              <span className="text-2xl font-black tracking-tighter">deployento</span>
            </div>
            <p className="text-[#666666] text-sm leading-relaxed mb-10 max-w-sm">
              AI-assisted deployment infrastructure for creators and operators who ship with intent.
            </p>

            {/* Region Switcher */}
            <div className="space-y-2 mb-10">
              <div className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em] mb-3">Available Regions</div>
              <div className="flex flex-wrap gap-2">
                {regions.map(r => (
                  <div key={r.code} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-slate-400 hover:border-[#457BFF]/30 hover:text-white transition-all cursor-default">
                    <span>{r.flag}</span> {r.code}
                  </div>
                ))}
              </div>
            </div>

            {/* HQ */}
            <div className="space-y-3">
              <div className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em]">Headquarters</div>
              <div className="text-sm text-slate-400 font-medium">Model Town, Lahore, Pakistan</div>
              <div className="text-sm text-slate-400 font-medium">Edge Nodes: Falkenstein DE · New Jersey US</div>
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h5 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Product</h5>
              <ul className="space-y-4 text-sm font-medium text-[#666666]">
                <li><Link to="/services" className="hover:text-[#00F3FF] transition-colors">AI Features</Link></li>
                <li><Link to="/" className="hover:text-[#00F3FF] transition-colors">Pricing</Link></li>
                <li><Link to="/showcase" className="hover:text-[#00F3FF] transition-colors">Showcase</Link></li>
                <li><Link to="/docs" className="hover:text-[#00F3FF] transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Company</h5>
              <ul className="space-y-4 text-sm font-medium text-[#666666]">
                <li><Link to="/about" className="hover:text-[#00F3FF] transition-colors">About</Link></li>
                <li><Link to="/about" className="hover:text-[#00F3FF] transition-colors">Team</Link></li>
                <li><Link to="/about" className="hover:text-[#00F3FF] transition-colors">Careers</Link></li>
                <li><Link to="/about" className="hover:text-[#00F3FF] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Resources</h5>
              <ul className="space-y-4 text-sm font-medium text-[#666666]">
                <li><Link to="/docs" className="hover:text-[#00F3FF] transition-colors">Documentation</Link></li>
                <li><Link to="/docs" className="hover:text-[#00F3FF] transition-colors">API Reference</Link></li>
                <li><Link to="/docs" className="hover:text-[#00F3FF] transition-colors">Status Page</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-8">Legal</h5>
              <ul className="space-y-4 text-sm font-medium text-[#666666]">
                <li><Link to="#" className="hover:text-[#00F3FF] transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-[#00F3FF] transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-[#00F3FF] transition-colors">Security Audit</Link></li>
                <li><Link to="#" className="hover:text-[#00F3FF] transition-colors">DPA</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-medium text-[#444444] tracking-wide">
            © 2026 Deployento Systems. All rights reserved.
            <span className="text-[#333333] ml-2">· Technical Managing Director: Abdul Basit</span>
          </div>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map(s => (
              <a key={s} href="#" className="text-[11px] font-bold text-[#444444] hover:text-[#00F3FF] uppercase tracking-widest transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
