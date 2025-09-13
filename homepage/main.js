document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Animate on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- FAQ Accordion Functionality ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            
            faqItem.classList.toggle('active');

            faqQuestions.forEach(otherQuestion => {
                const otherFaqItem = otherQuestion.parentElement;
                if (otherFaqItem !== faqItem && otherFaqItem.classList.contains('active')) {
                    otherFaqItem.classList.remove('active');
                }
            });
        });
    });

    // --- NEW: Hero Parallax Animation ---
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroTitle = hero.querySelector('.hero-title');
        const heroSubtitle = hero.querySelector('.hero-subtitle');
        const heroButton = hero.querySelector('.btn-large');

        hero.addEventListener('mousemove', (e) => {
            // Do not run on mobile devices
            if (window.innerWidth < 768) return;

            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = hero;
            const centerX = offsetWidth / 2;
            const centerY = offsetHeight / 2;

            // Calculate mouse offset from the center of the hero section
            const offsetX = (clientX - centerX) / centerX;
            const offsetY = (clientY - centerY) / centerY;

            // Use requestAnimationFrame for better performance
            window.requestAnimationFrame(() => {
                if (heroTitle) {
                    // Move title in the opposite direction of the mouse for a depth effect
                    heroTitle.style.transform = `translate(${offsetX * -12}px, ${offsetY * -12}px)`;
                }
                if (heroSubtitle) {
                    // Move subtitle slightly in the same direction
                    heroSubtitle.style.transform = `translate(${offsetX * 6}px, ${offsetY * 6}px)`;
                }
                if (heroButton) {
                     // Move button at a different speed/direction
                    heroButton.style.transform = `translate(${offsetX * -8}px, ${offsetY * -8}px)`;
                }
            });
        });
    }
});
