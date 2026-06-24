import { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let particles = [];
    let animId;
    let t = 0;

    // ── Resize: use ResizeObserver on wrapper for correct zoom-level sizing ──
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = wrapper.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ── Particle class ───────────────────────────────────────────────────────
    class Particle {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        const r = Math.random();
        if (r < 0.08) {
          // Accent "star" — larger, more opaque
          this.size = Math.random() * 2.5 + 1.6;
          this.baseOpacity = Math.random() * 0.42 + 0.28;
        } else if (r < 0.35) {
          // Medium dot
          this.size = Math.random() * 1.4 + 0.7;
          this.baseOpacity = Math.random() * 0.32 + 0.18;
        } else {
          // Fine dust
          this.size = Math.random() * 0.8 + 0.25;
          this.baseOpacity = Math.random() * 0.22 + 0.1;
        }
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.pulseSpeed = Math.random() * 0.012 + 0.004;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.currentOpacity = this.baseOpacity;
      }
      update(tick) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
        this.currentOpacity =
          this.baseOpacity * (0.6 + 0.4 * Math.sin(tick * this.pulseSpeed + this.pulseOffset));
      }
      draw(tick) {
        this.update(tick);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61,74,49,${this.currentOpacity})`;
        ctx.fill();
      }
    }

    // ── Connection lines ─────────────────────────────────────────────────────
    const drawConnections = () => {
      const maxDist = 140;
      const maxDistSq = maxDist * maxDist;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * 0.13;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(61,74,49,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    // ── Build & animate ──────────────────────────────────────────────────────
    const buildParticles = () => {
      const count = Math.min(Math.floor((width * height) / 6000), 160);
      particles = Array.from({ length: count }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      t++;
      drawConnections();
      particles.forEach(p => p.draw(t));
      animId = requestAnimationFrame(animate);
    };

    // ── Init ─────────────────────────────────────────────────────────────────
    setSize();
    buildParticles();
    animate();

    // ── ResizeObserver — reacts to zoom + layout changes, not just window ───
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      setSize();
      buildParticles();
      animate();
    });
    ro.observe(wrapper);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default ParticleCanvas;
