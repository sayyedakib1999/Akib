// Mobile Navigation Toggle
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// hamburger.addEventListener('click', () => {
//     navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
//     hamburger.classList.toggle('active');
// });

// Google Analytics placeholder (replace UA-XXXXX-Y with your actual tracking ID when ready)
/* 
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
*/

// Force scroll to top on page load or refresh
window.onload = function() {
    window.scrollTo(0, 0);
    
    // Force all project cards to be visible after a delay
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
};

// Force scroll to top before unload (refresh)
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Force scroll to top on DOMContentLoaded
    window.scrollTo(0, 0);
    
    // Immediately scroll to top after a slight delay (forces override)
    setTimeout(function() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
        });
    }, 10);
    
    // Double-check after a longer delay for browser quirks
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
    
    // Prevent browser from restoring scroll position - maximum priority
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Clear any hash from URL to prevent jumping
    if (window.location.hash) {
        window.location.hash = '';
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 1);
    }
    
    // Remove fragment identifier on load
    if (window.location.href.indexOf('#') > -1) {
        window.location.replace(window.location.href.split('#')[0]);
    }
    
    // Handle smooth scrolling for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
            
            // Update URL with hash for better SEO and sharing
            history.pushState(null, null, targetId);
        });
    });
    
    // Add lazy loading to images (for future use)
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Skills section animations with IntersectionObserver
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-skill');
                // Once added, stop observing to prevent animation retriggering
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
        skillObserver.observe(category);
        
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-10px) scale(1.03)';
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
        });
    });
    
    // Certification cards animations
    const certItems = document.querySelectorAll('.cert-item');
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-cert');
                // Once added, stop observing to prevent animation retriggering
                certObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    certItems.forEach((cert, index) => {
        cert.style.transitionDelay = `${index * 0.1}s`;
        certObserver.observe(cert);
    });
    
    // Project cards animations
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on the index
                setTimeout(() => {
                    entry.target.classList.add('animate-project');
                    
                    // Add special effects for tech tags
                    const tags = entry.target.querySelectorAll('.project-tags span');
                    tags.forEach(tag => {
                        if (tag.textContent.includes('AWS') || 
                            tag.textContent.includes('Amazon') || 
                            tag.textContent.includes('Lambda') || 
                            tag.textContent.includes('DynamoDB') ||
                            tag.textContent.includes('S3') ||
                            tag.textContent.includes('CloudFront')) {
                            tag.classList.add('aws-tag');
                        }
                    });
                }, index * 100);
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
        
        // Add hover effects to match other section cards
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 122, 255, 0.15)';
            card.style.background = 'rgba(255, 255, 255, 0.1)';
            card.style.borderColor = 'rgba(0, 122, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
            card.style.background = 'rgba(255, 255, 255, 0.05)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Add click handler for mobile devices
        card.addEventListener('click', (e) => {
            // Only apply this for mobile
            if (window.innerWidth <= 768) {
                // Don't trigger if clicking on a link
                if (!e.target.closest('a')) {
                    card.classList.toggle('expanded');
                }
            }
        });
    });
    
    // Ensure all project cards are visible after a short delay as a fallback
    setTimeout(() => {
        projectCards.forEach(card => {
            if (!card.classList.contains('animate-project')) {
                card.classList.add('animate-project');
            }
        });
    }, 1000);
    
    // Tag hover effects
    document.querySelectorAll('.project-tags span').forEach(tag => {
        // Add hover effects for AWS tags that match site theme
        tag.addEventListener('mouseenter', () => {
            tag.style.backgroundColor = 'rgba(0, 122, 255, 0.2)';
            tag.style.color = '#fff';
            tag.style.borderColor = 'rgba(0, 122, 255, 0.4)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.backgroundColor = '';
            tag.style.color = '';
            tag.style.borderColor = '';
        });
    });
    
    // Background animation dots
    const animatedBackground = document.querySelector('.animated-background');
    for (let i = 0; i < 12; i++) {
        const dot = document.createElement('span');
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 8}s`;
        dot.style.width = `${Math.random() * 3 + 1}px`;
        dot.style.height = dot.style.width;
        animatedBackground.appendChild(dot);
    }
    
    // Add title attributes to links without text for better accessibility
    document.querySelectorAll('a').forEach(link => {
        if (!link.textContent.trim() && !link.getAttribute('title')) {
            const iconElement = link.querySelector('i');
            if (iconElement) {
                const iconClass = Array.from(iconElement.classList).find(cls => cls.startsWith('fa-'));
                if (iconClass) {
                    // Extract name from icon class (fa-github => "GitHub")
                    const iconName = iconClass.replace('fa-', '');
                    link.setAttribute('title', iconName.charAt(0).toUpperCase() + iconName.slice(1));
                }
            }
        }
    });
    
    // Track outbound links for analytics
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            // This is where you'd add analytics tracking code
            // Example: ga('send', 'event', 'Outbound Link', 'click', url);
            // For testing only - remove in production
            console.log(`Outbound link clicked: ${url}`);
        });
    });
});

// Navbar Background Change on Scroll
// const navbar = document.querySelector('.navbar');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
//         navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
//     } else {
//         navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
//         navbar.style.boxShadow = 'none';
//     }
// });

// Form Submission
// const contactForm = document.querySelector('.contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         // Add your form submission logic here
//         alert('Thank you for your message! I will get back to you soon.');
//         contactForm.reset();
//     });
// }

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Typing Animation for Hero Section
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
} 