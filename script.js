// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('.section');
const stats = document.querySelectorAll('.stat .number');
const contactForm = document.querySelector('.contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Scroll Animation for Stats
function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current).toLocaleString();
            }
        }, 16);
    });
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats'));

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const service = contactForm.querySelector('select').value;
    
    // Simple validation
    if (!name || !email || !service) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simulate form submission
    contactForm.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <div style="font-size: 3rem; color: var(--secondary); margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your appointment request has been received.</p>
            <p>We will contact you shortly at ${email}</p>
        </div>
    `;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add fade-in animation to all sections
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    // Set initial opacity for sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});