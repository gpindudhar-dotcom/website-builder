import { useLocation } from 'react-router-dom';

function Preview() {
  const location = useLocation();
  const template = location.state?.template || 'Custom';
  const components = location.state?.components || [];

  return (
    <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '8px' }}>{template} Preview</h1>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Live preview of your no-code website.</p>
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)' }}>
        {components.length === 0 ? <p>No sections yet. Start building in the editor.</p> : components.map((section, index) => (
          <div key={`${section.type}-${index}`} style={{ marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <div style={{ padding: '16px', background: section.style?.background || '#ffffff', color: section.style?.color || '#111827' }}>
              {section.image && <img src={section.image} alt={section.text} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />}
              <h3 style={{ margin: '0 0 8px' }}>{section.text}</h3>
              {section.subtext && <p style={{ margin: 0, lineHeight: 1.6 }}>{section.subtext}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;