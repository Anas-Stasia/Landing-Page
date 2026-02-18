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