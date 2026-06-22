import { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      // Use actual pixel dimensions for crispness
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    setSize();

    // More particles, more visible — still elegant, not distracting
    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 7500), 130);
    const particles = [];

    class Particle {
      constructor() {
        this.init();
      }
      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Mixed sizes: most tiny, a few larger "star" dots
        const r = Math.random();
        if (r < 0.08) {
          this.size = Math.random() * 2.2 + 1.4;   // accent star
          this.baseOpacity = Math.random() * 0.28 + 0.18;
        } else if (r < 0.35) {
          this.size = Math.random() * 1.2 + 0.6;   // medium
          this.baseOpacity = Math.random() * 0.2 + 0.1;
        } else {
          this.size = Math.random() * 0.7 + 0.2;   // tiny dust
          this.baseOpacity = Math.random() * 0.14 + 0.06;
        }
        this.speedX = (Math.random() - 0.5) * 0.22;
        this.speedY = (Math.random() - 0.5) * 0.22;
        this.pulseSpeed = Math.random() * 0.012 + 0.004;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.currentOpacity = this.baseOpacity;
      }
      update(t) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
        this.currentOpacity = this.baseOpacity * (0.65 + 0.35 * Math.sin(t * this.pulseSpeed + this.pulseOffset));
      }
      draw(t) {
        this.update(t);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61, 74, 49, ${this.currentOpacity})`;
        ctx.fill();
      }
    }

    // Draw connection lines between nearby particles
    const drawConnections = () => {
      const maxDist = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            // Fade at edges of connection
            const alpha = (1 - dist / maxDist) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(61, 74, 49, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    let animId;
    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      t++;
      drawConnections();
      particles.forEach(p => p.draw(t));
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      setSize();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleCanvas;
