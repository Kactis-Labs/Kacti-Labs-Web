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

// Admin
import PrivateRoute   from './components/admin/PrivateRoute';
import AdminLogin     from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

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
    <Routes>
      <Route path="/"             element={<LandingPage />} />
      <Route path="/admin/login"  element={<AdminLogin />} />
      <Route path="/admin"        element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
