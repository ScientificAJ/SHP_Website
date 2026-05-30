/*
 * Gallery rendering script
 *
 * Expects a global `projects` array defined in data/projects.js.  Populates the
 * gallery grid on projects.html.  Each project has a title, description and
 * optional badges (e.g. Winner).
 */
window.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('project-gallery');
  if (!gallery) return;
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const badgesHtml = project.badges.map(b => `<span class="badge">${b}</span>`).join(' ');
    card.innerHTML = `
      ${badgesHtml}
      <h4>${project.title}</h4>
      <p>${project.description}</p>
    `;
    gallery.appendChild(card);
  });
});
