const links = Array.from(document.querySelectorAll('.nav-link'));
const pages = Array.from(document.querySelectorAll('.page'));
if (links.length > 0) {
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      pages.forEach((page) => {
        page.hidden = page.id !== targetId;
      });
      history.replaceState({}, '', link.getAttribute('href'));
    });
  });
}
