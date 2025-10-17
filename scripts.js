document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    
    // Scroll Animation for elements
    const scrollElements = document.querySelectorAll('.about-content, .workshop-card, .gallery-item, .testimonial');
    
    // Intersection Observer for scroll animations
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('fade-in');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 85)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Add event for scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
        updateActiveNavLink(); // Update active navigation link while scrolling
    });
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset to trigger slightly before reaching the section
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            } else if (window.pageYOffset < 100 && link.getAttribute('href') === '#') {
                // When at the top of the page, make Home active
                link.classList.add('active');
            }
        });
    }
    
    // Initial call to set the active link on page load
    updateActiveNavLink();
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            // Basic form validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                submitButton.textContent = 'Thank You!';
                contactForm.reset();
                
                // Reset button after a moment
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }
    
    // Gallery Image Interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.filter = 'grayscale(70%)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.filter = 'grayscale(100%)';
        });
    });
    
    // Custom Cursor (Desktop Only)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (!isMobile) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add active class on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .workshop-card, .learn-more');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Background Change on Scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > (heroHeight * 0.8)) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});