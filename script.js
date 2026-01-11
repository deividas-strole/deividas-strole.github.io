// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.remove('open');
}

// Navbar scroll effect + active-section detection
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Update active nav link using viewport midpoint (more robust than fixed 100px)
    const sections = ['home', 'about', 'experience', 'education', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const mid = window.innerHeight / 2;
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= mid && rect.bottom >= mid) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLinks[index]) {
                    navLinks[index].classList.add('active');
                }
            }
        }
    });
}

window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });

// Equalize CTA button widths to match the widest (e.g., "View Experience")
function equalizeCtaButtonWidths() {
    const container = document.querySelector('.cta-buttons');
    if (!container) return;
    const buttons = Array.from(container.querySelectorAll('.btn'));
    if (buttons.length < 2) return;
    // Reset any inline widths so measurement is accurate
    buttons.forEach(b => b.style.width = '');
    // Find maximum width
    let max = 0;
    buttons.forEach(b => {
        const w = Math.ceil(b.getBoundingClientRect().width);
        if (w > max) max = w;
    });
    // Apply the maximum width to all CTA buttons
    buttons.forEach(b => b.style.width = max + 'px');
}

// Debounce helper
function debounce(fn, wait = 100) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Set current year for copyright
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    equalizeCtaButtonWidths();
    // Initial active link check
    updateNavbarOnScroll();
});

window.addEventListener('resize', debounce(function() {
    equalizeCtaButtonWidths();
}, 120));

window.addEventListener('resize', debounce(function() {
    updateNavbarOnScroll();
}, 120));
