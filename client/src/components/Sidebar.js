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
    <div style={{ width: '280px', background: '#111827', color: '#f9fafb', padding: '20px', borderRight: '1px solid #374151', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '18px' }}>Builder Blocks</h2>
      <p style={{ color: '#9ca3af', marginBottom: '16px' }}>Add polished sections to your website.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {componentTypes.map((item) => (
          <button key={item.type} onClick={() => addComponent(item.type)} style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid #374151', background: '#1f2937', color: '#f9fafb', textAlign: 'left' }}>
            + {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;