const componentTypes = [
  { type: 'navbar', label: 'Navbar' },
  { type: 'hero', label: 'Hero' },
  { type: 'about', label: 'About' },
  { type: 'services', label: 'Services' },
  { type: 'gallery', label: 'Gallery' },
  { type: 'testimonials', label: 'Testimonials' },
  { type: 'contact', label: 'Contact' },
  { type: 'footer', label: 'Footer' },
];

function Sidebar({ addComponent }) {
  return (
    <div style={{ width: '280px', background: 'rgba(2, 6, 23, 0.95)', color: '#f9fafb', padding: '20px', borderRight: '1px solid rgba(148, 163, 184, 0.18)', minHeight: '100vh', backdropFilter: 'blur(10px)' }}>
      <h2 style={{ marginBottom: '18px', color: '#ffffff' }}>Builder Blocks</h2>
      <p style={{ color: '#e2e8f0', marginBottom: '16px' }}>Add polished sections to your website.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {componentTypes.map((item) => (
          <button key={item.type} onClick={() => addComponent(item.type)} style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(129, 140, 248, 0.2)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))', color: '#f9fafb', textAlign: 'left' }}>
            + {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;