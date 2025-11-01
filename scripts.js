// --- Helpers ---
function el(id) { return document.getElementById(id); }
function createEl(tag, cls) { const d = document.createElement(tag); if (cls) d.className = cls; return d; }

// --- Mock Data ---
const PROJECTS = [
    { id: 'p1', name: 'جنة أكتوبر', city: '6 أكتوبر', units: 120, images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=60', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=60', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=60'] },
    { id: 'p2', name: 'سكن مصر - القاهرة الجديدة', city: 'القاهرة الجديدة', units: 80, images: ['https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=60', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=60'] },
    { id: 'p3', name: 'دار مصر - الإسكندرية', city: 'الإسكندرية', units: 60, images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=60', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=60'] },
    { id: 'p4', name: 'مشروع الإسكان المتميز', city: 'الشيخ زايد', units: 250, images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=60', 'https://images.unsplash.com/photo-1628744448845-a11c21623f53?auto=format&fit=crop&w=1200&q=60'] },
];

const UNITS = [
    { id: 'u1', project: 'p1', type: 'شقة', price: 1250000, area: 130, floor: 2, dir: 'شمال', beds: 3, baths: 2, tag: 'عرض مميز', status: 'متاحة', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60' },
    { id: 'u2', project: 'p1', type: 'شقة', price: 1100000, area: 115, floor: 3, dir: 'جنوب', beds: 2, baths: 2, status: 'متاحة', image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36f?auto=format&fit=crop&w=800&q=60' },
    { id: 'u3', project: 'p2', type: 'شقة', price: 1800000, area: 150, floor: 1, dir: 'شرق', beds: 3, baths: 3, tag: 'وحدة نادرة', status: 'متاحة', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60' },
    { id: 'u4', project: 'p1', type: 'شقة', price: 1300000, area: 135, floor: 5, dir: 'غربي', beds: 3, baths: 2, status: 'وشيكة البيع', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=60' },
    { id: 'u5', project: 'p3', type: 'فيلا', price: 3500000, area: 250, floor: 0, dir: 'بحري', beds: 4, baths: 4, status: 'متاحة', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=60' },
    { id: 'u6', project: 'p4', type: 'شقة', price: 2100000, area: 180, floor: 4, dir: 'قبلي', beds: 4, baths: 3, tag: 'الأكثر طلباً', status: 'وشيكة البيع', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41fa2247?auto=format&fit=crop&w=800&q=60' },
];

// --- Initialization Functions ---
function initAnimatedStats() {
    const stats = [{ id: 'stat-bookings', final: 11250 }, { id: 'stat-clients', final: 2300 }, { id: 'stat-speed', final: 0.8, fixed: 1 }];
    stats.forEach(stat => {
        const elStat = el(stat.id);
        if (elStat) {
            let current = 0;
            const step = stat.final / 100;
            const interval = setInterval(() => {
                current += step;
                if (current >= stat.final) {
                    current = stat.final;
                    clearInterval(interval);
                }
                elStat.textContent = current.toLocaleString(undefined, { minimumFractionDigits: stat.fixed, maximumFractionDigits: stat.fixed });
            }, 20);
        }
    });
}

function initProjectsPage() {
    const list = el('projects-list');
    if (!list) return;

    function renderProjects(projects) {
        list.innerHTML = '';
        if (projects.length === 0) {
            list.innerHTML = `<p class="card">لا توجد مشاريع تطابق بحثك.</p>`;
            return;
        }
        projects.forEach(p => {
            const card = createEl('div', 'card');
            card.innerHTML = `
                <div class="project-card-image" style="background-image: url('${p.images[0]}')"></div>
                <h3>${p.name}</h3>
                <p>${p.city} • ${p.units} وحدة متاحة</p>
                <a class="btn-primary-sm mt-4" href="project.html?id=${p.id}">عرض التفاصيل</a>
            `;
            list.appendChild(card);
        });
    }

    renderProjects(PROJECTS);

    const filterBtn = el('btn-filter');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            const city = el('filter-city').value.toLowerCase();
            const type = el('filter-type').value;
            const beds = el('filter-beds').value;
            const baths = el('filter-baths').value;
            const minPrice = Number(el('filter-price-min').value) || 0;
            const maxPrice = Number(el('filter-price-max').value) || Infinity;

            let filteredProjects = PROJECTS;

            // Filter projects by city first
            if (city) {
                filteredProjects = filteredProjects.filter(p => p.city.toLowerCase().includes(city));
            }

            let unitFiltersApplied = false;
            let filteredUnits = UNITS;

            if (type) {
                filteredUnits = filteredUnits.filter(u => u.type === type);
                unitFiltersApplied = true;
            }
            if (beds) {
                const numBeds = parseInt(beds);
                if (numBeds === 4) { // "4+" option has value "4"
                    filteredUnits = filteredUnits.filter(u => u.beds >= numBeds);
                } else {
                    filteredUnits = filteredUnits.filter(u => u.beds == numBeds);
                }
                unitFiltersApplied = true;
            }
            if (baths) {
                const numBaths = parseInt(baths);
                 if (numBaths === 4) { // "4+" option has value "4"
                    filteredUnits = filteredUnits.filter(u => u.baths >= numBaths);
                } else {
                    filteredUnits = filteredUnits.filter(u => u.baths == numBaths);
                }
                unitFiltersApplied = true;
            }
            if (minPrice > 0) {
                filteredUnits = filteredUnits.filter(u => u.price >= minPrice);
                unitFiltersApplied = true;
            }
            if (maxPrice < Infinity) {
                filteredUnits = filteredUnits.filter(u => u.price <= maxPrice);
                unitFiltersApplied = true;
            }
            
            // If any unit-specific filters were applied, filter projects based on available units
            if (unitFiltersApplied) {
                const projectIdsWithMatchingUnits = new Set(filteredUnits.map(u => u.project));
                filteredProjects = filteredProjects.filter(p => projectIdsWithMatchingUnits.has(p.id));
            }

            renderProjects(filteredProjects);
        });
    }
}

function initProjectDetailPage() {
    const title = el('project-title'); if (!title) return;
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || PROJECTS[0].id;
    const project = PROJECTS.find(x => x.id === id) || PROJECTS[0];

    title.textContent = project.name;
    el('project-meta').textContent = `${project.city} • ${project.units} وحدة متاحة`;

    const mainImage = el('gallery-main-image');
    const thumbnailsContainer = el('gallery-thumbnails');
    if (mainImage && thumbnailsContainer) {
        mainImage.src = project.images[0];
        thumbnailsContainer.innerHTML = '';
        project.images.forEach((imgSrc, index) => {
            const thumb = createEl('img');
            thumb.src = imgSrc;
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.className = index === 0 ? 'active' : '';
            thumb.addEventListener('click', () => {
                mainImage.src = imgSrc;
                document.querySelectorAll('.gallery-thumbnails img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            thumbnailsContainer.appendChild(thumb);
        });
    }

    const unitsList = el('units-list');
    if (unitsList) {
        unitsList.innerHTML = '';
        UNITS.filter(u => u.project === id).forEach(u => {
            const c = createEl('div', 'card unit-card');
            c.innerHTML = `
                <div class="unit-card-image" style="background-image: url('${u.image}')">
                    <div class="unit-status status-${u.status === 'متاحة' ? 'available' : 'reserved'}">${u.status}</div>
                    ${u.tag ? `<div class="unit-tag">${u.tag}</div>` : ''}
                </div>
                <div class="unit-card-content">
                    <button class="favorite-btn" aria-label="Add to favorites">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>
                    </button>
                    <h5>${u.type}</h5>
                    <strong>${u.price.toLocaleString()} ج.م</strong>
                    <div class="unit-specs-row">
                        <div class="spec-item" title="المساحة"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>${u.area} م²</div>
                        <div class="spec-item" title="غرف نوم"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-3-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>${u.beds} غرف</div>
                        <div class="spec-item" title="حمامات"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM3 15.5v-2a2 2 0 012-2h14a2 2 0 012 2v2M8 19v-1.5M16 19v-1.5"></path></svg>${u.baths} حمامات</div>
                        <div class="spec-item" title="الاتجاه"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-8-4.5-8-11.5a8 8 0 1116 0c0 7-8 11.5-8 11.5z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 10a3 3 0 100-6 3 3 0 000 6z" /></svg>${u.dir}</div>
                    </div>
                    <a class="btn-primary-sm" href="unit.html?id=${u.id}">عرض التفاصيل</a>
                </div>`;
            c.querySelector('.favorite-btn').addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('active');
            });
            unitsList.appendChild(c);
        });
    }

    const top10 = el('top10-list'); if (top10) {
        top10.innerHTML = '';
        UNITS.slice(0, 5).forEach(u => {
            const c = createEl('div', 'card');
            c.innerHTML = `<div>${u.area} م²<br>${u.price.toLocaleString()} ج.م</div>`;
            top10.appendChild(c);
        });
    }
}

function initUnitPage() {
    const title = el('unit-title'); if (!title) return;
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || UNITS[0].id;
    const unit = UNITS.find(x => x.id === id) || UNITS[0];

    title.textContent = `${unit.type} — ${unit.area} م² - مشروع ${PROJECTS.find(p => p.id === unit.project).name}`;
    el('unit-price').textContent = `السعر: ${unit.price.toLocaleString()} ج.م`;
    el('unit-specs').innerHTML = `
        <li><strong>المساحة:</strong> ${unit.area} م²</li>
        <li><strong>الدور:</strong> ${unit.floor}</li>
        <li><strong>الاتجاه:</strong> ${unit.dir}</li>
        <li><strong>غرف النوم:</strong> ${unit.beds}</li>
        <li><strong>الحمامات:</strong> ${unit.baths}</li>
    `;
    const offerPrice = Math.round(unit.price * 0.07);
    el('offer-price').textContent = `الأوفر برايس المتوقع: ${offerPrice.toLocaleString()} ج.م`;
    
    const calcBtn = document.querySelector('#unit-detail a.btn-outline');
    if (calcBtn) calcBtn.href = `calculator.html?price=${unit.price}`;
    
    const bookBtn = el('btn-book');
    if (bookBtn) bookBtn.addEventListener('click', () => alert('تم استلام طلبك! سيقوم أحد ممثلينا بالتواصل معك قريبًا لتأكيد الحجز.'));
}

function initCalculatorPage() {
    const btn = el('btn-calc'); if (!btn) return;
    const params = new URLSearchParams(location.search);
    const priceFromUrl = params.get('price');
    const priceInput = el('calc-price');
    if (priceFromUrl) priceInput.value = priceFromUrl;

    const calculate = () => {
        const price = Number(el('calc-price').value || 0);
        const downPct = Number(el('calc-down').value || 0);
        const years = Number(el('calc-years').value || 0);
        const rate = Number(el('calc-rate').value || 0) / 100;
        if (price <= 0 || years <= 0) {
            el('calc-result').innerHTML = '';
            return;
        }
        const down = price * downPct / 100;
        const principal = price - down;
        const months = years * 12;
        const monthlyRate = rate / 12;
        const monthly = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        el('calc-result').innerHTML = `
            <div class="card mt-6">
                <h4>نتائج الحساب:</h4>
                <ul class="specs-list">
                    <li><strong>المقدم (${downPct}%):</strong> ${Math.round(down).toLocaleString()} ج.م</li>
                    <li><strong>مبلغ التمويل:</strong> ${Math.round(principal).toLocaleString()} ج.م</li>
                    <li><strong>القسط الشهري (لمدة ${years} سنوات):</strong> ${Math.round(monthly).toLocaleString()} ج.م</li>
                </ul>
            </div>`;
    };
    btn.addEventListener('click', calculate);
    calculate();
}

function initContactPage() {
    const btn = el('contact-send'); if (!btn) return;
    btn.addEventListener('click', async () => {
        const name = el('contact-name').value;
        const phone = el('contact-phone').value;
        const msg = el('contact-msg').value;
        if (!name || !phone) { alert('يرجى ملء الاسم ورقم الهاتف'); return; }
        
        btn.textContent = 'جاري الإرسال...';
        btn.disabled = true;

        try {
            const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, message: msg }) });
            if (!response.ok) throw new Error('Network response was not ok');
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
            el('contact-form').reset();
        } catch (e) {
            alert('حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.');
            console.error(e);
        } finally {
            btn.textContent = 'إرسال';
            btn.disabled = false;
        }
    });
}

function initAssistant() {
    const form = el('assistant-form'), messages = el('assistant-messages'), input = el('assistant-input');
    if (!form) return;

    const appendMessage = (who, text) => {
        const m = createEl('div', `message ${who}-message`);
        m.textContent = text;
        messages.appendChild(m);
        messages.scrollTop = messages.scrollHeight;
        return m;
    };

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const text = input.value.trim(); if (!text) return;
        appendMessage('user', text);
        input.value = '';
        const thinking = appendMessage('assistant', 'جاري التفكير...');

        try {
            const r = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: text }) });
            if (!r.ok) throw new Error(`Server error: ${r.status}`);
            const data = await r.json();
            thinking.textContent = data.reply || 'لم يتم الحصول على رد.';
        } catch (err) {
            thinking.textContent = 'حدث خطأ في التواصل مع المساعد. الرجاء المحاولة مرة أخرى.';
            console.error(err);
        }
    });
}

