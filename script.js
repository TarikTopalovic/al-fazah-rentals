/**
 * AL-FAZAH EQUIPMENT RENTALS - MASTER SCRIPT
 */

// 1. TOOL DATABASE
const inventory = [
    { nameAr: 'دريل هيلتي تكسير هيفي ديوتي', nameEn: 'Heavy Duty Hilti Jackhammer', price: 90, cat: 'drills', img: 'drill.jpg' },
    { nameAr: 'مولد كهرباء ٥ كيلو', nameEn: '5KW Silent Generator', price: 150, cat: 'generators', img: 'generator.jpg' },
    { nameAr: 'صاروخ جلخ بوش احترافي', nameEn: 'Professional Bosch Grinder', price: 45, cat: 'drills', img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=400' },
    { nameAr: 'منشار رخام وسيراميك كهربائي', nameEn: 'Electric Tile & Marble Saw', price: 65, cat: 'saws', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400' },
    { nameAr: 'مطرقة هدم كهربائية كبيرة', nameEn: 'Large Demolition Hammer', price: 120, cat: 'drills', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400' },
    { nameAr: 'سلم ألمنيوم مزدوج ٤ متر', nameEn: '4M Double Aluminum Ladder', price: 30, cat: 'safety', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400' }
];

// 2. RENDER TOOLS TO THE GRID
function renderTools() {
    const grid = document.getElementById('tool-grid');
    if (!grid) return;

    const isAr = document.body.classList.contains('ar');
    
    grid.innerHTML = inventory.map((item, index) => `
        <div class="tool-card group reveal delay-${(index % 3) * 100}">
            <div class="overflow-hidden relative h-64">
                <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent z-10 opacity-60"></div>
                <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" alt="${isAr ? item.nameAr : item.nameEn}">
                <div class="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md rounded-full px-4 py-1 border border-white/10">
                    <span class="text-gold text-xs font-black uppercase tracking-widest">${item.cat}</span>
                </div>
            </div>
            <div class="p-8 relative z-20 bg-[var(--bg-card)]">
                <h3 class="text-xl md:text-2xl font-black mb-2 line-clamp-1">${isAr ? item.nameAr : item.nameEn}</h3>
                <p class="text-3xl font-black text-gold mt-4 mb-8 flex items-baseline gap-2">
                    ${item.price} <span class="text-sm opacity-50 font-bold uppercase tracking-wider text-[var(--text-main)]">${isAr ? 'ريال / يوم' : 'SAR / Day'}</span>
                </p>
                <button class="btn-gold w-full text-sm md:text-base" onclick="location.href='https://wa.me/966541894161'">
                    ${isAr ? 'احجز المعدة الآن' : 'Reserve Now'}
                </button>
            </div>
        </div>
    `).join('');

    // Re-trigger intersection observer for newly added reveal elements
    observeElements();
}

// 3. THEME TOGGLE (DARK / LIGHT)
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
    const iconSpan = document.getElementById('theme-icon');
    if (iconSpan) {
        iconSpan.innerHTML = isDark ? `
            <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        ` : `
            <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        `;
    }
}

// 4. LANGUAGE TOGGLE (AR / EN)
function toggleLang() {
    const b = document.body;
    const arElements = document.querySelectorAll('.lang-ar');
    const enElements = document.querySelectorAll('.lang-en');
    const langBtn = document.querySelector('.lang-switch-btn');

    if (b.classList.contains('ar')) {
        b.classList.replace('ar', 'en');
        b.dir = "ltr";
        arElements.forEach(el => el.classList.add('hidden'));
        enElements.forEach(el => el.classList.remove('hidden'));
        if (langBtn) langBtn.innerText = "عربي";
        localStorage.setItem('lang', 'en');
    } else {
        b.classList.replace('en', 'ar');
        b.dir = "rtl";
        enElements.forEach(el => el.classList.add('hidden'));
        arElements.forEach(el => el.classList.remove('hidden'));
        if (langBtn) langBtn.innerText = "English";
        localStorage.setItem('lang', 'ar');
    }
    
    // Update active nav links handling
    setTimeout(() => renderTools(), 50);
}

function initLang() {
    const savedLang = localStorage.getItem('lang') || 'ar';
    const b = document.body;
    
    if (savedLang === 'en') {
        b.classList.remove('ar');
        b.classList.add('en');
        b.dir = "ltr";
        document.querySelectorAll('.lang-ar').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.lang-en').forEach(el => el.classList.remove('hidden'));
        const langBtn = document.querySelector('.lang-switch-btn');
        if (langBtn) langBtn.innerText = "عربي";
    }
    renderTools();
}

// 5. OBSERVER FOR SCROLL ANIMATIONS
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 6. INITIALIZATION ON LOAD
window.onload = () => {
    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(savedTheme);
    updateThemeIcon();

    // Language & Tools
    initLang();

    // Loader
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 800); 
    }

    // Scroll Observer
    observeElements();
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
};