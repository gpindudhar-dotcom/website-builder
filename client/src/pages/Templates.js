import { useNavigate } from 'react-router-dom';
import { templateCatalog } from '../templates/templateData';

function Templates() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Choose a Professional Template</h1>
          <p style={{ color: '#6b7280', margin: '6px 0 0' }}>Start with a complete no-code website foundation and tailor it to your brand.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {templateCatalog.map((template, index) => (
          <div key={template.id} data-testid={`template-card-${template.id}`} style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)', border: '1px solid #e5e7eb' }}>
            <img src={template.preview} alt={template.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
            <div style={{ padding: '16px' }}>
              <h2 style={{ margin: '0 0 8px' }}>{template.name}</h2>
              <p style={{ color: '#6b7280', margin: '0 0 12px' }}>{template.tagline}</p>
              <button onClick={() => navigate('/editor', { state: { template: template.name, templateData: template } })} style={{ padding: '10px 12px', borderRadius: '10px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
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