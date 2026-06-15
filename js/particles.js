/* ==========================================================================
   OLADEVVX CANVAS PARTICLE BACKGROUND
   ========================================================================== */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.mousemove(e));
    window.addEventListener('mouseleave', () => this.mouseleave());
  }
  
  init() {
    this.resize();
    this.particles = [];
    
    // Adjust density based on screen width
    const density = window.innerWidth < 768 ? 40 : 80;
    
    for (let i = 0; i < density; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * (this.canvas.width - size * 2) + size;
      const y = Math.random() * (this.canvas.height - size * 2) + size;
      
      // Speed vectors
      const directionX = (Math.random() * 0.4) - 0.2;
      const directionY = (Math.random() * 0.4) - 0.2;
      const color = 'rgba(108, 99, 255, 0.25)';
      
      this.particles.push({
        x, y, directionX, directionY, size, color
      });
    }
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  mousemove(e) {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  }
  
  mouseleave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Draw single node
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      
      // Node interaction with Mouse
      if (this.mouse.x != null && this.mouse.y != null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          // Push particles slightly away from mouse cursor
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          p.x += (dx / distance) * force * 1.5;
          p.y += (dy / distance) * force * 1.5;
        }
      }
      
      // Draw connection lines
      for (let j = i; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const connectionLimit = 120;
        
        if (dist < connectionLimit) {
          // Fade connection line opacity based on distance
          const alpha = (1 - (dist / connectionLimit)) * 0.15;
          this.ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
      
      // Move node
      p.x += p.directionX;
      p.y += p.directionY;
      
      // Boundary collision check
      if (p.x > this.canvas.width || p.x < 0) p.directionX = -p.directionX;
      if (p.y > this.canvas.height || p.y < 0) p.directionY = -p.directionY;
    }
  }
  
  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialise particles when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem('hero-particles');
});
