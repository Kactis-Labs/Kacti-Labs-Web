import './index.css';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* Ambient particle layer — rendered globally behind all content */}
      <ParticleCanvas />

      {/* Page content — must be positioned above canvas (z-index) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <Services />
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
}

export default App;
