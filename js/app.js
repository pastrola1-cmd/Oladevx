/* ==========================================================================
   OLADEVVX MAIN APPLICATION LOGIC
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

  /* ==========================================================================
     11. Interactive Category Filter logic
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filter === 'all' || card.classList.contains(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ==========================================================================
     12. Interactive Systems Architecture Playground (Traffic Slider)
     ========================================================================== */
  const trafficSlider = document.getElementById('traffic-slider');
  const trafficVal = document.getElementById('traffic-val');
  const trafficDesc = document.getElementById('traffic-status-desc');
  const cockpitTerminal = document.getElementById('cockpit-terminal');
  
  if (trafficSlider && trafficVal && trafficDesc) {
    const scaleDetails = [
      {
        val: "1,000 req/sec",
        desc: "<strong>Traffic Profile:</strong> Startup Launch / Initial Phase. The application routes traffic directly through App Node B to the primary PostgreSQL database.",
        activeNodes: ["node-client", "node-lb", "node-app-b", "node-db-primary"],
        activePaths: ["path-client-cdn", "path-cdn-lb", "path-lb-app-b", "path-app-db"],
        log: "Routing traffic directly to Monolith core. DB load: normal. Connections pool: 8% utilized."
      },
      {
        val: "10,000 req/sec",
        desc: "<strong>Traffic Profile:</strong> Medium Traffic Scaling. CDN caches static assets at the edge. The Load Balancer distributes application traffic across App Nodes A & B. Redis cluster is introduced to cache database query results and session states, reducing DB query pressure.",
        activeNodes: ["node-client", "node-cdn", "node-lb", "node-app-a", "node-app-b", "node-redis", "node-db-primary"],
        activePaths: ["path-client-cdn", "path-cdn-lb", "path-lb-app-a", "path-lb-app-b", "path-app-redis", "path-app-db"],
        log: "CDN Edge cache active. Load balancer routing round-robin. Redis caching layer routing query hits: 91% success rate."
      },
      {
        val: "100,000 req/sec",
        desc: "<strong>Traffic Profile:</strong> High Scale / Peak Traffic. Added App Node C to the pool. Direct database writing is offloaded by publishing intensive operations to a RabbitMQ message bus. Asynchronous worker processes consume jobs and write safely to PostgreSQL, avoiding thread lockouts.",
        activeNodes: ["node-client", "node-cdn", "node-lb", "node-app-a", "node-app-b", "node-app-c", "node-redis", "node-queue", "node-workers", "node-db-primary"],
        activePaths: ["path-client-cdn", "path-cdn-lb", "path-lb-app-a", "path-lb-app-b", "path-lb-app-c", "path-app-redis", "path-app-queue", "path-app-db", "path-queue-workers"],
        log: "Queue length spike: 2,400 messages/sec. Offloading DB write loops to worker pools. Database write-thread pool: healthy."
      },
      {
        val: "1,000,000+ req/sec",
        desc: "<strong>Traffic Profile:</strong> Enterprise Level / Multi-Region. Full active-active redundancy. Database read-heavy workloads are fully delegated to PostgreSQL Read Replicas. Main database handles writes, ensuring maximum read/write performance under extreme traffic spikes.",
        activeNodes: ["node-client", "node-cdn", "node-lb", "node-app-a", "node-app-b", "node-app-c", "node-redis", "node-queue", "node-workers", "node-db-primary", "node-db-replicas"],
        activePaths: ["path-client-cdn", "path-cdn-lb", "path-lb-app-a", "path-lb-app-b", "path-lb-app-c", "path-app-redis", "path-app-queue", "path-app-db", "path-queue-workers", "path-db-replicas"],
        log: "Extreme scale routing. Activating secondary regional replicas. Directing all read operations to replica clusters. System stable."
      }
    ];

    const updateArchitecture = (index) => {
      const scale = scaleDetails[index];
      trafficVal.textContent = scale.val;
      trafficDesc.innerHTML = scale.desc;
      
      // Update nodes
      document.querySelectorAll('.arch-node').forEach(node => {
        if (scale.activeNodes.includes(node.id)) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });
      
      // Update paths
      document.querySelectorAll('.arch-path').forEach(path => {
        if (scale.activePaths.includes(path.id)) {
          path.classList.add('active');
          if (index === 3 && path.classList.contains('high-scale-path')) {
            path.style.stroke = "var(--accent-primary)";
          } else {
            path.style.stroke = "";
          }
        } else {
          path.classList.remove('active');
          path.style.stroke = "";
        }
      });

      // Write mock log into cockpit terminal
      if (cockpitTerminal) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="terminal-prompt">></span> <span class="terminal-string">${scale.log}</span>`;
        cockpitTerminal.appendChild(line);
        cockpitTerminal.scrollTop = cockpitTerminal.scrollHeight;
      }
    };

    trafficSlider.addEventListener('input', (e) => {
      updateArchitecture(parseInt(e.target.value));
    });

    // Run initial update
    updateArchitecture(0);
  }

  /* ==========================================================================
     13. Capabilities Sandbox Panel Tab Logic
     ========================================================================== */
  const sandboxTabs = document.querySelectorAll('.sandbox-tab-btn');
  const sandboxFilename = document.getElementById('sandbox-filename');
  const sandboxLang = document.getElementById('sandbox-lang');
  const sandboxCodeBody = document.getElementById('sandbox-code-body');

  if (sandboxTabs.length > 0 && sandboxFilename && sandboxLang && sandboxCodeBody) {
    const codeTemplates = {
      eng: {
        filename: "server.ts",
        lang: "TypeScript",
        code: `// Enterprise Web Server Configuration
import Express, { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

const app = Express();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

app.use(limiter);
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', version: '4.6.0' });
});

app.listen(3000, () => {
  console.log('Server routing traffic on port 3000');
});`
      },
      auto: {
        filename: "billing-cron.js",
        lang: "JavaScript",
        code: `// Event-Driven Billing Automation Loop
const cron = require('node-cron');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('./db-client');

// Run daily at midnight to reconcile past-due accounts
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Initiating daily billing cycle...');
  const pendingInvoices = await db.query('SELECT * FROM invoices WHERE status = "pending"');
  
  for (const invoice of pendingInvoices) {
    try {
      const payment = await stripe.paymentIntents.create({
        amount: invoice.amount,
        currency: 'usd',
        customer: invoice.customer_id
      });
      await db.update('invoices', invoice.id, { status: 'paid', tx_id: payment.id });
      console.log(\`[SUCCESS] Billing successful for Invoice #\${invoice.id}\`);
    } catch (err) {
      console.error(\`[FAILED] Invoicing failed for ID \${invoice.id}:\`, err.message);
    }
  }
});`
      },
      arch: {
        filename: "docker-compose.yml",
        lang: "YAML",
        code: `version: '3.8'
services:
  web-app:
    image: node:18-alpine
    build: ./app
    ports:
      - "3000:3000"
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
    depends_on:
      - redis
      - db-primary

  redis:
    image: redis:7.0-alpine
    command: redis-server --requirepass secure_redis_token

  db-primary:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: enterprise_db
      POSTGRES_PASSWORD: main_db_root_pwd`
      },
      api: {
        filename: "remittance-routing.go",
        lang: "Go",
        code: `package main

import (
	"bytes"
	"encoding/json"
	"net/http"
)

// RouteRemittance transfers cross-border payments through regional mobile wallet gateways
func RouteRemittance(txID string, amount float64, phone string) (bool, error) {
	payload := map[string]interface{}{
		"tx_id":     txID,
		"amount":    amount,
		"recipient": phone,
		"provider":  "MTN_MOMO",
	}
	
	jsonBytes, _ := json.Marshal(payload)
	resp, err := http.Post("https://api.vyza.payments.io/v1/transfer", "application/json", bytes.NewBuffer(jsonBytes))
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()
	
	return resp.StatusCode == http.StatusOK, nil
}`
      }
    };

    const highlightSyntax = (codeText, lang) => {
      // Basic client-side syntax highlighter for sandbox previewing
      const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const lines = codeText.split("\n");
      
      return lines.map(line => {
        if (!line.trim()) return '<div class="terminal-line">&nbsp;</div>';
        
        let formatted = escapeHtml(line);
        
        // Match comments
        if (formatted.startsWith("//") || formatted.startsWith("#")) {
          return `<div class="terminal-line"><span class="terminal-comment">${formatted}</span></div>`;
        }
        
        // Highlight keywords
        const keywords = ["const", "let", "var", "import", "from", "require", "async", "await", "function", "try", "catch", "for", "const", "class", "package", "func", "defer", "return", "version:", "services:", "image:", "build:", "ports:", "deploy:", "replicas:", "depends_on:"];
        keywords.forEach(keyword => {
          const reg = new RegExp(`\\b${keyword.replace(':', '\\:')}\\b`, "g");
          formatted = formatted.replace(reg, `<span class="terminal-keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        formatted = formatted.replace(/(['"`])(.*?)\1/g, `<span class="terminal-string">$1$2$1</span>`);
        
        return `<div class="terminal-line">${formatted}</div>`;
      }).join("");
    };

    sandboxTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Toggle tab active state
        sandboxTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update content
        const tabType = tab.getAttribute('data-tab');
        const template = codeTemplates[tabType];
        
        if (template) {
          sandboxFilename.textContent = template.filename;
          sandboxLang.textContent = template.lang;
          sandboxCodeBody.innerHTML = highlightSyntax(template.code, template.lang);
        }
      });
    });

    // Run initial highlight
    sandboxCodeBody.innerHTML = highlightSyntax(codeTemplates.eng.code, "TypeScript");
  }

  /* ==========================================================================
     14. Sandbox Demo / Code Vault Modal Logic
     ========================================================================== */
  const sandboxModal = document.getElementById('sandbox-modal');
  const modalClose = document.getElementById('sandbox-modal-close');
  const modalTerminal = document.getElementById('sandbox-modal-terminal');
  const formContainer = document.getElementById('sandbox-form-container');
  const accessForm = document.getElementById('sandbox-access-form');
  const requestKeyBtn = document.getElementById('sandbox-request-key');
  const formFeedback = document.getElementById('sandbox-form-feedback');
  const modalTitle = document.getElementById('sandbox-modal-title');
  const modalTermTitle = document.getElementById('sandbox-terminal-title');
  const sandboxKeyInput = document.getElementById('sandbox-key');

  const launchBtns = document.querySelectorAll('.launch-sandbox-btn');
  const codeBtns = document.querySelectorAll('.request-code-btn');

  if (sandboxModal && modalClose && modalTerminal && formContainer) {
    
    const openModal = (projectName, isCodeVault = false) => {
      // Setup titles
      if (isCodeVault) {
        modalTitle.innerHTML = `<i class="fab fa-github"></i> Access Code Vault: ${projectName}`;
        modalTermTitle.textContent = "vault-auth.sh";
        sandboxKeyInput.placeholder = "Enter SSH developer token...";
      } else {
        modalTitle.innerHTML = `<i class="fas fa-server"></i> Initialize Sandbox: ${projectName}`;
        modalTermTitle.textContent = "sandbox-init.sh";
        sandboxKeyInput.placeholder = "Enter API Access Token...";
      }
      
      // Reset feedback and input
      formFeedback.innerHTML = "";
      sandboxKeyInput.value = "";
      formContainer.style.display = "none";
      modalTerminal.innerHTML = "";
      
      // Open modal
      sandboxModal.classList.add('open');
      document.body.style.overflow = "hidden"; // Disable scroll
      
      // Simulated Boot Log Script
      const logs = isCodeVault ? [
        "Resolving secure vault address: keys.github.com...",
        "Establishing encrypted TLS handshake (SSL_RSA_WITH_AES_256_GCM)...",
        "Authorizing connection via local client ssh-agent...",
        "Access Denied: Public key credentials not found.",
        "Prompting client for secure SSH vault access token..."
      ] : [
        "Contacting API gateway and spawning sandboxed demo container...",
        "Configuring network namespaces: internal bridge IP assigned.",
        "TLS connection established. SSL attestation: OK.",
        "Mounting isolated postgresql DB and loading seed datasets...",
        "System health verification checks: all services reporting healthy.",
        "Container fully initialized. Awaiting API key validation..."
      ];
      
      let logIndex = 0;
      const typeLogLine = () => {
        if (logIndex < logs.length) {
          const line = document.createElement('div');
          line.className = 'terminal-line';
          line.innerHTML = `<span class="terminal-prompt">$</span> ${logs[logIndex]}`;
          modalTerminal.appendChild(line);
          modalTerminal.scrollTop = modalTerminal.scrollHeight;
          logIndex++;
          setTimeout(typeLogLine, 250);
        } else {
          // Finished logging, show form container
          formContainer.style.display = "block";
        }
      };
      
      setTimeout(typeLogLine, 100);
    };

    const closeModal = () => {
      sandboxModal.classList.remove('open');
      document.body.style.overflow = ""; // Restore scroll
    };

    // Wire buttons
    launchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const project = btn.getAttribute('data-project');
        openModal(project, false);
      });
    });

    codeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const project = btn.getAttribute('data-project');
        openModal(project, true);
      });
    });

    // Close on click close button or overlay
    modalClose.addEventListener('click', closeModal);
    sandboxModal.addEventListener('click', (e) => {
      if (e.target === sandboxModal) {
        closeModal();
      }
    });

    // Handle form submit
    accessForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const key = sandboxKeyInput.value.trim();
      formFeedback.innerHTML = `<span style="color: var(--text-secondary);"><i class="fas fa-spinner fa-spin"></i> Verifying credentials...</span>`;
      
      setTimeout(() => {
        if (key === "DEV_DEMO_2026_OK" || key === "SSH_VAULT_PASS") {
          formFeedback.innerHTML = `<span style="color: var(--accent-secondary);"><i class="fas fa-check-circle"></i> Verification success. Spawning UI instance... Redirecting to demo gateway.</span>`;
          setTimeout(() => {
            closeModal();
            alert("Demo Sandbox connection established! Redirecting to secure sandbox environment.");
          }, 1500);
        } else {
          formFeedback.innerHTML = `<span style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Verification Failed. Access token rejected by gateway.</span>`;
        }
      }, 1000);
    });

    // Generate mock token
    requestKeyBtn.addEventListener('click', () => {
      const isCode = modalTermTitle.textContent === "vault-auth.sh";
      const token = isCode ? "SSH_VAULT_PASS" : "DEV_DEMO_2026_OK";
      sandboxKeyInput.value = token;
      formFeedback.innerHTML = `<span style="color: var(--accent-secondary);"><i class="fas fa-key"></i> Key retrieved: ${token}. Click Verify to launch.</span>`;
    });
  }
});
