document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');

        // Animate links (simple fade in staggering can be added via CSS if desired, or here)
    });

    // Smooth Scrolling for Anchors & Close Mobile Menu on Click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky Navbar Background
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Typing Animation
    const texts = ["Aspiring Software Developer", "Web Developer", "Tech Enthusiast"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;
    let typeSpeed = 100;

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
            typeSpeed = 50; // Faster deleting
        } else {
            letter = currentText.slice(0, ++index);
            typeSpeed = 100; // Normal typing
        }

        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            typingElement.textContent = letter;
        }

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    })();

    // Space Background Animation
    const spaceContainer = document.getElementById('space-background');

    // Create Stars
    function createStars() {
        const starCount = 100;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const xy = Math.random() * 100;
            const duration = Math.random() * 3 + 2; // 2-5s
            const size = Math.random() * 2 + 1; // 1-3px

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--duration', `${duration}s`);

            spaceContainer.appendChild(star);
        }
    }

    // Create Floating Tech Icons
    function createFloatingTechIcons() {
        const icons = [
            'fa-brands fa-react',
            'fa-brands fa-js',
            'fa-brands fa-html5',
            'fa-brands fa-css3-alt',
            'fa-brands fa-python',
            'fa-brands fa-java',
            'fa-solid fa-database',
            'fa-solid fa-code',
            'fa-solid fa-terminal',
            'fa-brands fa-node-js'
        ];

        const count = 15; // Number of floating icons

        for (let i = 0; i < count; i++) {
            const icon = document.createElement('i');
            const iconClass = icons[Math.floor(Math.random() * icons.length)];
            icon.className = `${iconClass} floating-icon`;

            // Random Position
            const left = Math.random() * 100;
            const top = Math.random() * 100;

            // Random Size
            const size = Math.random() * 2 + 1; // 1rem to 3rem

            // Random Animation Duration and Delay
            const duration = Math.random() * 20 + 10; // 10-30s
            const delay = Math.random() * 5;

            icon.style.left = `${left}%`;
            icon.style.top = `${top}%`;
            icon.style.fontSize = `${size}rem`;
            icon.style.animationDuration = `${duration}s`;
            icon.style.animationDelay = `-${delay}s`; // Negative delay to start mid-animation

            // Random Opacity for depth effect
            const opacity = Math.random() * 0.07 + 0.03;
            icon.style.opacity = opacity;

            spaceContainer.appendChild(icon);
        }
    }

    if (spaceContainer) {
        createStars();
        createFloatingTechIcons();
    }

    // Create Falling Items (Rockets)
    function createFallingItem() {
        const item = document.createElement('i');
        item.classList.add('fa-solid', 'fa-rocket', 'falling-item'); // rocket icon

        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 5 + 3; // 3-8s duration
        const size = Math.random() * 1.5 + 1; // 1rem - 2.5rem scale

        item.style.left = `${startX}px`;
        item.style.fontSize = `${size}rem`;
        item.style.animationDuration = `${duration}s`;

        spaceContainer.appendChild(item);

        // Remove after animation
        setTimeout(() => {
            item.remove();
        }, duration * 1000);
    }

    if (spaceContainer) {
        // Spawn a rocket every 2 seconds
        setInterval(createFallingItem, 2000);
    }

});
