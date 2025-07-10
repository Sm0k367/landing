// Modern Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and testimonials
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stagger animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });

    // Set initial body opacity
    document.body.style.opacity = '0';

    // Counter animation for statistics (if we had any)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Mobile menu toggle (for future enhancement)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.background = 'none';
    mobileMenuToggle.style.border = 'none';
    mobileMenuToggle.style.fontSize = '1.5rem';
    mobileMenuToggle.style.color = '#333';
    mobileMenuToggle.style.cursor = 'pointer';
    
    // Add mobile menu functionality
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Insert mobile toggle before nav links
    nav.insertBefore(mobileMenuToggle, navLinks);
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Show mobile menu toggle on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Reveal sections on scroll
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Start trial function
function startTrial() {
    // Add loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Starting Trial...';
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';
    
    // Simulate API call
    setTimeout(() => {
        alert('🎉 Welcome to your free trial! Check your email for setup instructions.');
        button.textContent = originalText;
        button.style.opacity = '1';
        button.style.pointerEvents = 'auto';
    }, 2000);
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });

    // Add CSS for floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatStyle);
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #6366f1, #8b5cf6)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});
