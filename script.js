// Wait for DOM content loading
document.addEventListener('DOMContentLoaded', () => {

    // Set Dynamic Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 1. Theme Switcher (Light / Dark Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeIcon.className = 'fa-solid fa-sun text-lg text-amber-400';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            themeIcon.className = 'fa-solid fa-moon text-lg text-slate-700';
            localStorage.setItem('theme', 'light');
        }
    }

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(!isDark);
    });

    // --- 2. Typing Text Effect in Hero ---
    const roles = ["Full-Stack Applications.", "Modern Web Experiences.", "Scalable Utilities.", "AI-Powered Solutions."];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById('typewriter');

    function typeEffect() {
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            charIdx--;
            typewriterEl.textContent = currentRole.substring(0, charIdx);
        } else {
            charIdx++;
            typewriterEl.textContent = currentRole.substring(0, charIdx);
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentRole.length) {
            speed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 500; // Pause before typing new word
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // --- 3. Interactive Particle Network Canvas ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
        }
    }

    for (let i = 0; i < 45; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist / 120})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- 4. Mobile Menu Navigation Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- 5. Skill Category Filtering ---
    const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => {
                b.classList.remove('bg-brand-600', 'text-white', 'shadow-md');
                b.classList.add('bg-slate-200/80', 'dark:bg-slate-800/80', 'text-slate-700', 'dark:text-slate-300');
            });
            btn.classList.add('bg-brand-600', 'text-white', 'shadow-md');
            btn.classList.remove('bg-slate-200/80', 'dark:bg-slate-800/80', 'text-slate-700', 'dark:text-slate-300');

            const filter = btn.getAttribute('data-filter');

            skillItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 6. Dynamic Fetching & Rendering Projects from DataManagement/projects.json ---
    const projectsGrid = document.getElementById('projects-grid');
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    let loadedProjects = [];

    async function loadProjects() {
        try {
            const response = await fetch('DataManagement/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            loadedProjects = await response.json();
            renderProjects(loadedProjects);
            setupProjectFiltering();
        } catch (error) {
            console.error('Failed to load projects JSON:', error);
            if (projectsGrid) {
                projectsGrid.innerHTML = `
                    <p class="col-span-full text-center text-red-500 font-semibold py-8">
                        Failed to load projects data. Please check if DataManagement/projects.json exists and you are running a local server.
                    </p>
                `;
            }
        }
    }

    function renderProjects(projects) {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            const tagsHTML = (project.tags || [])
                .map(tag => `<span class="px-2.5 py-1 rounded-md text-xs font-medium bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">${tag}</span>`)
                .join('');

            const cardHTML = `
                <div class="project-card glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl" data-category="${project.category}" data-id="${project.id}">
                    <div class="relative overflow-hidden aspect-video">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                        <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <button class="view-project-btn p-3 rounded-full bg-white/90 text-slate-900 hover:bg-white hover:scale-110 transition-all" title="View Details">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <a href="${project.githubLink}" target="_blank" rel="noopener" class="p-3 rounded-full bg-white/90 text-slate-900 hover:bg-white hover:scale-110 transition-all" title="GitHub Source">
                                <i class="fa-brands fa-github"></i>
                            </a>
                        </div>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex flex-wrap gap-2 mb-3">${tagsHTML}</div>
                            <h3 class="text-xl font-bold mb-2 group-hover:text-brand-500 transition-colors">${project.title}</h3>
                            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">${project.description}</p>
                        </div>
                        <button class="view-project-btn text-brand-600 dark:text-brand-400 font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                            <span>Read More</span>
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </button>
                    </div>
                </div>
            `;
            projectsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        setupModalListeners();
    }

    // --- 7. Project Category Filtering Setup ---
    function setupProjectFiltering() {
        const projectFilterBtns = document.querySelectorAll('.project-filter-btn');

        projectFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                projectFilterBtns.forEach(b => {
                    b.classList.remove('bg-brand-600', 'text-white', 'shadow-md');
                    b.classList.add('bg-slate-200/80', 'dark:bg-slate-800/80', 'text-slate-700', 'dark:text-slate-300');
                });
                btn.classList.add('bg-brand-600', 'text-white', 'shadow-md');
                btn.classList.remove('bg-slate-200/80', 'dark:bg-slate-800/80', 'text-slate-700', 'dark:text-slate-300');

                const filter = btn.getAttribute('data-filter');
                const projectCards = document.querySelectorAll('.project-card');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 8. Project Details Modal Setup ---
    function setupModalListeners() {
        const viewProjectBtns = document.querySelectorAll('.view-project-btn');

        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.project-card');
                const projectId = card.getAttribute('data-id');
                const data = loadedProjects.find(p => p.id === projectId);

                if (data) {
                    document.getElementById('modal-title').textContent = data.title;
                    document.getElementById('modal-description').textContent = data.longDescription || data.description;
                    document.getElementById('modal-image').src = data.image;
                    document.getElementById('modal-live-link').href = data.liveLink;
                    document.getElementById('modal-github-link').href = data.githubLink;

                    const modalTags = document.getElementById('modal-tags');
                    modalTags.innerHTML = '';
                    (data.tags || []).forEach(tag => {
                        const tagEl = document.createElement('span');
                        tagEl.className = 'px-3 py-1 rounded-lg text-xs font-medium bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300';
                        tagEl.textContent = tag;
                        modalTags.appendChild(tagEl);
                    });

                    projectModal.classList.remove('opacity-0', 'pointer-events-none');
                }
            });
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            projectModal.classList.add('opacity-0', 'pointer-events-none');
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.add('opacity-0', 'pointer-events-none');
            }
        });
    }

    // Initialize fetching projects from JSON
    loadProjects();

    // --- 9. Contact Form Handling & Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Sending...';

            // Simulate Async Form Submission
            setTimeout(() => {
                submitBtn.className = 'w-full py-3.5 px-6 rounded-xl bg-emerald-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2';
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent Successfully!';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.className = 'w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2';
                    submitBtn.innerHTML = originalText;
                }, 4000);
            }, 1500);
        });
    }

    // --- 10. Back to Top Button & Scroll Watcher ---
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});