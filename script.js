// Ultra-quick preloader
window.addEventListener('load', function() {
    // Immediate fade-out
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.transition = 'opacity 0.2s';
    
    // Hide after minimal transition
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 200);
});

// Smooth scrolling for anchor links
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
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 1px 15px rgba(0, 0, 0, 0.05)';
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150) && window.scrollY < (sectionTop + sectionHeight - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.padding = '20px';
        navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll indicator functionality
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
    });
});

// Animation on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.feature-item, .section-title, .section-subtitle, .about-text h3, .about-text p');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.animation = 'fadeInUp 0.8s forwards';
        }
    });
});

// Initialize any interactive components
document.addEventListener('DOMContentLoaded', function() {
    // Animate statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(statNumber => {
        const targetNumber = parseInt(statNumber.textContent);
        let currentNumber = 0;
        const duration = 2000; // ms
        const interval = 50; // ms
        const increment = targetNumber / (duration / interval);
        
        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                statNumber.textContent = targetNumber;
                clearInterval(counter);
            } else {
                statNumber.textContent = Math.floor(currentNumber);
            }
        }, interval);
    });
});

// Feature hover effects
document.querySelectorAll('.feature-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.feature-icon').style.transform = 'scale(1.1) rotate(10deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Custom cursor effect
document.addEventListener('mousemove', function(e) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // Add slight delay for outline to follow for cooler effect
        setTimeout(() => {
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        }, 50);
    }
});

// Change cursor style on interactive elements
document.querySelectorAll('a, button, .menu-trigger, .project-card, .team-member').forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.querySelector('.cursor-outline').classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        document.querySelector('.cursor-outline').classList.remove('cursor-hover');
    });
});

// Holographic Menu Toggle
document.querySelector('.menu-trigger').addEventListener('click', function() {
    const nav = document.querySelector('.holo-nav');
    nav.classList.toggle('active');
    
    // Animate menu icon
    if (nav.classList.contains('active')) {
        this.querySelector('.hologram-icon').innerHTML = '<i class="fas fa-times"></i>';
    } else {
        this.querySelector('.hologram-icon').innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Create glitch effect on toggle
    const glitchEffect = document.createElement('div');
    glitchEffect.classList.add('menu-glitch-effect');
    this.appendChild(glitchEffect);
    
    setTimeout(() => {
        glitchEffect.remove();
    }, 500);
});

// Glitch Text Effect
document.querySelectorAll('.glitch-text, .glitch, .mega-glitch').forEach(el => {
    const text = el.textContent;
    el.setAttribute('data-text', text);
});

// Animate stats on scroll
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const current = parseInt(stat.textContent);
        
        if (current < target) {
            const increment = Math.ceil(target / 100);
            stat.textContent = Math.min(current + increment, target);
            setTimeout(animateStats, 20);
        }
    });
}

// Start animation when stats are in view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (stats.length > 0) {
    observer.observe(document.querySelector('.stats-grid'));
}

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.floating-elements > div');
floatingElements.forEach(el => {
    // Set random starting position
    const randX = Math.random() * 40 - 20;
    const randY = Math.random() * 40 - 20;
    const randRotate = Math.random() * 20 - 10;
    
    el.style.transform = `translate(${randX}px, ${randY}px) rotate(${randRotate}deg)`;
    
    // Create unique animation
    const duration = 10 + Math.random() * 10;
    el.style.animation = `float ${duration}s ease-in-out infinite`;
    
    // Set random animation delay
    el.style.animationDelay = `${Math.random() * 5}s`;
});

// Create the 3D hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        // Use subtler rotation for a more holographic feel
        const maxRotate = 10;
        const rotateX = percentY * -maxRotate;
        const rotateY = percentX * maxRotate;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Enhance hologram effect on hover
        card.querySelector('.project-hologram').style.opacity = '1';
        card.querySelector('.project-hologram').style.transform = 'translateZ(50px)';
        
        // Position the hologram "light" based on cursor
        const hologram = card.querySelector('.hologram-content');
        hologram.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, var(--neon-blue) 0%, transparent 60%)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.querySelector('.project-hologram').style.opacity = '0.7';
        card.querySelector('.project-hologram').style.transform = 'translateZ(0)';
    });
});

