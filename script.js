// Typewriter Effect
const textElement = document.querySelector('.typewriter');
const texts = ['Scalable Systems.', 'Cloud Architectures.', 'Modern Web Apps.', 'AI Solutions.'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    textElement.textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(() => {
            // Pause at end of word, then delete (simplification: just jump to next for now or implement full delete logic)
            // For smoother loop, let's just reset index and move to next word after a pause
            count++;
            index = 0;
        }, 2000);

    }
    setTimeout(type, 150); // Typing speed
})();


// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)'; // Darker background on scroll
        navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 6, 23, 0.5)';
    } else {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// --- MODERN ENHANCEMENTS 2026 ---

// 1. Kinetic Scroll Reveals
const revealOnScroll = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Targets for reveal
    const revealTargets = [
        '.section-header',
        '.project-card',
        '.service-card',
        '.skill-category',
        '.about-text'
    ];

    revealTargets.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal-init');
            observer.observe(el);
        });
    });
};

// 2. Magnetic Button Effect
const initMagneticButtons = () => {
    const magnets = document.querySelectorAll('.btn, .social-hero a, .footer-socials a');
    
    magnets.forEach((mag) => {
        mag.addEventListener('mousemove', function(e) {
            const bound = this.getBoundingClientRect();
            const x = e.clientX - bound.left - bound.width / 2;
            const y = e.clientY - bound.top - bound.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        mag.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });
};

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    initMagneticButtons();
});
