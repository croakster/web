document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `slideInRight 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Scroll Animations
    const scrollElements = document.querySelectorAll('.scroll-element');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('show');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('show');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 75)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // Initialize animations for elements in view on page load
    window.addEventListener('load', () => {
        // Add animation classes to elements
        document.querySelector('.hero-content h1').classList.add('fade-in');
        document.querySelector('.hero-content h2').classList.add('slide-up');
        document.querySelector('.hero-content p').classList.add('slide-up');
        document.querySelector('.hero-content .btn').classList.add('scale-in');
        
        // Add scroll animation class to sections
        document.querySelectorAll('section:not(.hero)').forEach(section => {
            section.classList.add('scroll-element', 'hidden');
        });
        
        // Add staggered animation to skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            card.classList.add('stagger-item');
            setTimeout(() => {
                card.classList.add('stagger-visible');
            }, 200 * index);
        });
        
        // Add staggered animation to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('stagger-item');
            setTimeout(() => {
                card.classList.add('stagger-visible');
            }, 200 * index);
        });
        
        // Run initial scroll check
        handleScrollAnimation();
    });

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });

    // Add scroll class to header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add typing animation to certain elements
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(element => {
        // Store the original text
        const originalText = element.textContent;
        // Clear the text initially
        element.textContent = '';
        
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < originalText.length) {
                element.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100); // Adjust typing speed here
            }
        };
        
        // Start typing animation
        typeChar();
    });
});