// Team members hover effect
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.querySelector('.holo-scan-line').style.animation = 'scan 1.5s linear infinite';
    });
    
    member.addEventListener('mouseleave', () => {
        member.querySelector('.holo-scan-line').style.animation = 'none';
    });
});

// Form field effects
document.querySelectorAll('.form-field input, .form-field textarea, .form-field select').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.querySelector('.field-focus-indicator').classList.add('active');
    });
    
    field.addEventListener('blur', () => {
        if (!field.value.trim()) {
            field.parentElement.querySelector('.field-focus-indicator').classList.remove('active');
        }
    });
});

// Handle contact form submission
document.querySelector('.holographic-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create transmission effect
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.classList.add('transmitting');
    
    setTimeout(() => {
        alert('TRANSMISSION RECEIVED. NEURAL PROCESSING INITIATED.');
        this.reset();
        formContainer.classList.remove('transmitting');
        
        // Reset all field indicators
        document.querySelectorAll('.field-focus-indicator').forEach(indicator => {
            indicator.classList.remove('active');
        });
    }, 2000);
});

// Implement Holographic Globe in contact section
function createHolographicGlobe() {
    const globe = document.querySelector('.digital-globe');
    if (!globe) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, globe.offsetWidth / globe.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(globe.offsetWidth, globe.offsetHeight);
    globe.appendChild(renderer.domElement);
    
    // Create the globe geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create grid material
    const material = new THREE.MeshBasicMaterial({
        color: 0x00f7ff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Add points on the globe
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsCount = 100;
    const positions = new Float32Array(pointsCount * 3);
    
    for (let i = 0; i < pointsCount; i++) {
        // Random positions on the sphere
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        
        // Convert to cartesian coordinates on the sphere
        positions[i * 3] = Math.sin(phi) * Math.cos(theta) * 1.01; // Slightly larger than the sphere
        positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * 1.01;
        positions[i * 3 + 2] = Math.cos(phi) * 1.01;
    }
    
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pointsMaterial = new THREE.PointsMaterial({
        color: 0x00f7ff,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
    
    // Position camera
    camera.position.z = 2.5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        sphere.rotation.y += 0.003;
        points.rotation.y += 0.003;
        
        // Add slight wobble
        sphere.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        points.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = globe.offsetWidth / globe.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(globe.offsetWidth, globe.offsetHeight);
    });
}

// Initialize globe when page loads
window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined') {
        createHolographicGlobe();
    }
});

// Add parallax effect to hero section
document.addEventListener('mousemove', (e) => {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.neon-circle').style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
    document.querySelector('.holographic-sphere').style.transform = `translate(${moveX * -4}px, ${moveY * -4}px)`;
});

// Animate the "enter the grid" button
document.querySelector('.neon-button.primary')?.addEventListener('click', function() {
    // Create a grid overlay animation
    const overlay = document.createElement('div');
    overlay.classList.add('grid-activation');
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.add('activate');
        
        setTimeout(() => {
            window.location.href = '#projects';
            
            setTimeout(() => {
                overlay.classList.remove('activate');
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 500);
        }, 1000);
    }, 100);
});

// Handle newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input');
    if (input.value.trim()) {
        // Create a "transmission" effect
        const button = this.querySelector('button');
        button.textContent = 'TRANSMITTING...';
        
        setTimeout(() => {
            button.textContent = 'CONNECTED';
            alert('YOU HAVE BEEN ADDED TO THE NEURAL NETWORK.');
            input.value = '';
            
            setTimeout(() => {
                button.textContent = 'CONNECT';
            }, 2000);
        }, 1500);
    }
}); 