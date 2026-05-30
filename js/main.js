// scroll-reveal.js
// This script adds a gentle reveal animation for cards, tables and sections
// as they appear in the viewport. It enhances the perception of depth
// without impacting accessibility.  Elements are initially hidden and
// slide up into view when scrolled into sight.

document.addEventListener('DOMContentLoaded', () => {
  // Select elements that should reveal on scroll. You can add more
  // selectors here if you create new types of content that should animate.
  const revealables = document.querySelectorAll(
    '.card, .project-card, table.schedule, table.prizes, section'
  );
  revealables.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealables.forEach(el => {
    observer.observe(el);
  });
});