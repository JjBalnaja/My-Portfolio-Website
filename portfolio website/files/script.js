// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const setActive = () => {
  let current = sections[0]?.id;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120) current = sec.id;
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
document.addEventListener('scroll', setActive);
setActive();

// Generic carousel builder
function setupCarousel(trackId, prevId, nextId, dotsId){
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const dotsWrap = document.getElementById(dotsId);
  if(!track) return;

  const cards = Array.from(track.children);
  dotsWrap.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  const updateDots = () => {
    const trackLeft = track.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs(c.offsetLeft - trackLeft);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  };
  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateDots);
  });

  const scrollByCard = (dir) => {
    const card = cards[0];
    const gap = 24;
    const amount = (card.getBoundingClientRect().width + gap) * dir;
    track.scrollBy({ left: amount, behavior: 'smooth' });
  };
  prev?.addEventListener('click', () => scrollByCard(-1));
  next?.addEventListener('click', () => scrollByCard(1));
}

setupCarousel('expTrack', 'expPrev', 'expNext', 'expDots');
setupCarousel('projTrack', 'projPrev', 'projNext', 'projDots');

// Scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Contact form (front-end only demo)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = "Thanks! Your message has been noted — I'll get back to you soon.";
  form.reset();
});

// typing text effect
 const texts = [
      "Joel Jr Balnaja",
      "A Full-Stack Web Developer",
      "A Web Designer",
      "A Data Entry Specialist"
    ];

    const typingText = document.querySelector(".typing");

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentText = texts[textIndex];

      if (!deleting) {
        // Add one character
        typingText.textContent =
          currentText.substring(0, charIndex + 1);

        charIndex++;

        // Finished typing
        if (charIndex === currentText.length) {
          deleting = true;

          // Pause before deleting
          setTimeout(typeEffect, 1800);
          return;
        }

        setTimeout(typeEffect, 100);
      } 
      else {
        // Remove one character
        typingText.textContent =
          currentText.substring(0, charIndex - 1);

        charIndex--;

        // Finished deleting
        if (charIndex === 0) {
          deleting = false;

          // Move to next sentence
          textIndex++;

          if (textIndex >= texts.length) {
            textIndex = 0;
          }

          setTimeout(typeEffect, 500);
          return;
        }

        setTimeout(typeEffect, 50);
      }
    }

    typeEffect();