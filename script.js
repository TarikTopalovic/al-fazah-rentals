/**
 * AL-FAZAH EQUIPMENT RENTALS - MASTER SCRIPT
 * Features: Multi-language, Theme Toggle, Loader, and Dynamic Inventory
 */

// 1. TOOL DATABASE
const inventory = [
    { nameAr: 'دريل هيلتي تكسير هيفي ديوتي', nameEn: 'Heavy Duty Hilti Jackhammer', price: 75, cat: 'drills', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400' },
    { nameAr: 'مولد كهرباء ٥ كيلو كاتم', nameEn: '5KW Silent Generator', price: 150, cat: 'generators', img: 'https://images.unsplash.com/photo-1590483734724-383b9f4a5ce2?q=80&w=400' },
    { nameAr: 'صاروخ جلخ بوش احترافي', nameEn: 'Professional Bosch Grinder', price: 45, cat: 'drills', img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=400' },
    { nameAr: 'منشار رخام وسيراميك كهربائي', nameEn: 'Electric Tile & Marble Saw', price: 65, cat: 'saws', img: 'https://plus.unsplash.com/premium_photo-1663050986883-a5bdd99a7fa4?q=80&w=400' },
    { nameAr: 'مطرقة هدم كهربائية كبيرة', nameEn: 'Large Demolition Hammer', price: 90, cat: 'drills', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400' },
    { nameAr: 'سلم ألمنيوم مزدوج ٤ متر', nameEn: '4M Double Aluminum Ladder', price: 30, cat: 'safety', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400' }
];

// 2. RENDER TOOLS TO THE GRID
function renderTools() {
    const grid = document.getElementById('tool-grid');
    if (!grid) return; // Safety check

    const isAr = document.body.classList.contains('ar');
    
    grid.innerHTML = inventory.map(item => `
        <div class="tool-card group">
            <div class="overflow-hidden">
                <img src="${item.img}" class="tool-img group-hover:scale-110 transition duration-500" alt="${isAr ? item.nameAr : item.nameEn}">
            </div>
            <div class="p-6">
                <span class="text-gold text-xs font-bold uppercase tracking-widest">${item.cat}</span>
                <h3 class="text-xl font-bold mt-1">${isAr ? item.nameAr : item.nameEn}</h3>
                <p class="text-2xl font-black mt-4">${item.price} <small class="text-sm opacity-50 font-normal">SAR / Day</small></p>
                <button class="btn-gold w-full mt-6 shadow-lg" onclick="location.href='https://wa.me/966500000000'">
                    ${isAr ? 'احجز المعدة الآن' : 'Reserve Now'}
                </button>
            </div>
        </div>
    `).join('');
}

// 3. THEME TOGGLE (BLACK / WHITE)
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    }
}

// 4. LANGUAGE TOGGLE (AR / EN)
function toggleLang() {
    const b = document.body;
    const arElements = document.querySelectorAll('.lang-ar');
    const enElements = document.querySelectorAll('.lang-en');
    const langBtn = document.querySelector('.lang-switch-btn');

    if (b.classList.contains('ar')) {
        // Switch to English
        b.classList.replace('ar', 'en');
        b.dir = "ltr";
        arElements.forEach(el => el.classList.add('hidden'));
        enElements.forEach(el => el.classList.remove('hidden'));
        if (langBtn) langBtn.innerText = "عربي";
        localStorage.setItem('lang', 'en');
    } else {
        // Switch to Arabic
        b.classList.replace('en', 'ar');
        b.dir = "rtl";
        enElements.forEach(el => el.classList.add('hidden'));
        arElements.forEach(el => el.classList.remove('hidden'));
        if (langBtn) langBtn.innerText = "English";
        localStorage.setItem('lang', 'ar');
    }
    renderTools();
}

// 5. INITIALIZATION ON LOAD
window.onload = () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.classList.add(savedTheme);

    // Check for saved language preference
    const savedLang = localStorage.getItem('lang') || 'ar';
    if (savedLang === 'en') {
        // Trigger toggle once if the saved preference is English
        toggleLang(); 
    } else {
        document.body.classList.add('ar');
        renderTools();
    }
};

// 6. LOADER LOGIC (TURBO MASTER STYLE)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1000); 
    }
});