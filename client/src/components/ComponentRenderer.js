import { canvasTheme } from '../styles/canvasTheme';

function ComponentRenderer({ component, index, selectedIndex, setSelectedIndex, onDelete, onDuplicate }) {
  const commonStyle = {
    borderRadius: '20px',
    boxShadow: '0 16px 40px rgba(2, 6, 23, 0.28)',
    overflow: 'hidden',
    border: selectedIndex === index ? `2px solid ${canvasTheme.accent}` : `1px solid ${canvasTheme.border}`,
    transition: 'all 0.2s ease',
    marginBottom: '16px',
    cursor: 'pointer',
    position: 'relative',
    background: 'rgba(15, 23, 42, 0.88)',
    backdropFilter: 'blur(10px)',
  };
  const imageStyle = component.image ? { width: '100%', height: '220px', objectFit: 'cover', display: 'block' } : null;

  const renderContent = () => {
    switch (component.type) {
      case 'hero':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || 'linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.92))' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <h1 style={{ fontSize: '36px', margin: '0 0 12px', color: component.style?.color || canvasTheme.textPrimary, fontWeight: 800, letterSpacing: '0.2px', textShadow: '0 2px 10px rgba(0,0,0,0.28)' }}>{component.text}</h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, margin: '0 0 16px', color: component.style?.color ? component.style.color : canvasTheme.textSecondary, fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.18)' }}>{component.subtext}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button style={{ padding: '12px 18px', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#102043', fontWeight: 700 }}>Explore</button>
              <button style={{ padding: '12px 18px', borderRadius: '999px', border: `1px solid ${canvasTheme.border}`, background: 'rgba(15, 23, 42, 0.82)', color: canvasTheme.textPrimary, fontWeight: 700 }}>Get Started</button>
            </div>
          </section>
        );
      case 'about':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || 'linear-gradient(145deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.92))' }}>
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || canvasTheme.textPrimary, fontWeight: 800 }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0', color: component.style?.color ? component.style.color : canvasTheme.textSecondary }}>{component.subtext}</p>
          </section>
        );
      case 'services':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || 'linear-gradient(145deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.92))' }}>
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || canvasTheme.textPrimary, fontWeight: 800 }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0', color: component.style?.color ? component.style.color : canvasTheme.textSecondary }}>{component.subtext}</p>
          </section>
        );
      case 'gallery':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || 'linear-gradient(145deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.92))' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || canvasTheme.textPrimary, fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,0.22)' }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0 0 16px', color: component.style?.color ? component.style.color : canvasTheme.textSecondary, fontWeight: 600 }}>{component.subtext}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
              {[1,2,3].map((item) => (
                <div key={item} style={{ height: '140px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(139, 92, 246, 0.3))', border: `1px solid ${canvasTheme.borderAccent}` }} />
              ))}
            </div>
          </section>
        );
      case 'testimonials':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || 'linear-gradient(145deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.92))' }}>
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || canvasTheme.textPrimary, fontWeight: 800 }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0', color: component.style?.color ? component.style.color : canvasTheme.textSecondary }}>{component.subtext}</p>
          </section>
        );
      case 'contact':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || 'linear-gradient(145deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.92))', color: component.style?.color || canvasTheme.textPrimary }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: canvasTheme.textPrimary, fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,0.22)' }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0', color: canvasTheme.textSecondary, fontWeight: 600 }}>{component.subtext}</p>
          </section>
        );
      case 'footer':
        return (
          <footer style={{ ...commonStyle, padding: '26px 24px', background: component.style?.background || 'linear-gradient(145deg, rgba(17, 24, 39, 0.96), rgba(15, 23, 42, 0.96))', color: component.style?.color || canvasTheme.textPrimary }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <p style={{ margin: 0, color: canvasTheme.textPrimary, fontWeight: 700, fontSize: '16px' }}>{component.text}</p>
          </footer>
        );
      case 'navbar':
        return (
          <nav style={{ ...commonStyle, padding: '18px 24px', background: component.style?.background || 'linear-gradient(145deg, rgba(17, 24, 39, 0.96), rgba(15, 23, 42, 0.96))', color: component.style?.color || canvasTheme.textPrimary, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <strong style={{ color: canvasTheme.textPrimary, fontSize: '16px', fontWeight: 800 }}>{component.text}</strong>
            <div style={{ display: 'flex', gap: '14px' }}>
              <span style={{ color: canvasTheme.textSecondary, fontWeight: 600 }}>About</span>
              <span style={{ color: canvasTheme.textSecondary, fontWeight: 600 }}>Services</span>
              <span style={{ color: canvasTheme.textSecondary, fontWeight: 600 }}>Contact</span>
            </div>
          </nav>
        );
      default:
        return (
          <div style={{ ...commonStyle, padding: '24px', background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.92))' }}>
            <h3 style={{ margin: '0 0 8px', color: canvasTheme.textPrimary, fontWeight: 800 }}>{component.text}</h3>
            <p style={{ margin: 0, color: canvasTheme.textSecondary }}>{component.subtext || 'Custom section'}</p>
          </div>
        );
    }
  };

  return (
    <div onClick={() => setSelectedIndex(index)}>
      {renderContent()}
      {selectedIndex === index && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent: 'flex-end' }}>
          <button onClick={(event) => { event.stopPropagation(); onDuplicate(index); }} style={{ padding: '6px 10px', borderRadius: '8px', border: `1px solid ${canvasTheme.borderAccent}`, background: 'rgba(99, 102, 241, 0.16)', color: '#dbeafe' }}>Duplicate</button>
          <button onClick={(event) => { event.stopPropagation(); onDelete(index); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #f87171', background: 'rgba(185, 28, 28, 0.16)', color: '#fecaca' }}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ComponentRenderer;
