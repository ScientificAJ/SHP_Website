/*
 * Discussions rendering script
 *
 * Expects a global `discussions` array defined in data/discussions.js.  Renders
 * a list of discussion topics with author and date.  Comments are not
 * implemented in this static prototype.
 */
window.addEventListener('DOMContentLoaded', () => {
  const topicsContainer = document.getElementById('topics-container');
  if (!topicsContainer) return;
  discussions.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${topic.title}</h3>
      <small>Posted by ${topic.author} • ${topic.date}</small>
      <p>${topic.content}</p>
    `;
    topicsContainer.appendChild(card);
  });
});
