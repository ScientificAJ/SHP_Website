/*
 * Updates rendering script
 *
 * Expects a global `updates` array defined in data/updates.js.  Creates
 * update cards on updates.html.  Each update has a date, title, content and
 * optional link.
 */
window.addEventListener('DOMContentLoaded', () => {
  const updatesContainer = document.getElementById('updates-container');
  if (!updatesContainer) return;
  updates.forEach(update => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${update.title}</h3>
      <small>${update.date}</small>
      <p>${update.content.replace(/\n/g, '<br>')}</p>
    `;
    updatesContainer.appendChild(card);
  });
});
