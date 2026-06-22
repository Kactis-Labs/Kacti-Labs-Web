// Kacti Labs Logo — SVG isotipo fiel al logo original (cactus minimalista con líneas)
const KactiLogo = ({ className = '', textColor = '#0B0B0B', iconColor = '#3D4A31', showText = true, size = 'md' }) => {
  const sizes = {
    sm: { icon: 28, fontSize: '14px', letterSpacing: '0.08em' },
    md: { icon: 36, fontSize: '17px', letterSpacing: '0.09em' },
    lg: { icon: 48, fontSize: '22px', letterSpacing: '0.1em' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5" style={{ userSelect: 'none' }}>
      {/* Cactus SVG isotipo */}
      <svg
        width={s.icon}
        height={Math.round(s.icon * 1.1)}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Tronco central */}
        <line x1="50" y1="108" x2="50" y2="10" stroke={iconColor} strokeWidth="7" strokeLinecap="round" />
        {/* Línea central interior izquierda */}
        <line x1="43" y1="108" x2="43" y2="22" stroke={iconColor} strokeWidth="4" strokeLinecap="round" />
        {/* Línea central interior derecha */}
        <line x1="57" y1="108" x2="57" y2="22" stroke={iconColor} strokeWidth="4" strokeLinecap="round" />

        {/* Brazo izquierdo — curva hacia arriba */}
        <path d="M50 55 C50 55, 28 55, 20 42" stroke={iconColor} strokeWidth="7" strokeLinecap="round" fill="none"/>
        {/* Línea interior brazo izquierdo */}
        <path d="M43 58 C43 58, 24 57, 16 44" stroke={iconColor} strokeWidth="4" strokeLinecap="round" fill="none"/>
        {/* Punta brazo izquierdo — vertical hacia arriba */}
        <line x1="20" y1="42" x2="20" y2="22" stroke={iconColor} strokeWidth="7" strokeLinecap="round" />
        <line x1="13" y1="45" x2="13" y2="28" stroke={iconColor} strokeWidth="4" strokeLinecap="round" />

        {/* Brazo derecho — curva hacia arriba */}
        <path d="M50 55 C50 55, 72 55, 80 42" stroke={iconColor} strokeWidth="7" strokeLinecap="round" fill="none"/>
        {/* Línea interior brazo derecho */}
        <path d="M57 58 C57 58, 76 57, 84 44" stroke={iconColor} strokeWidth="4" strokeLinecap="round" fill="none"/>
        {/* Punta brazo derecho — vertical hacia arriba */}
        <line x1="80" y1="42" x2="80" y2="22" stroke={iconColor} strokeWidth="7" strokeLinecap="round" />
        <line x1="87" y1="45" x2="87" y2="28" stroke={iconColor} strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Texto del logo */}
      {showText && (
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: s.fontSize,
            fontWeight: 700,
            letterSpacing: s.letterSpacing,
            color: textColor,
            lineHeight: 1,
          }}
        >
          <span style={{ fontWeight: 800 }}>KACTI</span>{' '}
          <span style={{ fontWeight: 400 }}>LABS</span>
        </span>
      )}
    </div>
  );
};

export default KactiLogo;
