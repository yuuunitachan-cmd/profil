document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Page Transition
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href'); // e.g., '#about'
        const transition = document.getElementById('page-transition');
        const targetSection = document.querySelector(href); // Ambil section target, e.g., #about

        // Fade out
        transition.classList.add('active');
        
        setTimeout(() => {
            window.location.hash = href; // Ganti hash
            
            // Fade out selesai, reset transisi
            setTimeout(() => {
                transition.classList.remove('active');
                
                // Fade-in section target (halus masuk)
                if (targetSection) {
                    targetSection.classList.add('fade-in');
                    // Hapus class setelah animasi selesai
                    setTimeout(() => {
                        targetSection.classList.remove('fade-in');
                    }, 400);
                }
                
            }, 400); // Durasi fade out
        }, 400); // Durasi fade out
    });
});

   // Sakura Animation
const canvas = document.getElementById('sakura-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petals = [];
const petalCount = 50;

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 + 2;
        this.angle = Math.random() * 360;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += 2;
        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
            this.x = Math.random() * canvas.width;
            this.y = -20;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        // Pilih warna berdasarkan mode light/dark
        const isLightMode = document.body.classList.contains('light-mode');
        ctx.fillStyle = isLightMode ? 'rgba(255, 105, 180, 0.8)' : 'rgba(255, 182, 193, 0.8)';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size / 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initSakura() {
    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }
}

function animateSakura() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animateSakura);
}

initSakura();
animateSakura();

// Resize Canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


    // Scroll Reveal
    const sections = document.querySelectorAll('.section');
    const timelineItems = document.querySelectorAll('.timeline-item');

    const revealElements = () => {
        const windowHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('visible');
            }
        });

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealElements);
    revealElements();

    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight * 0.8) {
                bar.style.width = width;
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // Anime Character Popup
    const popup = document.getElementById('character-popup');
    const dialog = popup.querySelector('.character-dialog p');
    const messages = [
        'Konnichiwa! Selamat datang di dunia Yuki! ✨',
        'Sudah lihat galeri animeku belum? Banyak karakter keren lho!',
        'Jangan lupa cek daftar anime favoritku, ya!',
        'Apa kabar? Ayo ngobrol tentang anime atau coding!'
    ];

    function showPopup() {
        popup.classList.add('active');
        dialog.textContent = messages[Math.floor(Math.random() * messages.length)];
        setTimeout(() => {
            popup.classList.remove('active');
        }, 5000);
    }

    setTimeout(showPopup, 2000);
    setInterval(showPopup, 15000);
});