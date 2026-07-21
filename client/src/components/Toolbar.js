function Toolbar({ onSave, onPreview, onPublish, viewMode, setViewMode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(2, 6, 23, 0.85)', borderBottom: '1px solid rgba(148, 163, 184, 0.2)', gap: '12px', flexWrap: 'wrap', backdropFilter: 'blur(12px)' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <strong style={{ color: '#ffffff', fontSize: '15px' }}>Builder Toolbar</strong>
        <span style={{ color: '#e2e8f0' }}>No-code website studio</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={() => setViewMode('desktop')} style={{ padding: '8px 12px', borderRadius: '999px', border: viewMode === 'desktop' ? '1px solid #818cf8' : '1px solid rgba(148, 163, 184, 0.25)', background: viewMode === 'desktop' ? 'rgba(99, 102, 241, 0.23)' : 'rgba(15, 23, 42, 0.9)', color: '#f8fafc' }}>Desktop</button>
        <button onClick={() => setViewMode('tablet')} style={{ padding: '8px 12px', borderRadius: '999px', border: viewMode === 'tablet' ? '1px solid #818cf8' : '1px solid rgba(148, 163, 184, 0.25)', background: viewMode === 'tablet' ? 'rgba(99, 102, 241, 0.23)' : 'rgba(15, 23, 42, 0.9)', color: '#f8fafc' }}>Tablet</button>
        <button onClick={() => setViewMode('mobile')} style={{ padding: '8px 12px', borderRadius: '999px', border: viewMode === 'mobile' ? '1px solid #818cf8' : '1px solid rgba(148, 163, 184, 0.25)', background: viewMode === 'mobile' ? 'rgba(99, 102, 241, 0.23)' : 'rgba(15, 23, 42, 0.9)', color: '#f8fafc' }}>Mobile</button>
        <button onClick={onPreview} style={{ padding: '8px 12px', borderRadius: '999px', border: '1px solid rgba(148, 163, 184, 0.25)', background: 'rgba(15, 23, 42, 0.9)', color: '#f8fafc' }}>Preview</button>
        <button onClick={onPublish} style={{ padding: '8px 12px', borderRadius: '999px', border: '1px solid #34d399', background: 'rgba(16, 185, 129, 0.2)', color: '#d1fae5' }}>Publish</button>
        <button onClick={onSave} style={{ padding: '8px 12px', borderRadius: '999px', border: '1px solid #818cf8', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#ffffff' }}>Save</button>
      </div>
    </div>
  );
}

export default Toolbar;
