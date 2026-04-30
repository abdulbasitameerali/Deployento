import React, { useState } from 'react';
import LandingPage from './src/pages/LandingPage';
import Dashboard from './src/pages/Dashboard';

const App = () => {
  const [view, setView] = useState('landing'); // 'landing' or 'dashboard'

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStartDeploying={() => setView('dashboard')} />
      ) : (
        <Dashboard onBack={() => setView('landing')} />
      )}
    </>
  );
};

export default App;
