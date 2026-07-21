import ImageUploader from './ImageUploader';

function PropertiesPanel({ components, setComponents, selectedIndex }) {
  const selected = selectedIndex !== null ? components[selectedIndex] : null;

  const updateSelected = (updater) => {
    if (selectedIndex === null) return;
    const updated = [...components];
    updater(updated[selectedIndex]);
    setComponents(updated);
  };

  const handleTextChange = (event) => updateSelected((item) => { item.text = event.target.value; });
  const handleSubtextChange = (event) => updateSelected((item) => { item.subtext = event.target.value; });
  const handleColorChange = (event) => updateSelected((item) => { item.style = { ...(item.style || {}), color: event.target.value }; });
  const handleBackgroundChange = (event) => updateSelected((item) => { item.style = { ...(item.style || {}), background: event.target.value }; });
  const handleFontSizeChange = (event) => updateSelected((item) => { item.style = { ...(item.style || {}), fontSize: `${event.target.value}px` }; });
  const handlePaddingChange = (event) => updateSelected((item) => { item.style = { ...(item.style || {}), padding: event.target.value }; });
  const handleBorderRadiusChange = (event) => updateSelected((item) => { item.style = { ...(item.style || {}), borderRadius: `${event.target.value}px` }; });
  const handleImageChange = (src) => updateSelected((item) => { item.image = src; });

  return (
    <div style={{ width: '300px', padding: '20px', borderLeft: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(2, 6, 23, 0.95)', color: '#f8fafc', minHeight: '100vh', backdropFilter: 'blur(10px)' }}>
      <h2 style={{ marginTop: 0, color: '#ffffff' }}>Properties</h2>
      {!selected ? (
        <p style={{ color: '#e2e8f0' }}>Select a section to edit its text, colors, spacing, and media.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Title</label>
            <input value={selected.text || ''} onChange={handleTextChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.25)', background: 'rgba(15, 23, 42, 0.8)', color: '#f8fafc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Subtitle</label>
            <textarea value={selected.subtext || ''} onChange={handleSubtextChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.25)', background: 'rgba(15, 23, 42, 0.8)', color: '#f8fafc', minHeight: '80px' }} />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Text Color</label>
            <input type="color" value={selected.style?.color || '#111827'} onChange={handleColorChange} />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Background</label>
            <input type="color" value={selected.style?.background || '#ffffff'} onChange={handleBackgroundChange} />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Font Size</label>
            <input type="number" value={parseInt(selected.style?.fontSize || '24', 10)} min="12" max="72" onChange={handleFontSizeChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.25)', background: 'rgba(15, 23, 42, 0.8)', color: '#f8fafc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Padding</label>
            <input value={selected.style?.padding || '24px'} onChange={handlePaddingChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.25)', background: 'rgba(15, 23, 42, 0.8)', color: '#f8fafc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Border Radius</label>
            <input type="number" value={parseInt(selected.style?.borderRadius || '16', 10)} min="0" max="48" onChange={handleBorderRadiusChange} style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.25)', background: 'rgba(15, 23, 42, 0.8)', color: '#f8fafc' }} />
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', color: '#f8fafc' }}>Media</label>
            <ImageUploader currentSrc={selected.image || ''} onChange={handleImageChange} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertiesPanel;