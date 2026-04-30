import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Documentation from './pages/Documentation';
import Showcase from './pages/Showcase';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import Onboarding from './pages/Onboarding';

// Protected Route Component
const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">Initializing Session...</div>;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
    return children;
};

// Layout Component to handle Nav/Footer visibility
const Layout = ({ children }) => {
    const hideNavPaths = ['/dashboard', '/admin', '/login', '/onboarding'];
    const hideNav = hideNavPaths.includes(window.location.pathname);
    
    return (
        <div className="flex flex-col min-h-screen">
            {!hideNav && <Navbar />}
            <main className="flex-grow">{children}</main>
            {!hideNav && <Footer />}
        </div>
    );
};

const AppContent = () => {
    return (
        <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/docs" element={<Layout><Documentation /></Layout>} />
            <Route path="/showcase" element={<Layout><Showcase /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/login" element={<LoginPage />} />

            {/* Client Private Pages */}
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />
            <Route path="/onboarding" element={
                <PrivateRoute>
                    <Onboarding />
                </PrivateRoute>
            } />

            {/* Admin Private Pages */}
            <Route path="/admin" element={
                <PrivateRoute adminOnly>
                    <AdminDashboard />
                </PrivateRoute>
            } />
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;
