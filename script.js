const inventory = [
    { nameAr: 'دريل هيلتي تكسير هيفي ديوتي', nameEn: 'Heavy Duty Hilti Jackhammer', price: 75, cat: 'drills', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=400' },
    { nameAr: 'مولد كهرباء ٥ كيلو كاتم', nameEn: '5KW Silent Generator', price: 150, cat: 'generators', img: 'https://images.unsplash.com/photo-1590483734724-383b9f4a5ce2?q=80&w=400' },
    { nameAr: 'صاروخ جلخ بوش احترافي', nameEn: 'Professional Bosch Grinder', price: 45, cat: 'drills', img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=400' },
    { nameAr: 'منشار رخام وسيراميك كهربائي', nameEn: 'Electric Tile & Marble Saw', price: 65, cat: 'saws', img: 'https://plus.unsplash.com/premium_photo-1663050986883-a5bdd99a7fa4?q=80&w=400' },
    { nameAr: 'مطرقة هدم كهربائية كبيرة', nameEn: 'Large Demolition Hammer', price: 90, cat: 'drills', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=400' },
    { nameAr: 'سلم ألمنيوم مزدوج ٤ متر', nameEn: '4M Double Aluminum Ladder', price: 30, cat: 'safety', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400' }
];

function renderTools() {
    const grid = document.getElementById('tool-grid');
    const isAr = document.body.classList.contains('ar');
    
    grid.innerHTML = inventory.map(item => `
        <div class="tool-card group">
            <div class="overflow-hidden">
                <img src="${item.img}" class="tool-img group-hover:scale-110 transition duration-500">
            </div>
            <div class="tool-body">
                <span class="text-gold text-xs font-bold uppercase tracking-widest">${item.cat}</span>
                <h3 class="text-xl font-bold text-navy mt-1">${isAr ? item.nameAr : item.nameEn}</h3>
                <p class="text-2xl font-black mt-4 text-navy">${item.price} <small class="text-sm text-gray-400">SAR / Day</small></p>
                <button class="btn-primary w-full mt-6 shadow-lg">
                    ${isAr ? 'احجز المعدة الآن' : 'Reserve Now'}
                </button>
            </div>
        </div>
    `).join('');
}

function toggleLang() {
    const b = document.body;
    const isAr = b.classList.contains('ar');
    const arText = document.querySelectorAll('.lang-ar');
    const enText = document.querySelectorAll('.lang-en');
    const btn = document.querySelector('.lang-switch-btn');

    if(isAr) {
        b.classList.replace('ar', 'en');
        b.dir = "ltr";
        arText.forEach(el => el.classList.add('hidden'));
        enText.forEach(el => el.classList.remove('hidden'));
        btn.innerText = "عربي";
    } else {
        b.classList.replace('en', 'ar');
        b.dir = "rtl";
        enText.forEach(el => el.classList.add('hidden'));
        arText.forEach(el => el.classList.remove('hidden'));
        btn.innerText = "English";
    }
    renderTools();
}

window.onload = renderTools;