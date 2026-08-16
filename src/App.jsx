import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

// Landing page
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Tranquilidad from './components/Tranquilidad';
import WhyUs from './components/WhyUs';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin — Lazy loaded for code splitting
import PrivateRoute from './components/admin/PrivateRoute';
const AdminLogin     = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// ── Admin Loading Fallback ───────────────────────────────────────────────────
const AdminLoading = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    color: '#8fad6e',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    letterSpacing: '0.06em',
  }}>
    Cargando panel…
  </div>
);

// ── Landing layout ────────────────────────────────────────────────────────────
const LandingPage = () => (
  <>
    {/* Ambient particle layer — rendered globally behind all content */}
    <ParticleCanvas />

    {/* Page content — must be positioned above canvas (z-index) */}
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Tranquilidad />
        <WhyUs />
        <Portfolio />
        <Process />
        <TechStack />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  </>
);

// ── App with routing ──────────────────────────────────────────────────────────
function App() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <Routes>
        <Route path="/"             element={<LandingPage />} />
        <Route path="/admin/login"  element={<AdminLogin />} />
        <Route path="/admin"        element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </Suspense>
  );
}

export default App;
