// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll('.hero, .download');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

faders.forEach(section => observer.observe(section));

// CRT Effect
function initCRTEffect() {
  // Create CRT overlay container
  const crtOverlay = document.createElement('div');
  crtOverlay.className = 'crt-overlay';
  
  // Create scanlines
  const scanlines = document.createElement('div');
  scanlines.className = 'crt-scanlines';
  
  // Create screen flicker
  const flicker = document.createElement('div');
  flicker.className = 'crt-flicker';
  
  crtOverlay.appendChild(scanlines);
  crtOverlay.appendChild(flicker);
  document.body.appendChild(crtOverlay);
  
  // Random flicker effect - much more intense
  setInterval(() => {
    flicker.style.opacity = Math.random() * 0.25 + 0.12;
  }, 70);
  
  // Screen distortion - more noticeable
  let distortionOffset = 0;
  setInterval(() => {
    distortionOffset += 1;
    scanlines.style.transform = `translateY(${Math.sin(distortionOffset) * 4}px)`;
  }, 35);
}

// Initialize CRT effect when page loads
window.addEventListener('DOMContentLoaded', initCRTEffect);