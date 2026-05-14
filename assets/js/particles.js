// AI Stardust Particle Animation
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("ai-particles-canvas");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = document.querySelector('.hero').offsetHeight || window.innerHeight;

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.querySelector('.hero').offsetHeight || window.innerHeight;
    initParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * -0.5 - 0.1;
      
      // Randomly choose between white and bright purple for "AI" vibe
      const colors = ['rgba(255, 255, 255, 0.8)', 'rgba(178, 0, 255, 0.8)', 'rgba(102, 252, 241, 0.6)'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // If particle goes off screen, reset to bottom
      if (this.y < 0) {
        this.y = h;
        this.x = Math.random() * w;
      }
      if (this.x < 0) this.x = w;
      if (this.x > w) this.x = 0;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    const numberOfParticles = (w * h) / 9000; // Adjust density based on screen size
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
});