function initLoginPage() {
    const btn = el('login-btn'); if (!btn) return;
    btn.addEventListener('click', () => {
        const email = el('login-email').value;
        if (!email) { alert('الرجاء إدخال البريد الإلكتروني.'); return; }
        alert('تم تسجيل الدخول بنجاح! (هذه واجهة تجريبية)');
        location.href = 'index.html';
    });
}

function initMapPage() {
    const statusEl = el('geo-status');
    const mapContainer = el('map-container');

    if (!statusEl || !mapContainer) return;

    statusEl.textContent = 'جاري طلب إذن تحديد الموقع...';
    mapContainer.innerHTML = `<div class="map-placeholder"><p>⏳</p><small>جاري تحميل الخريطة</small></div>`;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            statusEl.innerHTML = `تم تحديد موقعك بنجاح. <strong>خط العرض:</strong> ${latitude.toFixed(4)}, <strong>خط الطول:</strong> ${longitude.toFixed(4)}`;
            mapContainer.innerHTML = `<div class="map-placeholder"><p>📍</p><small>تم تحديد موقعك</small></div>`;
            // In a real app, you would initialize a map library here (e.g., Google Maps, Leaflet)
            // map.setView([latitude, longitude], 13);
        },
        (error) => {
            let errorMsg;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg = "تم رفض إذن تحديد الموقع.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg = "معلومات الموقع غير متاحة.";
                    break;
                case error.TIMEOUT:
                    errorMsg = "انتهت مهلة طلب تحديد الموقع.";
                    break;
                default:
                    errorMsg = "حدث خطأ غير معروف.";
                    break;
            }
            statusEl.textContent = `خطأ: ${errorMsg}`;
            mapContainer.innerHTML = `<div class="map-placeholder error"><p>⚠️</p><small>${errorMsg}</small></div>`;
        }
    );
}


// --- DOMContentLoaded Router ---
document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.split('/').pop() || 'index.html';

    // Run on all pages
    initAssistant();

    // Page-specific initializations
    if (path === 'index.html' || path === '') {
        initAnimatedStats();
    }
    if (path === 'projects.html') initProjectsPage();
    if (path === 'project.html') initProjectDetailPage();
    if (path === 'unit.html') initUnitPage();
    if (path === 'calculator.html') initCalculatorPage();
    if (path === 'contact.html') initContactPage();
    if (path === 'login.html') initLoginPage();
    if (path === 'map.html') initMapPage();
});