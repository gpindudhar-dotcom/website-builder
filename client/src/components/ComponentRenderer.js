function ComponentRenderer({ component, index, selectedIndex, setSelectedIndex, onDelete, onDuplicate }) {
  const commonStyle = {
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
    overflow: 'hidden',
    border: selectedIndex === index ? '2px solid #2563eb' : '1px solid #e5e7eb',
    transition: 'all 0.2s ease',
    marginBottom: '16px',
    cursor: 'pointer',
  };
  const imageStyle = component.image ? { width: '100%', height: '220px', objectFit: 'cover', display: 'block' } : null;

  const renderContent = () => {
    switch (component.type) {
      case 'hero':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || '#f8fafc' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <h1 style={{ fontSize: '36px', margin: '0 0 12px', color: component.style?.color || '#111827' }}>{component.text}</h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, margin: '0 0 16px', color: '#4b5563' }}>{component.subtext}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button style={{ padding: '12px 18px', borderRadius: '999px', border: 'none', background: '#2563eb', color: '#fff' }}>Explore</button>
              <button style={{ padding: '12px 18px', borderRadius: '999px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#111827' }}>Get Started</button>
            </div>
          </section>
        );
      case 'about':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || '#ffffff' }}>
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || '#111827' }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0', color: '#4b5563' }}>{component.subtext}</p>
          </section>
        );
      case 'services':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || '#f8fafc' }}>
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || '#111827' }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0', color: '#4b5563' }}>{component.subtext}</p>
          </section>
        );
      case 'gallery':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || '#ffffff' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || '#111827' }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0 0 16px', color: '#4b5563' }}>{component.subtext}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
              {[1,2,3].map((item) => (
                <div key={item} style={{ height: '140px', borderRadius: '12px', background: '#dbeafe' }} />
              ))}
            </div>
          </section>
        );
      case 'testimonials':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || '#f9fafb' }}>
            <h2 style={{ fontSize: '28px', margin: '0 0 12px', color: component.style?.color || '#111827' }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0', color: '#4b5563' }}>{component.subtext}</p>
          </section>
        );
      case 'contact':
        return (
          <section style={{ ...commonStyle, padding: '48px 24px', background: component.style?.background || '#1f2937', color: component.style?.color || '#ffffff' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <h2 style={{ fontSize: '28px', margin: '0 0 12px' }}>{component.text}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, margin: '0' }}>{component.subtext}</p>
          </section>
        );
      case 'footer':
        return (
          <footer style={{ ...commonStyle, padding: '26px 24px', background: component.style?.background || '#111827', color: component.style?.color || '#ffffff' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <p style={{ margin: 0 }}>{component.text}</p>
          </footer>
        );
      case 'navbar':
        return (
          <nav style={{ ...commonStyle, padding: '18px 24px', background: component.style?.background || '#111827', color: component.style?.color || '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {component.image && <img src={component.image} alt={component.text} style={imageStyle} />}
            <strong>{component.text}</strong>
            <div style={{ display: 'flex', gap: '14px' }}>
              <span>About</span>
              <span>Services</span>
              <span>Contact</span>
            </div>
          </nav>
        );
      default:
        return (
          <div style={{ ...commonStyle, padding: '24px' }}>
            <h3>{component.text}</h3>
            <p>{component.subtext || 'Custom section'}</p>
          </div>
        );
    }
  };

  return (
    <div onClick={() => setSelectedIndex(index)}>
      {renderContent()}
      {selectedIndex === index && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent: 'flex-end' }}>
          <button onClick={(event) => { event.stopPropagation(); onDuplicate(index); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#fff' }}>Duplicate</button>
          <button onClick={(event) => { event.stopPropagation(); onDelete(index); }} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dc2626', background: '#fee2e2', color: '#b91c1c' }}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ComponentRenderer;
