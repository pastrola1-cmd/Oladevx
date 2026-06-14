/* ==========================================================================
   OLADEVX MAIN APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Custom Cursor Trail (Desktop only)
     ========================================================================== */
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      // Direct positioning
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      
      // Buffered positioning for trail effect
      cursor.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 120, fill: 'forwards' });
    });
    
    // Hover styling indicators
    const hoverables = document.querySelectorAll('a, button, .case-header, .os-card, .tech-card, .form-input, .form-textarea');
    hoverables.forEach(item => {
      item.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      item.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  /* ==========================================================================
     2. Header Shrink & Back-To-Top button on Scroll
     ========================================================================== */
  const header = document.querySelector('.header');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      scrollTopBtn.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. Active Menu Navigation State Highlight
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100; // offset
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  /* ==========================================================================
     4. Mobile Navigation Hamburger Menu Overlay
     ========================================================================== */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-menu li a');
  
  if (hamburger && navMenu) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  /* ==========================================================================
     5. Typewriter Effect
     ========================================================================== */
  const typewriterText = document.querySelector('.typewriter-text');
  if (typewriterText) {
    const textToType = typewriterText.getAttribute('data-text');
    let index = 0;
    
    const type = () => {
      if (index < textToType.length) {
        typewriterText.textContent += textToType.charAt(index);
        index++;
        setTimeout(type, 80); // speed
      } else {
        typewriterText.classList.remove('typewriter-cursor');
      }
    };
    
    // Begin typing delay
    setTimeout(type, 500);
  }

  /* ==========================================================================
     6. Spotlight Card Glow Effect (Dynamic Mouse Follow Gradient)
     ========================================================================== */
  const glowCards = document.querySelectorAll('.os-card, .service-card, .tech-card, .blog-card, .product-card');
  
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  /* ==========================================================================
     7. Case Studies Accordion (Smooth Height Transitions)
     ========================================================================== */
  const accordions = document.querySelectorAll('.case-accordion');
  
  accordions.forEach((acc, index) => {
    const header = acc.querySelector('.case-header');
    const body = acc.querySelector('.case-body');
    
    // Open first case study by default
    if (index === 0) {
      acc.classList.add('active');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
    
    header.addEventListener('click', () => {
      const isOpen = acc.classList.contains('active');
      
      // Close all accordions
      accordions.forEach(a => {
        a.classList.remove('active');
        a.querySelector('.case-body').style.maxHeight = null;
      });
      
      // If clicked one wasn't open, open it
      if (!isOpen) {
        acc.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     8. Testimonial Slides Carousel
     ========================================================================== */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.testimonial-controls');
  let currentSlide = 0;
  let slideInterval;
  
  if (slides.length > 0 && dotsContainer) {
    // Generate navigation dots dynamically
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    const goToSlide = (n) => {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      resetInterval();
    };
    
    const nextSlide = () => {
      goToSlide(currentSlide + 1);
    };
    
    const resetInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000); // auto slide every 5 seconds
    };
    
    resetInterval();
    
    // Pause auto-sliding on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
      sliderContainer.addEventListener('mouseleave', resetInterval);
    }
  }

  /* ==========================================================================
     9. Interactive Contact Form Handler & Submission Simulation
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      
      const action = contactForm.getAttribute('action');
      
      if (action && action.startsWith('http')) {
        // Real API submission
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        fetch(action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            submitBtn.style.background = 'var(--accent-secondary)';
            contactForm.reset();
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          submitBtn.innerHTML = 'Error! Try Again <i class="fas fa-exclamation-triangle"></i>';
          submitBtn.style.background = '#ef4444';
          console.error('Submission error:', error);
        })
        .finally(() => {
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
          }, 3000);
        });
      } else {
        // Simulate API submit delay (for local preview/testing)
        setTimeout(() => {
          submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
          submitBtn.style.background = 'var(--accent-secondary)';
          
          // Reset form inputs
          contactForm.reset();
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = ''; // restore gradient
          }, 3000);
        }, 1500);
      }
    });
  }
  /* ==========================================================================
     10. Magnetic Button Interaction (Desktop only)
     ========================================================================== */
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .logo');
  
  if (window.innerWidth > 1024) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distX = mouseX - btnX;
        const distY = mouseY - btnY;
        
        btn.style.transform = `translate(${distX * 0.25}px, ${distY * 0.25}px)`;
        
        const content = btn.querySelector('span, i');
        if (content) {
          content.style.transform = `translate(${distX * 0.1}px, ${distY * 0.1}px)`;
        }
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        const content = btn.querySelector('span, i');
        if (content) {
          content.style.transform = '';
        }
      });
    });
  }
});
