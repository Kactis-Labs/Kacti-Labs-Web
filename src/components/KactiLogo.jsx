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
      {/* Cactus icon — kacti-icon-only.svg (viewBox tightly cropped to content) */}
      <img
        src="/kacti-icon-only.svg"
        alt=""
        aria-hidden="true"
        style={{
          width: Math.round(s.icon * 0.5),
          height: s.icon,
          objectFit: 'contain',
          flexShrink: 0,
          display: 'block',
        }}
      />

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
