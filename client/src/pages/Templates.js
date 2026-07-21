import { useNavigate } from 'react-router-dom';
import { templateCatalog } from '../templates/templateData';

function Templates() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px', background: 'linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#ffffff', fontWeight: 700, letterSpacing: '0.2px' }}>Choose a Professional Template</h1>
          <p style={{ color: '#e2e8f0', margin: '6px 0 0', fontSize: '15px', fontWeight: 500 }}>Start with a complete no-code website foundation and tailor it to your brand.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {templateCatalog.map((template) => (
          <div key={template.id} data-testid={`template-card-${template.id}`} style={{ background: 'rgba(15, 23, 42, 0.86)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(2, 6, 23, 0.35)', border: '1px solid rgba(148, 163, 184, 0.18)', backdropFilter: 'blur(10px)' }}>
            <img src={template.preview} alt={template.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '16px' }}>
              <h2 style={{ margin: '0 0 8px', color: '#ffffff', fontWeight: 700 }}>{template.name}</h2>
              <p style={{ color: '#e2e8f0', margin: '0 0 12px', lineHeight: 1.5 }}>{template.tagline}</p>
              <button onClick={() => navigate('/editor', { state: { template: template.name, templateData: template } })} style={{ padding: '10px 12px', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', cursor: 'pointer' }}>
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;