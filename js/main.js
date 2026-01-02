// University of Chittagong Website JavaScript

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.card, .value-card, .fact-card, .department-card, .office-card, .research-card, .campus-card, .admission-card');
    elements.forEach(el => {
        observer.observe(el);
    });
});

// Form validation
const forms = document.querySelectorAll('.needs-validation');
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Initialize counter animation when statistics section is visible
const statsSection = document.querySelector('.statistics-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('h2.display-4');
                counters.forEach(counter => {
                    const target = parseFloat(counter.textContent.replace(/,/g, ''));
                    if (!isNaN(target)) {
                        counter.textContent = '0';
                        animateCounter(counter, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Mobile menu close on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Search functionality (if search bar exists)
const searchInput = document.querySelector('#searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
    });
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTopButton.className = 'btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 d-none';
backToTopButton.style.cssText = 'width: 50px; height: 50px; z-index: 1000;';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('d-none');
    } else {
        backToTopButton.classList.add('d-none');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero Carousel - Load images dynamically from images folder
function initializeHeroCarousel() {
    const carouselInner = document.querySelector('#heroCarousel .carousel-inner');
    if (!carouselInner) return;

    // List of images that actually exist in the images folder
    // Excluding logo.jpg as it's not suitable for hero background
    const images = [
        'images/470237224_974992234664027_1895157211966722201_n.jpg',
        'images/471156046_980064727490111_8864490251297250516_n.jpg',
        'images/498305621_1088717889958127_256711520849693608_n.jpg',
        'images/499947879_1094546839375232_494360342554113513_n.jpg',
        'images/images (1).jpg',
        'images/unnamed.jpg',
        'images/unnamed (2).jpg',
        'images/unnamed (3).jpg',
        'images/cover_shadow_without_title.jpg'
    ];

    // Clear existing content
    carouselInner.innerHTML = '';

    // Create carousel items with error handling
    images.forEach((imagePath, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        if (index === 0) {
            carouselItem.classList.add('active');
        }

        const img = document.createElement('img');
        img.src = imagePath;
        img.className = 'd-block w-100';
        img.alt = `University of Chittagong - Campus Image ${index + 1}`;
        img.loading = index < 3 ? 'eager' : 'lazy'; // Load first 3 images eagerly for better UX
        
        // Handle image loading errors
        img.onerror = function() {
            console.warn(`Failed to load image: ${imagePath}`);
            // Remove the carousel item if image fails to load
            if (carouselItem.parentNode) {
                carouselItem.parentNode.removeChild(carouselItem);
            }
        };

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroCarousel();
});

console.log('University of Chittagong Website - JavaScript Loaded');

