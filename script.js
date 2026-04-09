/**
 * AL-FAZAH EQUIPMENT RENTALS – MASTER SCRIPT
 * Premium interactive features
 */

// ── TOOL DATABASE ──
const inventory = [
    { nameAr: 'دريل هيلتي تكسير هيفي ديوتي', nameEn: 'Heavy Duty Hilti Jackhammer', price: 90, cat: 'drills', img: 'drill.jpg' },
    { nameAr: 'مولد كهرباء ٥ كيلو كاتم', nameEn: '5KW Silent Generator', price: 150, cat: 'generators', img: 'generator.jpg' },
    { nameAr: 'صاروخ جلخ بوش احترافي', nameEn: 'Professional Bosch Grinder', price: 45, cat: 'drills', img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=400' },
    { nameAr: 'منشار رخام وسيراميك كهربائي', nameEn: 'Electric Tile & Marble Saw', price: 65, cat: 'saws', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400' },
    { nameAr: 'مطرقة هدم كهربائية كبيرة', nameEn: 'Large Demolition Hammer', price: 120, cat: 'drills', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400' },
    { nameAr: 'سلم ألمنيوم مزدوج ٤ متر', nameEn: '4M Double Aluminum Ladder', price: 30, cat: 'safety', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400' }
];

// ── RENDER EQUIPMENT CARDS ──
function renderTools() {
    const grid = document.getElementById('tool-grid');
    if (!grid) return;

    const isAr = document.body.classList.contains('ar');

    grid.innerHTML = inventory.map((item, i) => `
        <div class="tool-card group reveal delay-${(i % 3) * 100}">
            <div class="overflow-hidden relative h-64">
                <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent z-10"></div>
                <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="${isAr ? item.nameAr : item.nameEn}" loading="lazy">
                <div class="absolute top-4 ${isAr ? 'left-4' : 'right-4'} z-20">
                    <span class="section-label text-[10px] tracking-[3px]">${item.cat}</span>
                </div>
            </div>
            <div class="p-7 relative z-20">
                <h3 class="text-lg md:text-xl font-black mb-1 line-clamp-1">${isAr ? item.nameAr : item.nameEn}</h3>
                <div class="flex items-baseline gap-2 mt-4 mb-6">
                    <span class="text-3xl font-black text-gold">${item.price}</span>
                    <span class="text-sm text-muted font-bold uppercase tracking-wider">${isAr ? 'ريال / يوم' : 'SAR / Day'}</span>
                </div>
                <button class="btn-gold w-full text-sm" onclick="location.href='https://wa.me/966541894161?text=${encodeURIComponent(isAr ? 'أرغب بحجز: ' + item.nameAr : 'I want to book: ' + item.nameEn)}'">
                    ${isAr ? 'احجز عبر واتساب' : 'Book via WhatsApp'}
                </button>
            </div>
        </div>
    `).join('');

    observeElements();
}

// ── THEME TOGGLE ──
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(isDark ? 'light-theme' : 'dark-theme');
    localStorage.setItem('theme', isDark ? 'light-theme' : 'dark-theme');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-theme');
    const el = document.getElementById('theme-icon');
    if (!el) return;
    el.innerHTML = isDark
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
}

// ── LANGUAGE TOGGLE ──
function toggleLang() {
    const b = document.body;
    const isAr = b.classList.contains('ar');

    b.classList.replace(isAr ? 'ar' : 'en', isAr ? 'en' : 'ar');
    b.dir = isAr ? 'ltr' : 'rtl';

    document.querySelectorAll('.lang-ar').forEach(el => el.classList.toggle('hidden', isAr));
    document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', !isAr));

    const langBtn = document.querySelector('.lang-switch-btn');
    if (langBtn) langBtn.innerText = isAr ? 'عربي' : 'English';

    localStorage.setItem('lang', isAr ? 'en' : 'ar');
    setTimeout(() => renderTools(), 30);
}

function initLang() {
    const saved = localStorage.getItem('lang') || 'ar';
    if (saved === 'en') {
        document.body.classList.replace('ar', 'en');
        document.body.dir = 'ltr';
        document.querySelectorAll('.lang-ar').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.lang-en').forEach(el => el.classList.remove('hidden'));
        const btn = document.querySelector('.lang-switch-btn');
        if (btn) btn.innerText = 'عربي';
    }
    renderTools();
}

// ── MOBILE MENU ──
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger-btn');
    if (!menu || !hamburger) return;

    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger-btn');
    if (menu) menu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

// ── SCROLL REVEAL OBSERVER ──
let observer;
function observeElements() {
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

// ── COUNTER ANIMATION ──
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';
                let current = 0;
                const step = Math.max(1, Math.floor(target / 60));
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = prefix + current + suffix;
                }, 25);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
}

// ── INIT ──
window.addEventListener('DOMContentLoaded', () => {
    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(savedTheme);
    updateThemeIcon();

    // Language
    initLang();

    // Loader
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(() => loader.classList.add('fade-out'), 700);
    }

    // Observers
    observeElements();
    animateCounters();

    // Navbar scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }
});