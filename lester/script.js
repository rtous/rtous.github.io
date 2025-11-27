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

// Downloads count
async function fetchTotalDownloads() {
  const url = 'https://api.github.com/repos/rtous/lester/releases';
  const downloadsEl = document.getElementById('downloads');

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');

    const releases = await response.json();

    // Sum all download_count across all assets
    let totalDownloads = 0;
    releases.forEach(release => {
      release.assets.forEach(asset => {
        totalDownloads += asset.download_count;
      });
    });

    // Display nicely
    downloadsEl.textContent = `Download count: ${totalDownloads.toLocaleString()}`;
  } catch (error) {
    console.error('Error fetching GitHub releases:', error);
    downloadsEl.textContent = 'Error loading download count';
  }
}

// Call it
fetchTotalDownloads();
