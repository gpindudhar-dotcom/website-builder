const fs = require('fs');
const path = require('path');

function slugify(value) {
  return (value || 'website')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeTemplateId(template) {
  const normalized = (template || '').toLowerCase();
  const aliases = {
    portfolio: 'portfolio',
    restaurant: 'restaurant',
    gym: 'gym',
    hospital: 'hospital',
    school: 'school',
    ecommerce: 'ecommerce',
    travel: 'travel',
    travelagency: 'travel',
    photography: 'photography',
    realestate: 'real-estate',
    'real-estate': 'real-estate',
    blog: 'blog',
  };
  return aliases[normalized] || 'portfolio';
}

function getTemplatePageDefinitions(templateId) {
  const pageDefinitions = {
    portfolio: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'about', title: 'About', key: 'about' },
      { slug: 'skills', title: 'Skills', key: 'skills' },
      { slug: 'projects', title: 'Projects', key: 'projects' },
      { slug: 'resume', title: 'Resume', key: 'resume' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    restaurant: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'about', title: 'About', key: 'about' },
      { slug: 'menu', title: 'Menu', key: 'menu' },
      { slug: 'gallery', title: 'Gallery', key: 'gallery' },
      { slug: 'reservation', title: 'Reservation', key: 'reservation' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    gym: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'about', title: 'About', key: 'about' },
      { slug: 'programs', title: 'Programs', key: 'programs' },
      { slug: 'trainers', title: 'Trainers', key: 'trainers' },
      { slug: 'pricing', title: 'Pricing', key: 'pricing' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    hospital: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'about', title: 'About', key: 'about' },
      { slug: 'doctors', title: 'Doctors', key: 'doctors' },
      { slug: 'departments', title: 'Departments', key: 'departments' },
      { slug: 'appointments', title: 'Appointments', key: 'appointments' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    school: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'about', title: 'About', key: 'about' },
      { slug: 'courses', title: 'Courses', key: 'courses' },
      { slug: 'teachers', title: 'Teachers', key: 'teachers' },
      { slug: 'admissions', title: 'Admissions', key: 'admissions' },
      { slug: 'gallery', title: 'Gallery', key: 'gallery' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    ecommerce: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'shop', title: 'Shop', key: 'shop' },
      { slug: 'product-details', title: 'Product Details', key: 'product-details' },
      { slug: 'categories', title: 'Categories', key: 'categories' },
      { slug: 'cart', title: 'Cart', key: 'cart' },
      { slug: 'wishlist', title: 'Wishlist', key: 'wishlist' },
      { slug: 'checkout', title: 'Checkout', key: 'checkout' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    travel: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'destinations', title: 'Destinations', key: 'destinations' },
      { slug: 'packages', title: 'Packages', key: 'packages' },
      { slug: 'gallery', title: 'Gallery', key: 'gallery' },
      { slug: 'booking', title: 'Booking', key: 'booking' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    photography: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'portfolio', title: 'Portfolio', key: 'portfolio' },
      { slug: 'services', title: 'Services', key: 'services' },
      { slug: 'pricing', title: 'Pricing', key: 'pricing' },
      { slug: 'gallery', title: 'Gallery', key: 'gallery' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    'real-estate': [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'properties', title: 'Properties', key: 'properties' },
      { slug: 'property-details', title: 'Property Details', key: 'property-details' },
      { slug: 'agents', title: 'Agents', key: 'agents' },
      { slug: 'about', title: 'About', key: 'about' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
    blog: [
      { slug: 'index', title: 'Home', key: 'home' },
      { slug: 'blog-listing', title: 'Blog Listing', key: 'blog-listing' },
      { slug: 'single-blog-page', title: 'Single Blog Page', key: 'single-blog-page' },
      { slug: 'categories', title: 'Categories', key: 'categories' },
      { slug: 'about', title: 'About', key: 'about' },
      { slug: 'contact', title: 'Contact', key: 'contact' },
    ],
  };

  return pageDefinitions[templateId] || pageDefinitions.portfolio;
}

function buildPageSections(templateId, pageKey, siteData) {
  const pageTitle = siteData.pageTitles[pageKey] || pageKey;
  const items = [];

  if (pageKey === 'home') {
    items.push({ type: 'hero', title: siteData.heroTitle, body: siteData.heroDescription, cta: 'Explore more' });
    items.push({ type: 'feature', title: 'Why choose us', body: siteData.aboutContent });
    items.push({ type: 'list', title: 'Highlights', body: siteData.servicesPreview });
  } else if (pageKey === 'about') {
    items.push({ type: 'feature', title: 'About us', body: siteData.aboutContent });
    items.push({ type: 'list', title: 'Our promise', body: siteData.servicesPreview });
  } else if (pageKey === 'contact') {
    items.push({ type: 'contact', title: 'Reach out', body: `${siteData.phone} · ${siteData.email}` });
  } else if (pageKey === 'menu' || pageKey === 'shop' || pageKey === 'programs' || pageKey === 'courses' || pageKey === 'destinations' || pageKey === 'portfolio' || pageKey === 'properties' || pageKey === 'blog-listing') {
    items.push({ type: 'list', title: pageTitle, body: `${siteData.servicesPreview}` });
    items.push({ type: 'feature', title: 'Featured options', body: siteData.aboutContent });
  } else if (pageKey === 'gallery' || pageKey === 'pricing' || pageKey === 'categories' || pageKey === 'packages' || pageKey === 'services' || pageKey === 'doctors' || pageKey === 'teachers' || pageKey === 'agents' || pageKey === 'single-blog-page') {
    items.push({ type: 'card', title: pageTitle, body: siteData.aboutContent });
    items.push({ type: 'feature', title: 'More details', body: siteData.servicesPreview });
  } else if (pageKey === 'reservation' || pageKey === 'appointments' || pageKey === 'booking' || pageKey === 'cart' || pageKey === 'wishlist' || pageKey === 'checkout' || pageKey === 'admissions' || pageKey === 'resume' || pageKey === 'skills' || pageKey === 'projects' || pageKey === 'trainers' || pageKey === 'departments' || pageKey === 'product-details' || pageKey === 'categories') {
    items.push({ type: 'card', title: pageTitle, body: siteData.servicesPreview });
  } else {
    items.push({ type: 'card', title: pageTitle, body: siteData.aboutContent });
  }

  return items;
}

function buildPageHtml(templateId, page, navPages, siteData, outputDir) {
  const sections = buildPageSections(templateId, page.key, siteData);
  const sectionMarkup = sections.map((section) => {
    const cardClass = section.type === 'hero' ? 'hero-card' : 'info-card';
    const title = escapeHtml(section.title || page.title);
    const body = escapeHtml(section.body || '');
    let extraMarkup = '';

    if (section.type === 'contact') {
      extraMarkup = `
        <form class="contact-form" novalidate>
          <label>Name<input type="text" name="name" required /></label>
          <label>Email<input type="email" name="email" required /></label>
          <label>Message<textarea name="message" required></textarea></label>
          <button type="submit">Send</button>
          <p class="form-note">Frontend validation is enabled for a smooth experience.</p>
        </form>`;
    } else if (section.type === 'hero') {
      extraMarkup = `
        <div class="hero-actions">
          <a class="button" href="${page.slug === 'index' ? 'about.html' : 'about.html'}">Learn more</a>
          <a class="button secondary" href="${page.slug === 'index' ? 'contact.html' : 'contact.html'}">Contact us</a>
        </div>`;
    }

    return `<section class="${cardClass}">
      <h3>${title}</h3>
      <p>${body}</p>
      ${extraMarkup}
    </section>`;
  }).join('');

  const navMarkup = navPages.map((navPage) => {
    const href = navPage.slug === 'index' ? 'index.html' : `${navPage.slug}.html`;
    return `<a href="${href}">${escapeHtml(navPage.title)}</a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)} | ${escapeHtml(siteData.siteName)}</title>
    <meta name="description" content="${escapeHtml(siteData.heroDescription)}" />
    <link rel="stylesheet" href="./css/style.css" />
  </head>
  <body>
    <div class="page-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">${escapeHtml(siteData.siteName)}</p>
          <h1>${escapeHtml(siteData.heroTitle)}</h1>
        </div>
        <nav class="main-nav">${navMarkup}</nav>
      </header>
      <main>
        <section class="content-card">
          <h2>${escapeHtml(page.title)}</h2>
          ${sectionMarkup}
        </section>
      </main>
      <footer class="footer">
        <p>${escapeHtml(siteData.siteName)} · ${escapeHtml(siteData.address)} · ${escapeHtml(siteData.phone)} · ${escapeHtml(siteData.email)}</p>
      </footer>
    </div>
    <script src="./js/script.js"></script>
  </body>
</html>`;
}

function createSiteAssets(outputDir) {
  fs.mkdirSync(path.join(outputDir, 'css'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'js'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'images'), { recursive: true });
  fs.mkdirSync(path.join(outputDir, 'assets'), { recursive: true });

  fs.writeFileSync(path.join(outputDir, 'css', 'style.css'), `:root { color-scheme: light; --accent: #2563eb; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, Arial, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); color: #111827; }
.page-shell { max-width: 1200px; margin: 0 auto; padding: 24px; }
.topbar { background: linear-gradient(135deg, #0f172a 0%, var(--accent) 100%); color: #fff; border-radius: 24px; padding: 24px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; align-items: center; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.16); }
.eyebrow { text-transform: uppercase; letter-spacing: 0.24em; font-size: 0.76rem; margin: 0 0 8px; opacity: 0.85; }
.main-nav { display: flex; flex-wrap: wrap; gap: 10px; }
.main-nav a { color: #fff; text-decoration: none; font-weight: 600; padding: 8px 12px; border-radius: 999px; background: rgba(255,255,255,0.16); }
main { margin-top: 20px; }
.content-card { background: #fff; border-radius: 24px; padding: 24px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); }
.hero-card, .info-card { background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); border-radius: 18px; padding: 18px; margin-bottom: 16px; }
.hero-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
.button { display: inline-block; background: var(--accent); color: #fff; padding: 10px 14px; border-radius: 999px; text-decoration: none; font-weight: 600; }
.button.secondary { background: #111827; }
.contact-form { display: grid; gap: 10px; margin-top: 12px; }
.contact-form input, .contact-form textarea { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #d1d5db; }
.contact-form button { border: none; padding: 10px 14px; border-radius: 999px; background: var(--accent); color: #fff; font-weight: 700; cursor: pointer; }
.form-note { color: #475569; font-size: 0.95rem; }
.footer { margin-top: 20px; color: #475569; text-align: center; font-size: 0.95rem; }
img { width: 100%; max-height: 260px; object-fit: cover; border-radius: 16px; margin-bottom: 12px; }
@media (max-width: 768px) {
  .page-shell { padding: 16px; }
  .topbar { padding: 18px; }
  .main-nav { width: 100%; }
  .main-nav a { flex: 1 1 calc(50% - 8px); text-align: center; }
}
`, 'utf8');

  fs.writeFileSync(path.join(outputDir, 'js', 'script.js'), `document.querySelectorAll('.contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    const isValid = requiredFields.every((field) => field.value.trim() !== '');
    const note = form.querySelector('.form-note');
    if (!isValid) {
      if (note) note.textContent = 'Please fill out every required field before sending.';
      return;
    }
    if (note) note.textContent = 'Thank you! Your message has been received.';
    form.reset();
  });
});
`, 'utf8');

  fs.writeFileSync(path.join(outputDir, 'images', 'hero.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><rect width="1200" height="700" rx="40" fill="#eff6ff"/><rect x="90" y="100" width="1020" height="500" rx="32" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/><circle cx="310" cy="360" r="110" fill="#2563eb" fill-opacity="0.16"/><rect x="470" y="230" width="300" height="32" rx="16" fill="#2563eb"/><rect x="470" y="290" width="240" height="24" rx="12" fill="#64748b"/><rect x="470" y="332" width="260" height="24" rx="12" fill="#94a3b8"/><rect x="470" y="384" width="220" height="24" rx="12" fill="#94a3b8"/></svg>`, 'utf8');
  fs.writeFileSync(path.join(outputDir, 'images', 'gallery.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><rect width="1200" height="700" rx="40" fill="#f8fafc"/><rect x="80" y="120" width="1040" height="460" rx="32" fill="#fff" stroke="#dbeafe" stroke-width="4"/><rect x="140" y="180" width="280" height="180" rx="24" fill="#93c5fd"/><rect x="460" y="180" width="280" height="180" rx="24" fill="#bfdbfe"/><rect x="780" y="180" width="280" height="180" rx="24" fill="#60a5fa"/><rect x="140" y="390" width="280" height="140" rx="24" fill="#dbeafe"/><rect x="460" y="390" width="280" height="140" rx="24" fill="#bfdbfe"/><rect x="780" y="390" width="280" height="140" rx="24" fill="#93c5fd"/></svg>`, 'utf8');
  fs.writeFileSync(path.join(outputDir, 'assets', 'brand.svg'), `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180"><rect width="400" height="180" rx="28" fill="#0f172a"/><circle cx="120" cy="90" r="50" fill="#2563eb"/><text x="200" y="92" fill="#ffffff" font-family="Arial" font-size="32" font-weight="700">Build</text><text x="200" y="126" fill="#93c5fd" font-family="Arial" font-size="20">Ready website</text></svg>`, 'utf8');
}

function buildStaticSite({ title, slug, pages, template, customization = {} }) {
  const safeTitle = title || customization.siteName || customization.businessName || 'My Website';
  const safeSlug = slugify(slug || safeTitle);
  const normalizedTemplate = normalizeTemplateId(template);
  const pageDefinitions = getTemplatePageDefinitions(normalizedTemplate);

  const siteData = {
    siteName: safeTitle,
    ownerName: customization.ownerName || customization.businessName || safeTitle,
    heroTitle: customization.heroTitle || `${safeTitle}`,
    heroDescription: customization.heroDescription || 'A polished, modern website generated from your builder.',
    aboutContent: customization.aboutContent || 'This website was built to help visitors understand your story, offerings, and next steps.',
    servicesPreview: customization.services || customization.products || customization.pricing || 'Flexible services, curated offerings, and a seamless customer experience.',
    address: customization.address || '123 Main Street',
    phone: customization.phone || '(555) 010-0000',
    email: customization.email || 'hello@example.com',
    themeColor: customization.themeColor || '#2563eb',
    pageTitles: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      resume: 'Resume',
      contact: 'Contact',
      menu: 'Menu',
      gallery: 'Gallery',
      reservation: 'Reservation',
      programs: 'Programs',
      trainers: 'Trainers',
      pricing: 'Pricing',
      doctors: 'Doctors',
      departments: 'Departments',
      appointments: 'Appointments',
      courses: 'Courses',
      teachers: 'Teachers',
      admissions: 'Admissions',
      shop: 'Shop',
      'product-details': 'Product Details',
      categories: 'Categories',
      cart: 'Cart',
      wishlist: 'Wishlist',
      checkout: 'Checkout',
      destinations: 'Destinations',
      packages: 'Packages',
      booking: 'Booking',
      portfolio: 'Portfolio',
      services: 'Services',
      properties: 'Properties',
      'property-details': 'Property Details',
      agents: 'Agents',
      'blog-listing': 'Blog Listing',
      'single-blog-page': 'Single Blog Page',
    },
  };

  const outputDir = path.join(__dirname, '..', 'published-sites', safeSlug);
  fs.mkdirSync(outputDir, { recursive: true });

  const cssPath = path.join(outputDir, 'css', 'style.css');
  createSiteAssets(outputDir);

  const navPages = pageDefinitions.map((page) => ({ slug: page.slug, title: page.title }));
  pageDefinitions.forEach((page) => {
    const html = buildPageHtml(normalizedTemplate, page, navPages, siteData, outputDir);
    const fileName = page.slug === 'index' ? 'index.html' : `${page.slug}.html`;
    fs.writeFileSync(path.join(outputDir, fileName), html, 'utf8');
  });

  fs.writeFileSync(path.join(outputDir, 'README.md'), `# ${escapeHtml(safeTitle)}\n\nThis project was generated for the ${escapeHtml(normalizedTemplate)} template. Open index.html in a browser or serve the folder from your local web server.\n`, 'utf8');

  const css = fs.readFileSync(cssPath, 'utf8').replace('--accent: #2563eb;', `--accent: ${siteData.themeColor};`);
  fs.writeFileSync(cssPath, css, 'utf8');

  return { slug: safeSlug, url: `/published/${safeSlug}/`, outputDir };
}

module.exports = { buildStaticSite, slugify };
