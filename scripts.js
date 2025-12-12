// --- Helpers ---
function el(id) { return document.getElementById(id); }
function createEl(tag, cls) { const d = document.createElement(tag); if (cls) d.className = cls; return d; }

// --- Load Projects from JSON ---
let PROJECTS = [];
let UNITS = [];

async function loadProjects() {
  try {
    const response = await fetch('/projects');
    const files = await response.json();
    PROJECTS = files.map(file => ({
      id: file.id,
      name: file.nameAr,
      city: file.location,
      units: (file.units && file.units.count) || 100,
      images: file.images || ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=60']
    }));
  } catch (error) {
    console.error('Error loading projects:', error);
    PROJECTS = [];
  }
}

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
      let filteredProjects = PROJECTS;
      if (city) {
        filteredProjects = filteredProjects.filter(p => p.city.toLowerCase().includes(city));
      }
      renderProjects(filteredProjects);
    });
  }
}

function initProjectDetailPage() {
  const title = el('project-title'); if (!title) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || (PROJECTS[0] && PROJECTS[0].id);
  const project = PROJECTS.find(x => x.id === id) || PROJECTS[0];
  if (!project) return;
  title.textContent = project.name;
  el('project-meta').textContent = `${project.city} • ${project.units} وحدة متاحة`;
  const mainImage = el('gallery-main-image');
  const thumbnailsContainer = el('gallery-thumbnails');
  if (mainImage && thumbnailsContainer && project.images) {
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
document.addEventListener('DOMContentLoaded', async () => {
  await loadProjects();
  const path = location.pathname.split('/').pop() || 'index.html';
  // Run on all pages
  initAssistant();
  // Page-specific initializations
  if (path === 'index.html' || path === '') {
    initAnimatedStats();
  }
  if (path === 'projects.html') initProjectsPage();
  if (path === 'project.html') initProjectDetailPage();
  if (path === 'contact.html') initContactPage();
  if (path === 'login.html') initLoginPage();
  if (path === 'map.html') initMapPage();
});
