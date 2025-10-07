// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        delay: 3,
        onComplete: () => {
            loader.style.display = 'none';
            initAnimations();
        }
    });
});

// Initialize all animations
function initAnimations() {
    // Custom cursor
    initCursor();
    
    // Navigation animations
    initNavigation();
    
    // Hero animations
    initHeroAnimations();
    
    // Scroll triggered animations
    initScrollAnimations();
    
    // Interactive animations
    initInteractiveAnimations();
    
    // Counter animations
    initCounterAnimations();
    
    // Skills animations
    initSkillsAnimations();
    
    // Form animations
    initFormAnimations();
    
    // Typing animation
    initTypingAnimation();
}

// Custom Cursor with Advanced Interactions
function initCursor() {
    if (window.innerWidth > 768) {
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const cursorText = document.querySelector('.cursor-text');
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        // Update mouse position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor movement
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            cursorOutline.style.left = `${cursorX}px`;
            cursorOutline.style.top = `${cursorY}px`;
            
            requestAnimationFrame(updateCursor);
        }
        updateCursor();
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('[data-cursor]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const cursorType = el.getAttribute('data-cursor');
                const text = el.getAttribute('data-text');
                
                cursor.className = `cursor ${cursorType}`;
                
                if (text) {
                    cursorText.textContent = text;
                    cursorText.style.opacity = '1';
                } else {
                    cursorText.style.opacity = '0';
                }
                
                // Special animations for different cursor types
                switch(cursorType) {
                    case 'pointer':
                        gsap.to(cursorDot, { scale: 2, duration: 0.3 });
                        break;
                    case 'view':
                        gsap.to(cursorDot, { scale: 0, duration: 0.3 });
                        break;
                    case 'social':
                        gsap.to(cursorDot, { scale: 1.5, duration: 0.3 });
                        break;
                }
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.className = 'cursor';
                cursorText.style.opacity = '0';
                gsap.to(cursorDot, { scale: 1, duration: 0.3 });
            });
        });
    }
}

// Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            gsap.to(bars[0], { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(bars[1], { opacity: 0, duration: 0.3 });
            gsap.to(bars[2], { rotation: -45, y: -6, duration: 0.3 });
        } else {
            gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(bars[1], { opacity: 1, duration: 0.3 });
            gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scroll for navigation links
gsap.registerPlugin(ScrollToPlugin);


navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetSection,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    }
  });
});


}

// Hero Animations
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // Animate hero content
    tl.from('.greeting', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5")
    .from('.typing-container', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.3")
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.3")
    .from('.hero-buttons', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3")
    .from('.social-links', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.2")
    .from('.profile-card', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.8")
    .from('.scroll-indicator', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3");
    
    // Code rain animation
    gsap.to('.code-column', {
        y: '100vh',
        duration: 3,
        ease: "none",
        repeat: -1,
        stagger: {
            each: 0.5,
            from: "random"
        }
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Aspiring Frontend Developer',
        'Information Technology Student',
        'Web Development Enthusiast',
        'Problem Solver',
        'Creative Coder'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

// Scroll Triggered Animations
function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // About section
    gsap.from('.about-text', {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.about-content',
            start: "top 80%"
        }
    });
    
    gsap.from('.about-stats .stat-card', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        // stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.about-stats',
            start: "top 80%"
        }
    });
    
    // Skills section
    gsap.from('.skill-category', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.skills-grid',
            start: "top 80%"
        }
    });
    
    gsap.from('.learning-section', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.learning-section',
            start: "top 80%"
        }
    });
    
    // Projects
    gsap.from('.project-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        // stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 50%"
        }
    });
    
    // Contact section
    gsap.from('.contact-info .contact-item', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        // stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-content',
            start: "top 50%"
        }
    });
    
    gsap.from('.contact-form', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-content',
            start: "top 50%"
        }
    });
}

// Interactive Animations
function initInteractiveAnimations() {
    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Social links hover
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Skill item hover effects
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.skill-icon'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.skill-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(counter.innerHTML);
                    }
                });
            }
        });
    });
}

// Skills Animations
function initSkillsAnimations() {
    document.querySelectorAll('.skill-item').forEach(item => {
        const level = item.querySelector('.skill-level');
        const percentage = level.getAttribute('data-level');
        
        ScrollTrigger.create({
            trigger: item,
            start: "top 80%",
            onEnter: () => {
                gsap.to(level, {
                    width: `${percentage}%`,
                    duration: 1.5,
                    ease: "power2.out",
                    delay: 0.2
                });
            }
        });
    });
}

// Form Animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                borderColor: '#00ff88',
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Form submission
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate form submission
        gsap.to(form, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => {
                // Show success message
                gsap.to('.form', {
                    y: -20,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        alert('Thank you for your message! I\'ll get back to you soon.');
                        speechSynthesis.speak(new SpeechSynthesisUtterance('Thanks for the submition, will caught you as soon as possible.'))
                        form.reset();
                        gsap.to('.form', {
                            y: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            }
        });
    });
}

// Parallax effects
gsap.to('.code-rain', {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
        trigger: '.hero',
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power2.inOut"
            });
        }
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add floating particles effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ff88;
            border-radius: 50%;
            opacity: 0.3;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
            y: -100,
            x: Math.random() * 200 - 100,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 2
        });
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
'KeyV', 'KeyE', 'KeyN', 'KeyU'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg animation
        gsap.to('body', {
            filter: 'hue-rotate(360deg)',
            duration: 3,
            ease: "power2.inOut",
            onComplete: () => {
                alert('🎉 Easter egg found! You discovered the Konami code!');
                gsap.set('body', { filter: 'none' });
            }
        });
        konamiCode = [];
    }
});

