import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import KactiLogo from './KactiLogo';
import { getWhatsAppURL } from '../config/env';

// Inline SVGs for brand icons as they were removed from lucide-react
const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0B0B0B',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      paddingTop: '80px',
      paddingBottom: '40px',
      color: 'rgba(255,255,255,0.7)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '64px',
          marginBottom: '80px',
        }}>
          {/* Brand col */}
          <div style={{ gridColumn: '1 / -1', maxWidth: '400px' }}>
            <div style={{ marginBottom: '24px' }}>
              <KactiLogo textColor="#fff" iconColor="#8fad6e" />
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}>
              Estudio de diseño y desarrollo web premium para negocios locales en Perú. 
              Creamos páginas que generan confianza y convierten visitantes en clientes.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { icon: InstagramIcon, url: '#' },
                { icon: LinkedinIcon, url: '#' },
                { icon: TwitterIcon, url: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: '#fff' }}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s',
                  }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links col 1 */}
          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px',
            }}>Navegación</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Servicios', href: '#servicios' },
                { label: 'Por qué elegirnos', href: '#por-que-elegirnos' },
                { label: 'Portafolio', href: '#portafolio' },
                { label: 'Proceso', href: '#proceso' },
                { label: 'FAQ', href: '#faq' },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links col 2 */}
          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px',
            }}>Servicios</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Páginas Landing', href: '#servicios' },
                { label: 'Webs Institucionales', href: '#servicios' },
                { label: 'Plan Tranquilidad Web', href: '#tranquilidad' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
        }}>
          <div>
            © {currentYear} Kacti Labs. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Política de Privacidad</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
