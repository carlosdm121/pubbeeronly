document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLines = navToggle ? navToggle.querySelectorAll('.nav__toggle-line') : [];

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            navLines[1].style.opacity = '0';
            navLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            navLines.forEach(l => { l.style.transform = 'none'; l.style.opacity = '1'; });
        }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navLines.forEach(l => { l.style.transform = 'none'; l.style.opacity = '1'; });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
            }
        });
    });

    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.menu__item, .section__title, .about__text, .hours__info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.querySelectorAll('.menu__item').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.1}s`;
    });

    const langToggle = document.getElementById('langToggle');
    const langText = langToggle?.querySelector('.nav__lang-text');

    function setLanguage(lang) {
        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
        });
        if (langText) langText.textContent = lang === 'en' ? 'ES' : 'EN';
        document.documentElement.lang = lang === 'en' ? 'en' : 'es';
        localStorage.setItem('pub-language', lang);
    }

    langToggle?.addEventListener('click', () => {
        const current = localStorage.getItem('pub-language') || 'es';
        setLanguage(current === 'es' ? 'en' : 'es');
    });

    const savedLang = localStorage.getItem('pub-language') || 'es';
    setLanguage(savedLang);

    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                }).catch(() => {
                    musicToggle.classList.remove('playing');
                });
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            }
        });

        bgMusic.addEventListener('ended', () => {
            musicToggle.classList.remove('playing');
        });
    }
});
