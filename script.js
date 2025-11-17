// Custom Leaf Cursor Movement
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Main cursor follows mouse quickly
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        
        // Follower leaf follows more slowly
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide custom cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    // Add rotation effect when clicking
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.9) rotate(20deg)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Enhanced 3D tilt effect for cards
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Scroll animation observer for gallery cards
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
});
