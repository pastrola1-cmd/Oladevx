/* ==========================================================================
   OLADEVX SCROLL REVEALS & INTERSECTION OBSERVER ANIMATIONS
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll-triggered page entrance animation
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fits full view
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // Count up stats counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const speed = 1000; // Complete within 1 second
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(speed / frameRate);
    let currentFrame = 0;
    
    const countInterval = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Ease out cubic function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(easeProgress * target);
      
      element.textContent = currentValue + suffix;
      
      if (currentFrame >= totalFrames) {
        clearInterval(countInterval);
        element.textContent = target + suffix;
      }
    }, frameRate);
  };
  
  const statsSection = document.querySelector('.snapshot-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => countUp(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
  }
});
