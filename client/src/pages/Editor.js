import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../styles/Editor.css';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import Toolbar from '../components/Toolbar';

const API_BASE_URL = process.env.REACT_APP_API_URL || ' website-builder-2x99:5000';

function Editor() {
  const navigate = useNavigate();
  const location = useLocation();
  const template = location.state?.template;
  const initialTemplate = location.state?.templateData;

  const [components, setComponents] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [siteTitle, setSiteTitle] = useState(template || 'My Website');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (initialTemplate?.sections) {
      setComponents(initialTemplate.sections.map((section) => ({ ...section })));
    }
  }, [initialTemplate]);

  useEffect(() => {
    if (template) {
      setSiteTitle(template);
    }
  }, [template]);

  const viewModeStyles = useMemo(() => ({
    desktop: { maxWidth: '100%' },
    tablet: { maxWidth: '900px' },
    mobile: { maxWidth: '480px' },
  }), []);

  const saveWebsite = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/api/websites`,
        {
          title: siteTitle || 'My Website',
          template: template || 'Custom',
          content: { sections: components },
        },
        { headers: { Authorization: token } }
      );
      setSaveMessage('Website saved to your account.');
    } catch (err) {
      setSaveMessage('Saving failed. Please sign in and try again.');
    }
  };

  const addComponent = (type) => {
    const defaults = {
      navbar: { text: 'New Navbar', subtext: 'Highlight your primary links and brand message.' },
      hero: { text: 'New Hero Section', subtext: 'Tell visitors what makes your business memorable.' },
      about: { text: 'About Section', subtext: 'Share your mission, story, or point of view.' },
      services: { text: 'Services Section', subtext: 'List the offerings or solutions you provide.' },
      gallery: { text: 'Gallery Section', subtext: 'Showcase your work, products, or highlights.' },
      testimonials: { text: 'Testimonials', subtext: 'Add social proof to build confidence fast.' },
      contact: { text: 'Contact Section', subtext: 'Make it easy for visitors to reach you.' },
      footer: { text: 'Footer', subtext: 'Add your contact details or copyright information.' },
    };

    const next = defaults[type] || defaults.footer;
    const newComponent = {
      type,
      text: next.text,
      subtext: next.subtext,
      style: { background: '#ffffff', color: '#111827', padding: '24px', borderRadius: '16px' },
    };
    setComponents((prev) => [...prev, newComponent]);
    setSelectedIndex(components.length);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...components];
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);
    setComponents(items);
  };

  const handleDelete = (index) => {
    const updated = components.filter((_, itemIndex) => itemIndex !== index);
    setComponents(updated);
    setSelectedIndex(null);
  };

  const handleDuplicate = (index) => {
    const updated = [...components];
    updated.splice(index + 1, 0, { ...updated[index] });
    setComponents(updated);
  };

  const handlePreview = () => {
    navigate('/preview', { state: { template: siteTitle, components } });
  };

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/api/websites/publish`,
        {
          title: siteTitle || 'My Website',
          template: template || 'Custom',
          content: { sections: components },
          customization: {
            siteName: siteTitle || 'My Website',
            heroTitle: siteTitle || 'My Website',
            heroDescription: 'A polished website generated from your builder.',
            aboutContent: 'This website was created with the website builder and published as a complete multi-page project.',
            services: components.map((section) => section.text || section.type).join(', '),
            address: 'Your address',
            phone: 'Your phone number',
            email: 'your@email.com',
            themeColor: '#2563eb',
          },
        },
        { headers: { Authorization: token } }
      );

      const publishedUrl = response.data?.publishedUrl || '';
      setSaveMessage(`Your site is live at ${publishedUrl || 'the published URL'}.`);
      window.open(`${API_BASE_URL}${publishedUrl}`, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setSaveMessage('Publishing failed. Please sign in and try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)' }}>
      <Toolbar onSave={saveWebsite} onPreview={handlePreview} onPublish={handlePublish} viewMode={viewMode} setViewMode={setViewMode} />
      <div style={{ padding: '16px 20px 0' }}>
        <label htmlFor="site-title" style={{ fontWeight: 700, display: 'block', marginBottom: '8px' }}>Site Title</label>
        <input
          id="site-title"
          aria-label="Site title"
          value={siteTitle}
          onChange={(event) => setSiteTitle(event.target.value)}
          style={{ width: '100%', maxWidth: '420px', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(148, 163, 184, 0.25)', background: 'rgba(15, 23, 42, 0.78)', color: '#f8fafc' }}
        />
        {saveMessage && <p style={{ color: '#c4b5fd', marginTop: '8px' }}>{saveMessage}</p>}
      </div>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 140px)' }}>
        <Sidebar addComponent={addComponent} />
        <Canvas
          components={components}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          handleDragEnd={handleDragEnd}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          viewMode={viewMode}
          viewModeStyles={viewModeStyles[viewMode]}
        />
        <PropertiesPanel components={components} setComponents={setComponents} selectedIndex={selectedIndex} />
      </div>
    </div>
  );
}

export default Editor;