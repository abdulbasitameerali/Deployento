import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [showRegions, setShowRegions] = useState(false);
  const [region, setRegion] = useState('PK');
  const location = useLocation();
  const { user } = useAuth();

  const regions = [
    { code: 'PK', flag: '🇵🇰' },
    { code: 'US', flag: '🇺🇸' },
    { code: 'DE', flag: '🇩🇪' },
    { code: 'GB', flag: '🇬🇧' },
  ];

  const activeRegion = regions.find(r => r.code === region);
  const isActive = (path) => location.pathname === path ? 'text-[#1A1A1A]' : '';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex gap-0.5 group-hover:scale-105 transition-transform">
            <div className="w-5 h-5 bg-[#457BFF] rounded-sm"></div>
            <div className="w-5 h-5 bg-[#00F3FF] rounded-sm rounded-tr-lg"></div>
          </div>
          <span className="text-xl font-black tracking-tighter text-[#1A1A1A] ml-1">deployento</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-[#666666]">
          <Link to="/services" className={`hover:text-[#1A1A1A] transition-colors ${isActive('/services')}`}>Services</Link>
          <Link to="/showcase" className={`hover:text-[#1A1A1A] transition-colors ${isActive('/showcase')}`}>Showcases</Link>
          <Link to="/docs" className={`hover:text-[#1A1A1A] transition-colors ${isActive('/docs')}`}>Documentation</Link>
          <Link to="/about" className={`hover:text-[#1A1A1A] transition-colors ${isActive('/about')}`}>About</Link>
          
          <div className="relative">
            <button 
              onClick={() => setShowRegions(!showRegions)}
              className="flex items-center gap-1.5 hover:text-[#1A1A1A] cursor-pointer transition-colors"
            >
              {activeRegion.flag} {activeRegion.code} <span className="text-[8px] text-slate-300">▼</span>
            </button>
            
            {showRegions && (
              <div className="absolute top-full right-0 mt-3 w-40 bg-white border border-slate-100 rounded-xl shadow-2xl p-2 z-[60]">
                {regions.map(r => (
                  <button key={r.code} onClick={() => { setRegion(r.code); setShowRegions(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition-colors">
                    <span>{r.flag}</span> {r.code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="bg-gradient-to-r from-[#457BFF] to-[#00F3FF] text-white px-6 py-2.5 rounded-lg font-bold text-xs shadow-lg shadow-blue-100 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-xs font-bold text-[#1A1A1A] border border-slate-200 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-all">
                Log in
              </Link>
              <Link to="/login" className="bg-gradient-to-r from-[#457BFF] to-[#00F3FF] text-white px-6 py-2.5 rounded-lg font-bold text-xs shadow-lg shadow-blue-100 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Request Access →
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
