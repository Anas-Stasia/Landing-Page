// Mobile Menu Toggle
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');

// Create mobile menu button
const createMobileMenuButton = () => {
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-btn');
    menuButton.innerHTML = `
        <span class="hamburger"></span>
        <span class="hamburger"></span>
        <span class="hamburger"></span>
    `;
    nav.insertBefore(menuButton, navLinks);
    
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
};

// Initialize mobile menu on smaller screens
if (window.innerWidth <= 768) {
    createMobileMenuButton();
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.querySelector('.mobile-menu-btn')?.classList.remove('active');
            }
        }
    });
});
// Navbar Background on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animated Counter for Metrics
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 342 ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 342 ? '%' : '');
        }
    }, 16);
};

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when they become visible
            if (entry.target.classList.contains('metric-value')) {
                const text = entry.target.textContent;
                if (text.includes('%')) {
                    animateCounter(entry.target, 342);
                } else if (text.includes('24/7')) {
                    entry.target.textContent = '24/7';
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


// Observe elements for animation
document.querySelectorAll('.feature-card, .section-header, .metric-value').forEach(el => {
    observer.observe(el);
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// Form Validation (if you add a form later)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Add hover effect sound (optional - commented out by default)
/*
const hoverSound = new Audio('path-to-hover-sound.mp3');
document.querySelectorAll('.primary-btn, .secondary-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});
*/

// Typing Effect for Hero Headline (alternative animation)
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};
