/* =========================================================
   VELOURA RESTAURANT — Interactivity
   ========================================================= */

/* ---------- LOADER ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 700);
});

/* ---------- AOS ---------- */
AOS.init({ duration: 900, once: true, offset: 80 });

/* ---------- CUSTOM CURSOR ---------- */
const cDot = document.querySelector('.cursor-dot');
const cRing = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`; });
(function animate() {
  rx += (mx - rx) * .15; ry += (my - ry) * .15;
  cRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animate);
})();
document.querySelectorAll('a, button, .menu-card, .gallery-item, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cRing.classList.add('grow'));
  el.addEventListener('mouseleave', () => cRing.classList.remove('grow'));
});

/* ---------- NAVBAR SCROLL ---------- */
const nav = document.getElementById('navbar');
const scrollBar = document.getElementById('scrollProgress');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (window.scrollY / h) * 100 + '%';
  scrollTopBtn.classList.toggle('show', window.scrollY > 500);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- MOBILE NAV ---------- */
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open')));

/* ---------- THEME TOGGLE ---------- */
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeBtn.innerHTML = document.body.classList.contains('light-mode')
    ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
});

/* ---------- TYPING HERO CURSOR (kept blinking, headline static for elegance) ---------- */

/* ---------- COUNTERS ---------- */
const counters = document.querySelectorAll('.count');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target; const target = +el.dataset.count;
      let cur = 0; const step = Math.max(1, Math.ceil(target / 80));
      const iv = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(iv); }
        el.textContent = cur.toLocaleString() + (target >= 1000 ? '+' : '');
      }, 20);
      counterObs.unobserve(el);
    }
  });
}, { threshold: .4 });
counters.forEach(c => counterObs.observe(c));

/* ---------- MENU DATA ---------- */
const MENU = [
  { c:'starters', n:'Truffle Arancini', d:'Saffron risotto orbs, black truffle, parmesan cream.', p:18, r:4.8, cal:320, t:15, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80' },
  { c:'starters', n:'Seared Scallops', d:'Diver scallops, cauliflower purée, brown butter.', p:26, r:4.9, cal:280, t:18, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1625944525533-473f1b3d9684?w=600&q=80' },
  { c:'starters', n:'Beef Tartare', d:'Hand-cut tenderloin, cured yolk, crisp shallot.', p:24, r:4.7, cal:340, t:12, veg:0, spicy:1, img:'https://images.unsplash.com/photo-1611489935767-70b76a25d8e5?w=600&q=80' },
  { c:'salads', n:'Heirloom Beet Salad', d:'Roasted beets, whipped goat cheese, pistachio.', p:16, r:4.6, cal:220, t:10, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80' },
  { c:'salads', n:'Caesar Élevé', d:'Baby gem, anchovy dressing, parmesan tuile.', p:15, r:4.5, cal:260, t:8, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80' },
  { c:'salads', n:'Burrata & Peach', d:'Creamy burrata, grilled peach, basil oil.', p:19, r:4.9, cal:290, t:10, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80' },
  { c:'pasta', n:'Handmade Tagliatelle', d:'Bolognese ragù, aged parmesan, herb oil.', p:28, r:4.8, cal:610, t:22, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80' },
  { c:'pasta', n:'Lobster Ravioli', d:'Maine lobster, saffron butter, chive.', p:38, r:4.9, cal:520, t:25, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=600&q=80' },
  { c:'pasta', n:'Truffle Cacio e Pepe', d:'Fresh spaghetti, pecorino, black truffle shavings.', p:32, r:4.9, cal:580, t:18, veg:1, spicy:1, img:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80' },
  { c:'pizza', n:'Margherita Nobile', d:'San Marzano, buffalo mozzarella, basil, evoo.', p:22, r:4.7, cal:640, t:14, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&q=80' },
  { c:'pizza', n:'Prosciutto & Fig', d:'Fig jam, prosciutto di Parma, arugula, balsamic.', p:26, r:4.8, cal:720, t:16, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80' },
  { c:'pizza', n:'Diavola Piccante', d:'Nduja sausage, hot honey, smoked mozzarella.', p:24, r:4.6, cal:760, t:15, veg:0, spicy:1, img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80' },
  { c:'main', n:'Filet Mignon Rossini', d:'Beef tenderloin, foie gras, madeira jus.', p:64, r:4.9, cal:820, t:28, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=600&q=80' },
  { c:'main', n:'Duck Confit à l\'Orange', d:'Slow-cooked duck leg, orange gastrique, potato pavé.', p:48, r:4.8, cal:720, t:35, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80' },
  { c:'main', n:'Herb Rack of Lamb', d:'Dijon crust, ratatouille, minted jus.', p:56, r:4.9, cal:780, t:32, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=600&q=80' },
  { c:'seafood', n:'Chilean Sea Bass', d:'Miso glaze, bok choy, ginger dashi.', p:52, r:4.9, cal:520, t:24, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80' },
  { c:'seafood', n:'Grilled Octopus', d:'Charred octopus, salsa verde, smoked paprika.', p:42, r:4.7, cal:410, t:22, veg:0, spicy:1, img:'https://images.unsplash.com/photo-1625944525533-473f1b3d9684?w=600&q=80' },
  { c:'seafood', n:'Lobster Thermidor', d:'Whole lobster, mustard cream, gruyère glaçage.', p:78, r:4.9, cal:690, t:30, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1559058789-672da06263d8?w=600&q=80' },
  { c:'chef', n:'Wagyu Symphony', d:'A5 wagyu, black truffle jus, marrow crumble.', p:128, r:5.0, cal:920, t:38, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' },
  { c:'chef', n:'Garden Reverie', d:'Ash-baked celeriac, hazelnut praline, herb oil.', p:72, r:4.8, cal:460, t:26, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80' },
  { c:'chef', n:'Ocean Whisper', d:'Line-caught turbot, caviar, sea-lettuce beurre blanc.', p:94, r:4.9, cal:540, t:28, veg:0, spicy:0, img:'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80' },
  { c:'desserts', n:'Crème Brûlée Vanille', d:'Tahitian vanilla, caramelized sugar crust.', p:14, r:4.9, cal:380, t:8, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=600&q=80' },
  { c:'desserts', n:'Dark Chocolate Fondant', d:'Warm 70% chocolate, salted caramel, vanilla ice.', p:16, r:5.0, cal:520, t:14, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80' },
  { c:'desserts', n:'Yuzu Cheesecake', d:'Japanese yuzu, mascarpone, matcha crumble.', p:15, r:4.8, cal:410, t:10, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80' },
  { c:'beverages', n:'Aged Bordeaux 2015', d:'Château Margaux — deep, structured, elegant.', p:42, r:5.0, cal:120, t:2, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80' },
  { c:'beverages', n:'Signature Old Fashioned', d:'Aged rye, house bitters, orange oils.', p:22, r:4.9, cal:180, t:5, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80' },
  { c:'beverages', n:'Elderflower Spritz', d:'Elderflower, prosecco, lime, mint.', p:18, r:4.7, cal:150, t:3, veg:1, spicy:0, img:'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80' },
];

/* ---------- STATE ---------- */
let wishlist = []; let cart = [];
let currentFilter = 'all'; let currentSearch = '';

/* ---------- RENDER MENU ---------- */
const grid = document.getElementById('menuGrid');
function renderMenu() {
  const filtered = MENU.filter(m =>
    (currentFilter === 'all' || m.c === currentFilter) &&
    (m.n.toLowerCase().includes(currentSearch) || m.d.toLowerCase().includes(currentSearch))
  );
  grid.innerHTML = filtered.map((m, i) => `
    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(i%3)*80}">
      <div class="menu-card">
        <div class="menu-img">
          <img loading="lazy" src="${m.img}" alt="${m.n}">
          <div class="menu-badges">
            <span class="${m.veg ? 'badge-veg' : 'badge-nonveg'}">${m.veg ? 'Veg' : 'Non-Veg'}</span>
            ${m.spicy ? '<span class="badge-spicy"><i class="fa-solid fa-pepper-hot"></i> Spicy</span>' : ''}
          </div>
          <button class="wishlist ${wishlist.find(w=>w.n===m.n) ? 'active':''}" data-name="${m.n}" aria-label="Wishlist"><i class="fa-solid fa-heart"></i></button>
        </div>
        <div class="menu-body">
          <div class="menu-head">
            <div><h4>${m.n}</h4><div class="rating">${'★'.repeat(Math.round(m.r))}<span style="color:var(--muted);font-size:.75rem;margin-left:6px;">${m.r}</span></div></div>
            <div class="menu-price">$${m.p}</div>
          </div>
          <p class="menu-desc">${m.d}</p>
          <div class="menu-meta">
            <span><i class="fa-solid fa-fire"></i>${m.cal} cal</span>
            <span><i class="fa-solid fa-clock"></i>${m.t} min</span>
          </div>
          <div class="menu-actions">
            <button class="btn-add" data-add="${m.n}"><i class="fa-solid fa-plus"></i> Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `).join('') || `<div class="col-12 center" style="padding:60px 0;color:var(--muted);">No dishes match your search.</div>`;
  AOS.refresh();
}
renderMenu();

/* ---------- FILTERS ---------- */
document.querySelectorAll('.filter-btn').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  currentFilter = b.dataset.filter;
  renderMenu();
}));
document.getElementById('menuSearch').addEventListener('input', e => {
  currentSearch = e.target.value.toLowerCase(); renderMenu();
});

/* ---------- MENU CLICKS (event delegation) ---------- */
grid.addEventListener('click', e => {
  const w = e.target.closest('.wishlist');
  const a = e.target.closest('.btn-add');
  if (w) toggleWish(w.dataset.name);
  if (a) addToCart(a.dataset.name);
});

/* ---------- WISH / CART ---------- */
function toggleWish(name) {
  const idx = wishlist.findIndex(w => w.n === name);
  if (idx > -1) { wishlist.splice(idx, 1); showToast('Removed from wishlist', 'fa-heart-crack'); }
  else { wishlist.push(MENU.find(m => m.n === name)); showToast('Added to wishlist', 'fa-heart'); }
  document.getElementById('wishCount').textContent = wishlist.length;
  renderWish(); renderMenu();
}
function addToCart(name) {
  const item = cart.find(c => c.n === name);
  if (item) item.q++; else cart.push({ ...MENU.find(m => m.n === name), q: 1 });
  showToast('Added to cart', 'fa-bag-shopping');
  updateCart();
}
function updateCart() {
  document.getElementById('cartCount').textContent = cart.reduce((s,c)=>s+c.q,0);
  renderCart();
}
function renderWish() {
  const body = document.getElementById('wishBody');
  if (!wishlist.length) return body.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">Your wishlist is empty.</p>';
  body.innerHTML = wishlist.map(w => `
    <div class="side-item">
      <img src="${w.img}" alt="${w.n}">
      <div class="info"><h6>${w.n}</h6><small>$${w.p}</small></div>
      <button class="rm" onclick="toggleWish('${w.n.replace(/'/g,"\\'")}')"><i class="fa-solid fa-xmark"></i></button>
    </div>`).join('');
}
function renderCart() {
  const body = document.getElementById('cartBody');
  if (!cart.length) { body.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 0;">Your cart is empty.</p>'; document.getElementById('cartTotal').textContent = '$0.00'; return; }
  body.innerHTML = cart.map(c => `
    <div class="side-item">
      <img src="${c.img}" alt="${c.n}">
      <div class="info"><h6>${c.n}</h6><small>$${c.p} × ${c.q}</small></div>
      <button class="rm" onclick="removeFromCart('${c.n.replace(/'/g,"\\'")}')"><i class="fa-solid fa-xmark"></i></button>
    </div>`).join('');
  document.getElementById('cartTotal').textContent = '$' + cart.reduce((s,c)=>s+c.p*c.q,0).toFixed(2);
}
function removeFromCart(name) { cart = cart.filter(c => c.n !== name); updateCart(); }
function checkout() { if (!cart.length) return showToast('Your cart is empty', 'fa-triangle-exclamation'); cart = []; updateCart(); closePanels(); showToast('Order placed. See you soon!', 'fa-circle-check'); }
window.removeFromCart = removeFromCart; window.toggleWish = toggleWish; window.checkout = checkout;

/* ---------- SIDE PANELS ---------- */
const overlay = document.getElementById('overlayBg');
document.getElementById('wishBtn').addEventListener('click', () => { renderWish(); document.getElementById('wishPanel').classList.add('open'); overlay.classList.add('show'); });
document.getElementById('cartBtn').addEventListener('click', () => { renderCart(); document.getElementById('cartPanel').classList.add('open'); overlay.classList.add('show'); });
function closePanels() {
  document.getElementById('wishPanel').classList.remove('open');
  document.getElementById('cartPanel').classList.remove('open');
  overlay.classList.remove('show');
}
window.closePanels = closePanels;

/* ---------- TESTIMONIALS ---------- */
const TESTI = [
  { n:'Sophia Bennett', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', r:5, d:'March 2026', t:'The tasting menu was pure poetry. Every course arrived with warmth, precision, and quiet joy. Undoubtedly the finest evening we\'ve had all year.' },
  { n:'James O\'Connor', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', r:5, d:'February 2026', t:'From the moment we walked in, Veloura felt like stepping into a private world. The wagyu was transcendent. The sommelier was a joy.' },
  { n:'Aisha Patel', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', r:5, d:'January 2026', t:'Celebrated our anniversary here — the team surprised us with a hand-written note. The details. The elegance. We will be back.' },
  { n:'Michael Zhang', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', r:5, d:'December 2025', t:'Chef Adrien came out to greet us and the entire meal felt like art. Every plate was intentional, refined, memorable.' },
  { n:'Elena Rodríguez', img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80', r:5, d:'November 2025', t:'A candlelit sanctuary of taste. The lobster ravioli made me speechless. The Yuzu cheesecake still haunts my dreams.' },
  { n:'David Whitmore', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', r:5, d:'November 2025', t:'The chef\'s table is worth every dollar. Nine courses of storytelling, precision, and hospitality that felt genuinely personal.' },
  { n:'Priya Kapoor', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', r:5, d:'October 2025', t:'Beautifully vegetarian-friendly. Garden Reverie is one of the best plates I have ever eaten. Warm, seasonal, thoughtful.' },
  { n:'Nathaniel Brooks', img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80', r:5, d:'September 2025', t:'The ambience alone deserves a review. Add flawless service and stunning food and you have a genuinely world-class restaurant.' },
];
document.getElementById('testiTrack').innerHTML = TESTI.map(t => `
  <div class="testi-card">
    <i class="fa-solid fa-quote-left testi-quote"></i>
    <p>${t.t}</p>
    <div class="rating">${'★'.repeat(t.r)}</div>
    <div class="testi-user">
      <img src="${t.img}" alt="${t.n}">
      <div><h6>${t.n}</h6><small>${t.d}</small></div>
    </div>
  </div>
`).join('');

/* ---------- FAQ ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
});

/* ---------- RESERVATION FORM ---------- */
document.getElementById('reserveForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Reservation confirmed. À bientôt!', 'fa-champagne-glasses');
  e.target.reset();
});

/* ---------- RIPPLE BUTTONS ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-luxury, .btn-add, .filter-btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const r = document.createElement('span');
  r.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  r.style.width = r.style.height = size + 'px';
  r.style.left = (e.clientX - rect.left - size/2) + 'px';
  r.style.top = (e.clientY - rect.top - size/2) + 'px';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 700);
});

/* ---------- TOAST ---------- */
function showToast(msg, icon='fa-check-circle') {
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast-lux';
  t.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(120%)'; }, 2600);
  setTimeout(() => t.remove(), 3200);
}
window.showToast = showToast;

/* ---------- PARALLAX FLOATING ICONS ---------- */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - .5) * 20;
  const y = (e.clientY / window.innerHeight - .5) * 20;
  document.querySelectorAll('.floating').forEach((el, i) => {
    el.style.marginLeft = (x * (i%2 ? 1 : -1)) + 'px';
    el.style.marginTop = (y * (i%2 ? -1 : 1)) + 'px';
  });
});
