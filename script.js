/* ============================================
   script.js — Royal Wedding Invite
   ============================================ */

// ---------- COUNTDOWN ----------
function updateCountdown() {
  const weddingDate = new Date('March 18, 2026 09:00:00').getTime();
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.querySelectorAll('.countdown__number').forEach(el => el.textContent = '0');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ---------- SCROLL REVEAL ----------
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.add('visible');
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}


// ---------- MUSIC TOGGLE ----------
function initMusic() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  if (!btn || !audio) return;

  const playIcon = `<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
  const muteIcon = `<svg viewBox="0 0 24 24"><path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63z"/></svg>`;

  btn.innerHTML = playIcon;
  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      btn.innerHTML = playIcon;
      btn.classList.remove('playing');
    } else {
      audio.play().catch(() => { });
      btn.innerHTML = muteIcon;
      btn.classList.add('playing');
    }
    isPlaying = !isPlaying;
  });

  // Autoplay on first interaction
  const startMusic = (e) => {
    // If the click was on the button itself, let the button's own listener handle it
    if (e.target.closest('#music-toggle')) {
      ['click', 'scroll', 'touchstart', 'mousemove'].forEach(t => document.removeEventListener(t, startMusic));
      return;
    }

    if (!isPlaying) {
      audio.play().then(() => {
        console.log("Autoplay started successfully");
        isPlaying = true;
        btn.innerHTML = muteIcon;
        btn.classList.add('playing');
        // Success! Remove all interaction listeners
        ['click', 'scroll', 'touchstart', 'mousemove'].forEach(t => document.removeEventListener(t, startMusic));
      }).catch((err) => {
        console.log("Autoplay attempt failed:", err.message);
        // We don't remove listeners yet, maybe the next interaction will work
      });
    } else {
      // Already playing, just cleanup
      ['click', 'scroll', 'touchstart', 'mousemove'].forEach(t => document.removeEventListener(t, startMusic));
    }
  };

  ['click', 'scroll', 'touchstart', 'mousemove'].forEach(t => document.addEventListener(t, startMusic));
}


// ---------- HERO STARS ----------
function initStars() {
  const container = document.querySelector('.hero__stars');
  if (!container) return;

  for (let i = 0; i < 50; i++) {
    const star = document.createElement('span');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 40 + '%';  // only top 40% of hero
    star.style.width = star.style.height = (Math.random() * 2 + 1) + 'px';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(star);
  }
}


// ---------- SPARKLE ON CLICK ----------
function initSparkles() {
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
      sparkle.style.top = (e.clientY + (Math.random() - 0.5) * 40) + 'px';
      sparkle.style.background = Math.random() > 0.5 ? '#d4af37' : '#e8c84a';
      sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 2) + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 3000);
    }
  });
}


// ---------- LOADER ----------
function initLoader() {
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 1200);
    }
  });
}


// ---------- PARALLAX ----------
function initParallax() {
  const palace = document.querySelector('.hero__palace');
  if (!palace) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    if (scrollY <= heroHeight) {
      palace.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  });
}


// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initStars();
  initReveal();
  initMusic();
  initSparkles();
  initParallax();
});
