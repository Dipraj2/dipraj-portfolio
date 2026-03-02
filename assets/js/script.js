// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    /* --- CSE Terminal Loader --- */
    const loader = document.getElementById('loader');
    const loaderTyped = document.getElementById('loader-typed');
    const loaderProgress = document.getElementById('loader-progress');
    const loaderPercent = document.getElementById('loader-percent');
    const loaderStatus = document.getElementById('loader-status');
    const codeBg = document.getElementById('code-bg');

    const loadingPhrases = [
        "Initializing system...",
        "Loading core modules...",
        "Establishing secure connection...",
        "Compiling portfolio assets...",
        "Optimizing user experience...",
        "Access granted. Welcome."
    ];

    const fakeCode = [
        "import { engine } from 'portfolio-core';",
        "const profile = new Developer('Dipraj Mitra');",
        "profile.addSkill(['Python', 'JS', 'React', 'C++']);",
        "while(is_loading) { updateProgress(); }",
        "sudo systemctl start web-server.service",
        "GET /api/v1/projects HTTP/1.1 200 OK",
        "Encryption: AES-256-GCM initialized.",
        "Buffer overflow protection: ENABLED",
        "Neural network weights: LOADED",
        "Memory leak detection: NEGATIVE",
        "Compiling style.scss to style.css..."
    ];

    // Populate fake code background
    codeBg.innerHTML = fakeCode.join('<br>') + '<br>' + fakeCode.reverse().join('<br>');

    let phraseIdx = 0;
    let charIdx = 0;
    let progress = 0;

    function updateLoader() {
        // Typing effect for phrases
        if (phraseIdx < loadingPhrases.length) {
            const currentPhrase = loadingPhrases[phraseIdx];
            
            if (charIdx < currentPhrase.length) {
                loaderTyped.textContent += currentPhrase.charAt(charIdx);
                charIdx++;
                setTimeout(updateLoader, 30 + Math.random() * 50);
            } else {
                // Phrase complete, move to next after short pause
                setTimeout(() => {
                    if (phraseIdx < loadingPhrases.length - 1) {
                        loaderTyped.textContent = "";
                        charIdx = 0;
                        phraseIdx++;
                        loaderStatus.textContent = loadingPhrases[phraseIdx].replace("...", "");
                        updateLoader();
                    }
                }, 800);
            }
        }

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            if (progress < 100) {
                progress += Math.random() * 1.5;
                if (progress > 100) progress = 100;
                
                loaderProgress.style.width = `${progress}%`;
                loaderPercent.textContent = Math.floor(progress);
                
                if (progress === 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        loader.classList.add('fade-out');
                    }, 1000);
                }
            }
        }, 80);
    }

    // Start loader
    updateLoader();

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon();
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
        updateThemeIcon();
    });

    function updateThemeIcon() {
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    /* --- Mobile Menu --- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* --- Sticky Header & Active Link --- */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* --- Typing Animation (Hero) --- */
    const typingHero = document.getElementById('typing-text');
    const heroPhrases = ['Software Engineer', 'Full Stack Developer', 'Problem Solver', 'Cybersecurity Student'];
    let hPhraseIdx = 0;
    let hCharIdx = 0;
    let isDeleting = false;
    let hTypeSpeed = 100;

    function typeHero() {
        const current = heroPhrases[hPhraseIdx];
        
        if (isDeleting) {
            typingHero.textContent = current.substring(0, hCharIdx - 1);
            hCharIdx--;
            hTypeSpeed = 50;
        } else {
            typingHero.textContent = current.substring(0, hCharIdx + 1);
            hCharIdx++;
            hTypeSpeed = 150;
        }

        if (!isDeleting && hCharIdx === current.length) {
            isDeleting = true;
            hTypeSpeed = 2000;
        } else if (isDeleting && hCharIdx === 0) {
            isDeleting = false;
            hPhraseIdx = (hPhraseIdx + 1) % heroPhrases.length;
            hTypeSpeed = 500;
        }

        setTimeout(typeHero, hTypeSpeed);
    }

    if (typingHero) typeHero();

    /* --- Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- Functional Contact Form (AJAX) --- */
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalBtnContent = btn.innerHTML;
            
            // Visual loading state
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner"></span> Sending...`;

            try {
                const formData = new FormData(contactForm);
                // Convert FormData to a simple object for JSON
                const formObject = Object.fromEntries(formData.entries());
                
                const response = await fetch("https://formsubmit.co/ajax/dipraj.mitra123@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                });

                // Check if response is JSON
                const contentType = response.headers.get("content-type");
                let result;
                
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    result = await response.json();
                } else {
                    // It's likely HTML (an error page or success redirect)
                    const text = await response.text();
                    console.warn("Received non-JSON response:", text.substring(0, 100));
                    
                    if (response.ok) {
                        result = { success: true };
                    } else {
                        throw new Error(`Server returned HTML error: ${response.status}`);
                    }
                }

                if (result.success === "true" || result.success === true) {
                    btn.innerHTML = `<i class="fas fa-check-circle"></i> Message Sent!`;
                    btn.style.backgroundColor = '#10b981';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalBtnContent;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                    }, 5000);
                } else {
                    console.error("FormSubmit Error:", result);
                    throw new Error(result.message || "Form submission failed");
                }
            } catch (error) {
                console.error("Submission Error Details:", error);
                btn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Failed to Send`;
                btn.style.backgroundColor = '#ef4444';
                
                if (error.message.includes("403") || error.message.includes("HTML error: 403")) {
                    alert("Please check your email (dipraj.mitra123@gmail.com) and click the 'Activate Endpoint' button from FormSubmit to enable the form.");
                } else {
                    alert("An error occurred. Please check the console for details or try again later.");
                }
                
                setTimeout(() => {
                    btn.innerHTML = originalBtnContent;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 5000);
            }
        });
    }

    /* --- Smooth Scrolling --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});