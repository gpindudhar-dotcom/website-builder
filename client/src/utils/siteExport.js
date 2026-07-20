export function buildPublishedSite(siteTitle, pages) {
  const safeTitle = siteTitle || 'My Website';
  const normalizedPages = (pages || []).filter((page) => page && (page.components?.length || page.sections?.length));

  const pageMarkup = normalizedPages.map((page) => {
    const sections = page.components || page.sections || [];
    const sectionMarkup = sections.map((section) => {
      const bg = section.style?.background || '#ffffff';
      const color = section.style?.color || '#111827';
      const padding = section.style?.padding || '24px';
      const radius = section.style?.borderRadius || '16px';
      const imageMarkup = section.image ? `<img src="${section.image}" alt="${section.text}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 12px; margin-bottom: 12px;" />` : '';
      return `<section style="background:${bg}; color:${color}; padding:${padding}; border-radius:${radius}; margin-bottom: 16px;">
        ${imageMarkup}
        <h2>${section.text}</h2>
        <p>${section.subtext || ''}</p>
      </section>`;
    }).join('');

    return `<section id="page-${page.id || page.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'page'}" class="page" style="display: ${page.id === normalizedPages[0]?.id ? 'block' : 'none'};">
      <h1>${page.name || 'Page'}</h1>
      ${sectionMarkup}
    </section>`;
  }).join('');

  const navMarkup = normalizedPages.length > 1 ? `<nav style="display:flex; gap:12px; margin-bottom: 24px; flex-wrap: wrap;">
    ${normalizedPages.map((page) => `<a href="#page-${page.id || page.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'page'}" style="text-decoration:none; color:#2563eb; font-weight:600;">${page.name || 'Page'}</a>`).join('')}
  </nav>` : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <style>
      body { margin: 0; font-family: Inter, Arial, sans-serif; background: #f8fafc; color: #111827; }
      main { max-width: 1200px; margin: 0 auto; padding: 24px; }
      nav { background: #ffffff; padding: 16px 20px; border-radius: 16px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08); }
      section { border-radius: 16px; padding: 24px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08); background: #ffffff; }
      h1, h2, h3, p { margin-top: 0; }
      button { border: none; border-radius: 999px; padding: 12px 18px; background: #2563eb; color: white; cursor: pointer; }
    </style>
  </head>
  <body>
    <main>
      ${navMarkup}
      ${pageMarkup}
    </main>
    <script>
      const links = Array.from(document.querySelectorAll('nav a'));
      const pages = Array.from(document.querySelectorAll('.page'));
      links.forEach((link) => {
        link.addEventListener('click', (event) => {
          const targetId = link.getAttribute('href').replace('#', '');
          event.preventDefault();
          pages.forEach((page) => {
            page.style.display = page.id === targetId ? 'block' : 'none';
          });
          history.replaceState({}, '', link.getAttribute('href'));
        });
      });
    </script>
  </body>
</html>`;
}
