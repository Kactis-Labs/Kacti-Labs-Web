import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { getWhatsAppURL } from '../config/env';
import { supabase } from '../lib/supabaseClient';

const WHATSAPP_URL = getWhatsAppURL('Hola%2C%20quiero%20cotizar%20mi%20p%C3%A1gina%20web%20con%20Kacti%20Labs');

// ── Contact Form (Supabase integration) ──────────────────────────────────────
const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', contact_number: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const { error } = await supabase.from('contacts').insert([
      {
        name:           formState.name,
        email:          formState.email,
        contact_number: formState.contact_number || null,
        message:        formState.message,
      },
    ]);

    if (error) {
      console.error('[Supabase] Error al insertar contacto:', error.message);
      const msg = encodeURIComponent(
        `Hola, soy ${formState.name}.\n${formState.message}`
      );
      window.open(`https://wa.me/51999999999?text=${msg}`, '_blank');
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    color: '#0B0B0B',
    background: '#F8F9FA',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = '#3D4A31';
    e.target.style.boxShadow = '0 0 0 3px rgba(61,74,49,0.1)';
  };
  const inputBlur = (e) => {
    e.target.style.borderColor = 'rgba(0,0,0,0.1)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-two-col">
        <div>
          <label htmlFor="contact-name" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.04em' }}>
            Tu nombre *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Juan Pérez"
            value={formState.name}
            onChange={handleChange}
            onFocus={inputFocus}
            onBlur={inputBlur}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="contact-email" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.04em' }}>
            Correo electrónico *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="juan@tunegocio.com"
            value={formState.email}
            onChange={handleChange}
            onFocus={inputFocus}
            onBlur={inputBlur}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-number" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.04em' }}>
          Número de contacto
        </label>
        <input
          id="contact-number"
          name="contact_number"
          type="tel"
          placeholder="Ej. +51 999 999 999"
          value={formState.contact_number}
          onChange={handleChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="contact-message" style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '6px', letterSpacing: '0.04em' }}>
          Cuéntanos sobre tu proyecto *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="¿Qué tipo de negocio tienes? ¿Qué esperas de tu nueva web?"
          value={formState.message}
          onChange={handleChange}
          onFocus={inputFocus}
          onBlur={inputBlur}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        whileHover={{ scale: 1.02, backgroundColor: '#3D4A31' }}
        whileTap={{ scale: 0.98 }}
        style={{
          padding: '15px',
          background: status === 'success' ? '#3D4A31' : status === 'error' ? '#b91c1c' : '#0B0B0B',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '15px',
          fontWeight: 700,
          cursor: status === 'sending' ? 'wait' : 'pointer',
          transition: 'background 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {status === 'idle' && <><ArrowRight size={16} /> Enviar mensaje</>}
        {status === 'sending' && '⏳ Enviando…'}
        {status === 'success' && '✓ ¡Mensaje enviado! Te contactamos pronto.'}
        {status === 'error' && '⚠ Hubo un error — te redirigimos a WhatsApp'}
      </motion.button>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
        También puedes escribirnos directamente por WhatsApp — respondemos en menos de 1 hora en horario laboral.
      </p>

      <style>{`
        @media (max-width: 500px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const Contact = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      style={{
        position: 'relative',
        padding: 'clamp(72px, 10vw, 120px) 24px',
        background: '#0B0B0B',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(61,74,49,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 80px)' }}
        >
          <span style={{
            display: 'inline-block',
            marginBottom: '16px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8fad6e',
          }}>
            Hablemos
          </span>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(30px, 5vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Tu web empieza
            <br />
            <span style={{ color: '#8fad6e' }}>con una conversación</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Cuéntanos sobre tu negocio y recibe una propuesta
            sin compromiso en menos de 24 horas.
          </p>
        </motion.div>

        {/* Two columns */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '48px',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left — info */}
          <div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px',
            }}>
              Contacto directo
            </h3>

            {/* WhatsApp CTA */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, backgroundColor: '#20b858' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 22px',
                background: '#25D366',
                borderRadius: '10px',
                textDecoration: 'none',
                marginBottom: '32px',
                transition: 'background 0.2s',
              }}
            >
              <MessageCircle size={24} color="#fff" />
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', fontWeight: 700, color: '#fff' }}>
                  Escríbenos por WhatsApp
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  Respondemos en menos de 1 hora
                </div>
              </div>
            </motion.a>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: Mail, label: 'Email', value: 'hola@kactilabs.com' },
                { icon: Phone, label: 'Teléfono', value: '+51 999 999 999' },
                { icon: MapPin, label: 'Ubicación', value: 'Lima, Perú' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'rgba(61,74,49,0.25)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={16} color="#8fad6e" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '36px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#0B0B0B',
              marginBottom: '24px',
            }}>
              Cuéntanos sobre tu proyecto
            </h3>
            <ContactForm />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
