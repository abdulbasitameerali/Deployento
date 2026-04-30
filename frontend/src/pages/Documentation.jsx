import React, { useState } from 'react';

const Documentation = () => {
  const [activeTab, setActiveTab] = useState('quick-start');

  const docs = {
    'quick-start': {
      title: 'Quick Start Guide',
      content: 'Get your project live in under 30 seconds with Deployento.',
      steps: [
        'Prepare your project folder (HTML/CSS/JS).',
        'Drag and drop the folder into the Deployento Dashboard.',
        'Enter your project slug (e.g., my-awesome-site).',
        'Click Deploy and watch the AI Console work its magic.'
      ]
    },
    'domains': {
      title: 'Connecting a Custom Domain',
      content: 'Learn how to point your own domain to our edge servers.',
      code: 'CNAME   @   cname.deployento.app\nANAME   www   cname.deployento.app'
    },
    'ai-console': {
      title: 'Using the AI Console',
      content: 'Understand the logs and optimization steps performed by our AI.',
      steps: [
        'Entry Point Detection: AI finds index.html.',
        'Structure Flattening: AI cleans nested folders.',
        'Security Hardening: AI injects headers.'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 py-12 md:sticky md:top-20 h-fit">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Documentation</div>
          <nav className="space-y-1">
            {Object.keys(docs).map(key => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === key ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {docs[key].title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black text-slate-900 mb-6">{docs[activeTab].title}</h1>
            <p className="text-slate-500 font-medium mb-12">{docs[activeTab].content}</p>

            {docs[activeTab].steps && (
              <div className="space-y-6 mb-12">
                {docs[activeTab].steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            )}

            {docs[activeTab].code && (
              <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-cyan-400 mb-12 shadow-xl">
                <div className="flex gap-2 mb-4 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <pre>{docs[activeTab].code}</pre>
              </div>
            )}

            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100">
               <h4 className="text-blue-900 font-bold mb-2">Need more help?</h4>
               <p className="text-sm text-blue-700 mb-4 font-medium">Our global support team is available 24/7 for Enterprise customers.</p>
               <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Contact Support →</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
