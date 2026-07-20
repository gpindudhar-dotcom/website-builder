function Toolbar({ onSave, onPreview, onPublish, viewMode, setViewMode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#ffffff', borderBottom: '1px solid #e5e7eb', gap: '12px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <strong>Builder Toolbar</strong>
        <span style={{ color: '#6b7280' }}>No-code website studio</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={() => setViewMode('desktop')} style={{ padding: '8px 12px', borderRadius: '8px', border: viewMode === 'desktop' ? '1px solid #2563eb' : '1px solid #d1d5db', background: viewMode === 'desktop' ? '#dbeafe' : '#ffffff' }}>Desktop</button>
        <button onClick={() => setViewMode('tablet')} style={{ padding: '8px 12px', borderRadius: '8px', border: viewMode === 'tablet' ? '1px solid #2563eb' : '1px solid #d1d5db', background: viewMode === 'tablet' ? '#dbeafe' : '#ffffff' }}>Tablet</button>
        <button onClick={() => setViewMode('mobile')} style={{ padding: '8px 12px', borderRadius: '8px', border: viewMode === 'mobile' ? '1px solid #2563eb' : '1px solid #d1d5db', background: viewMode === 'mobile' ? '#dbeafe' : '#ffffff' }}>Mobile</button>
        <button onClick={onPreview} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#f9fafb' }}>Preview</button>
        <button onClick={onPublish} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #16a34a', background: '#dcfce7', color: '#166534' }}>Publish</button>
        <button onClick={onSave} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #2563eb', background: '#2563eb', color: '#ffffff' }}>Save</button>
      </div>
    </div>
  );
}

export default Toolbar;
