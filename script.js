// ── CUSTOM CURSOR ──
const dot  = document.getElementById('curDot');
const ring = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
});

(function tick() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = `translate(${rx - 15}px, ${ry - 15}px)`;
    requestAnimationFrame(tick);
})();

document.querySelectorAll('a, button, .sk-item, .proj-row').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.width  = '10px'; dot.style.height  = '10px';
        ring.style.width = '46px'; ring.style.height = '46px';
        ring.style.borderColor = 'rgba(200,169,110,.75)';
    });
    el.addEventListener('mouseleave', () => {
        dot.style.width  = '6px';  dot.style.height  = '6px';
        ring.style.width = '30px'; ring.style.height = '30px';
        ring.style.borderColor = 'rgba(200,169,110,.45)';
    });
});

// ── SCROLL REVEAL ──
const revObs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const secObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => secObs.observe(s));
