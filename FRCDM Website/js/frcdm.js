/* FRCDM Production — app logic (V1 C features, V1 G layout) */
const CATEGORIES = [
  { key: 'sadya', name: "Today's Sadya", color: '#e8a72e', img: 'sadyatile' },
  { key: 'curries', name: 'Curries & Fry', color: '#ff5a36', img: 'curriestile' },
  { key: 'breads', name: 'Breads', color: '#5f9a55', img: 'breadstile' },
  { key: 'sweets', name: 'Sweets & Chai', color: '#9162a5', img: 'sweetstile' },
  { key: 'beverages', name: 'Beverages', color: '#218c8e', img: 'beveragestile' },
  { key: 'starters', name: 'Starters & Snacks', color: '#d77a2e', img: 'starterstile' }
];

const ITEMS = [
  { id: 1, cat: 'sadya', name: 'Onam Sadya Thali', desc: 'Rice, sambar, avial, thoran, pachadi, payasam', price: 220, veg: true, best: true },
  { id: 2, cat: 'sadya', name: 'Curd Rice Bowl', desc: 'Ginger and curry leaf tempering', price: 90, veg: true },
  { id: 11, cat: 'sadya', name: 'Pulissery', desc: 'Yogurt curry with mangoes', price: 120, veg: true },
  { id: 12, cat: 'sadya', name: 'Pappadam', desc: 'Crispy lentil wafers', price: 15, veg: true },
  { id: 20, cat: 'sadya', name: 'Avial', desc: 'Mixed vegetables in coconut', price: 110, veg: true, best: true },
  { id: 3, cat: 'curries', name: 'Fish Moilee', desc: 'Kingfish in coconut milk, curry leaves', price: 260, veg: false, best: true },
  { id: 4, cat: 'curries', name: 'Beef Ularthiyathu', desc: 'Slow-roasted with coconut slivers', price: 240, veg: false, best: true },
  { id: 5, cat: 'curries', name: 'Kappa Puzhukku', desc: 'Mashed tapioca, mustard tempering', price: 110, veg: true },
  { id: 6, cat: 'curries', name: 'Prawn Roast', desc: 'Kerala-style, dry roasted masala', price: 280, veg: false },
  { id: 13, cat: 'curries', name: 'Chicken Curry', desc: 'Kerala-style with coconut', price: 200, veg: false, best: true },
  { id: 14, cat: 'curries', name: 'Vegetable Stew', desc: 'Seasonal veggies in coconut milk', price: 160, veg: true },
  { id: 19, cat: 'curries', name: 'Mutton Chops', desc: 'Spicy fried mutton ribs', price: 350, veg: false, best: true },
  { id: 7, cat: 'breads', name: 'Kerala Parotta', desc: 'Layered, flaky, made fresh', price: 25, veg: true },
  { id: 8, cat: 'breads', name: 'Appam', desc: 'Set of 2, soft centre, lace edges', price: 40, veg: true, best: true },
  { id: 15, cat: 'breads', name: 'Malabar Parotta', desc: 'Flaky, soft, made with maida', price: 30, veg: true },
  { id: 16, cat: 'breads', name: 'Kallappam', desc: 'Fermented rice pancake', price: 45, veg: true },
  { id: 9, cat: 'sweets', name: 'Ada Pradhaman', desc: 'Rice ada in jaggery-coconut milk', price: 80, veg: true, best: true },
  { id: 10, cat: 'sweets', name: 'Sulaimani Chai', desc: 'Black tea, lemon, spices', price: 30, veg: true },
  { id: 17, cat: 'sweets', name: 'Unniyappam', desc: 'Fried rice jaggery snack', price: 50, veg: true },
  { id: 18, cat: 'sweets', name: 'Chai Karak', desc: 'Strong tea with spices', price: 25, veg: true },
  { id: 21, cat: 'sweets', name: 'Falooda', desc: 'Vermicelli dessert with ice-cream', price: 90, veg: true, best: true },
  { id: 22, cat: 'beverages', name: 'Fresh Lime Soda', desc: 'Sparkling lime with mint', price: 60, veg: true },
  { id: 23, cat: 'beverages', name: 'Tender Coconut Water', desc: 'Natural and refreshing', price: 80, veg: true },
  { id: 24, cat: 'beverages', name: 'Mango Lassi', desc: 'Sweet mango yoghurt drink', price: 70, veg: true, best: true },
  { id: 25, cat: 'starters', name: 'Chicken 65', desc: 'Spicy deep-fried chicken', price: 220, veg: false, best: true },
  { id: 26, cat: 'starters', name: 'Gobi Manchurian', desc: 'Crispy cauliflower in Chinese sauce', price: 160, veg: true },
  { id: 27, cat: 'starters', name: 'Prawns Fry', desc: 'Butter-garlic tossed prawns', price: 280, veg: false, best: true }
];

const OFFERS = [
  { name: 'Weekend Special', discount: '20%', desc: '20% off on all curries', validTill: '31 Aug 2026' },
  { name: 'BOGO on Appam', discount: 'BOGO', desc: 'Buy 1 Get 1 free on Appam', validTill: '15 Jul 2026' },
  { name: 'Diwali Feast', discount: '25%', desc: '25% off on your entire order', validTill: '31 Oct 2026' },
  { name: 'Happy Hour', discount: '₹50', desc: '₹50 off on all beverages', validTill: '30 Jul 2026' },
  { name: 'Student Discount', discount: '15%', desc: '15% off with valid ID', validTill: '31 Dec 2026' }
];

const COUPONS = [
  { code: 'FEAST30', discount: '30% off', validTill: '31 Dec 2026' },
  { code: 'WELCOME15', discount: '15% off', validTill: '15 Aug 2026' },
  { code: 'SUMMER10', discount: '₹10 off', validTill: '30 Jun 2026' }
];

let REVIEWS = [
  { customer: 'Anand Krishnan', rating: 5, text: 'Authentic Kerala taste! The Sadya was divine.', date: '12 Jul 2026' },
  { customer: 'Meera Nair', rating: 4, text: 'Fish Moilee was superb. Will come again.', date: '11 Jul 2026' },
  { customer: 'Suresh Kumar', rating: 5, text: 'Best restaurant in Kochi. Highly recommend.', date: '10 Jul 2026' },
  { customer: 'Lakshmi Menon', rating: 3, text: 'Good food but service was a bit slow.', date: '9 Jul 2026' },
  { customer: 'Vikram Shah', rating: 5, text: 'The Karimeen Pollichathu is a must-try!', date: '8 Jul 2026' },
  { customer: 'Rahul Menon', rating: 5, text: 'Incredible flavors. Felt like home.', date: '7 Jul 2026' },
  { customer: 'Priya Krishnan', rating: 4, text: 'Good portion sizes and reasonable prices.', date: '6 Jul 2026' },
  { customer: 'Deepak Nair', rating: 3, text: 'Curry was a bit too spicy for me.', date: '5 Jul 2026' },
  { customer: 'Sneha Raj', rating: 5, text: 'The traditional sweets are amazing!', date: '4 Jul 2026' },
  { customer: 'Mohan Lal', rating: 4, text: 'Great ambiance and friendly staff.', date: '3 Jul 2026' },
  { customer: 'Anjali Nair', rating: 5, text: 'My favorite place in town!', date: '2 Jul 2026' },
  { customer: 'Vijay Kumar', rating: 4, text: 'Quick delivery and hot food.', date: '1 Jul 2026' },
  { customer: 'Sara Thomas', rating: 5, text: 'The seafood platter is a feast!', date: '30 Jun 2026' },
  { customer: 'Rajesh Nair', rating: 4, text: 'Good value for money.', date: '29 Jun 2026' },
  { customer: 'Anita Pillai', rating: 5, text: 'Loved the traditional Kerala vibe.', date: '28 Jun 2026' },
  { customer: 'John Varghese', rating: 4, text: 'Will definitely come back.', date: '27 Jun 2026' },
  { customer: 'Meera Krishnan', rating: 5, text: 'The appam and stew are heavenly.', date: '26 Jun 2026' },
  { customer: 'Deepak Raj', rating: 3, text: 'Bit crowded but food made up for it.', date: '25 Jun 2026' },
  { customer: 'Priya Nair', rating: 5, text: 'Excellent service and food.', date: '24 Jun 2026' },
  { customer: 'Ajith Kumar', rating: 4, text: 'Consistently good.', date: '23 Jun 2026' }
];

let ADDRESSES = [
  { id: 1, label: 'Home', address: '123 Main St, Apt 4B, Kochi' },
  { id: 2, label: 'Work', address: 'Infopark, Phase 2, Kochi' }
];

const PAYMENTS = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/26' },
  { id: 2, type: 'UPI', upi: 'anjali@upi' }
];

const TABLES = [
  { id: 1, name: 'A-01', status: 'available' },
  { id: 2, name: 'A-02', status: 'occupied' },
  { id: 3, name: 'A-03', status: 'reserved' },
  { id: 4, name: 'B-01', status: 'available' },
  { id: 5, name: 'B-02', status: 'available' },
  { id: 6, name: 'C-01', status: 'available' }
];

const NOTIFICATIONS = [
  { icon: '✅', msg: 'Your order #ORD-2607-1234 has been delivered.', time: '2 hours ago' },
  { icon: '🔥', msg: 'Weekend Special: 20% off all curries!', time: '5 hours ago' },
  { icon: '⏳', msg: 'Your order #ORD-2607-1235 is being prepared.', time: '1 day ago' },
  { icon: '🎉', msg: 'Welcome to Malabar Table! Enjoy your meal.', time: '2 days ago' }
];

let cart = {};
let fulfilType = 'delivery';
let detailQty = 1;
let currentDetailItem = null;
let favourites = JSON.parse(localStorage.getItem('malabar_favs') || '[]');
let currentLang = 'en';
let appliedCoupon = null;
let selectedTableId = null;
let currentSearch = '';
let currentSlide = 0;

const img = (seed, w = 400, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const findItem = (id) => ITEMS.find((x) => x.id === id);
const money = (n) => '₹' + Math.round(n);
const isFavourite = (id) => favourites.includes(id);

function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartTotal() {
  return Object.entries(cart).reduce((s, [id, q]) => s + findItem(+id).price * q, 0);
}
function discountAmount() {
  if (!appliedCoupon) return 0;
  const t = cartTotal();
  if (appliedCoupon.discount.includes('%')) {
    return Math.min(t, (t * parseFloat(appliedCoupon.discount)) / 100);
  }
  return Math.min(t, parseFloat(appliedCoupon.discount.replace('₹', '').replace(' off', '').trim()));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

function goHome() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function goToMenu() {
  document.getElementById('menuSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function scrollToCat(key) {
  const el = document.getElementById('cat-' + key);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  else goToMenu();
  document.querySelectorAll('.cat-pill').forEach((p) => p.classList.toggle('active', p.dataset.cat === key));
}
function setNav(el) {
  document.querySelectorAll('.nav-item').forEach((x) => x.classList.remove('active'));
  el.classList.add('active');
}

function renderOffers() {
  document.getElementById('offersCarousel').innerHTML = OFFERS.map((o) => `
    <article class="offer">
      <span class="hot-badge">🔥 HOT</span>
      <div class="discount">${o.discount}</div>
      <h3>${o.name}</h3>
      <p>${o.desc}</p>
      <div class="offer-foot">
        <span class="valid">Valid till ${o.validTill}</span>
        <button type="button" onclick="showToast('Offer selected: ${o.name}')">Claim</button>
      </div>
    </article>
  `).join('');
}

function renderOffersGrid() {
  const el = document.getElementById('offersAllGrid');
  if (!el) return;
  el.innerHTML = OFFERS.map((o) => `
    <article class="offer" style="min-width:0">
      <div class="discount">${o.discount}</div>
      <h3>${o.name}</h3>
      <p>${o.desc}<br>Valid till ${o.validTill}</p>
      <div class="offer-foot"><span></span><button type="button" onclick="showToast('Offer claimed')">Claim</button></div>
    </article>
  `).join('');
}

function renderBento() {
  document.getElementById('bentoGrid').innerHTML = CATEGORIES.map((c) => `
    <div class="bento-tile" onclick="scrollToCat('${c.key}')">
      <img src="${img(c.img, 400, 300)}" alt="${c.name}" loading="lazy">
      <div class="bento-scrim"></div>
      <div class="bento-count">${ITEMS.filter((i) => i.cat === c.key).length} items</div>
      <div class="bento-chip"><span class="swatch" style="background:${c.color}"></span>${c.name}</div>
    </div>
  `).join('');
}

function renderBest() {
  const bestItems = ITEMS.filter((i) => i.best);
  document.getElementById('bestRow').innerHTML = bestItems.map((it) => `
    <div class="best-card" onclick="openDetail(${it.id})">
      <div class="best-photo">
        <img src="${img('item' + it.id, 220, 220)}" alt="${it.name}" loading="lazy">
        <button type="button" class="best-add" aria-label="Add ${it.name}" onclick="event.stopPropagation();addItem(${it.id})">+</button>
      </div>
      <div class="best-name">${it.name}</div>
      <div class="best-price">${money(it.price)}</div>
    </div>
  `).join('');
}

function renderBestsellerGrid() {
  const el = document.getElementById('bestsellerGrid');
  if (!el) return;
  el.innerHTML = ITEMS.filter((i) => i.best).map((it) => `
    <div class="best-item" onclick="openDetail(${it.id})">
      <div class="img-wrap">
        <img src="${img('item' + it.id, 220, 220)}" alt="${it.name}" loading="lazy">
        <button type="button" class="best-add" aria-label="Add ${it.name}" onclick="event.stopPropagation();addItem(${it.id})">+</button>
      </div>
      <div class="best-name">${it.name}</div>
      <div class="best-price">${money(it.price)}</div>
    </div>
  `).join('');
}

function renderCategoryNav() {
  document.getElementById('categoryNav').innerHTML =
    `<button type="button" class="cat-pill active" data-cat="all" onclick="filterCategory('all', this)">All</button>` +
    CATEGORIES.map((c) =>
      `<button type="button" class="cat-pill" data-cat="${c.key}" onclick="scrollToCat('${c.key}')">${c.name}</button>`
    ).join('');
}

function itemCardHtml(it) {
  const q = cart[it.id] || 0;
  const fav = isFavourite(it.id);
  return `
    <article class="item-card" onclick="openDetail(${it.id})">
      <div class="item-photo">
        <img src="${img('item-' + it.id, 200, 200)}" alt="${it.name}" loading="lazy">
        <span class="veg ${it.veg ? '' : 'nonveg'}"><i></i></span>
        <button type="button" class="fav-mini" style="color:${fav ? 'var(--accent)' : 'var(--muted)'}"
          onclick="event.stopPropagation();toggleFavourite(${it.id})">${fav ? '♥' : '♡'}</button>
      </div>
      <div class="item-body">
        <div>
          <div class="item-name">${it.name}</div>
          <div class="item-desc">${it.desc}</div>
        </div>
        <div class="item-bottom">
          <span class="price">${money(it.price)}</span>
          ${q
            ? `<div class="qty" onclick="event.stopPropagation()">
                <button type="button" onclick="removeItem(${it.id})">−</button><span>${q}</span>
                <button type="button" onclick="addItem(${it.id})">+</button>
              </div>`
            : `<button type="button" class="add-pill" onclick="event.stopPropagation();addItem(${it.id})">+ Add</button>`}
        </div>
      </div>
    </article>`;
}

function renderCategorySections(filter = '') {
  currentSearch = filter;
  const term = filter.toLowerCase().trim();
  const filtered = term
    ? ITEMS.filter((i) => `${i.name} ${i.desc} ${i.cat}`.toLowerCase().includes(term))
    : ITEMS;
  const container = document.getElementById('categorySections');
  const countEl = document.getElementById('resultCount');
  countEl.textContent = `${filtered.length} items`;

  if (!filtered.length) {
    container.innerHTML = '<div class="no-results">No dishes match your search.</div>';
    return;
  }

  container.innerHTML = CATEGORIES.map((c) => {
    const items = filtered.filter((i) => i.cat === c.key);
    if (!items.length) return '';
    return `
      <div id="cat-${c.key}" class="category-section">
        <div class="category-label">
          <span class="swatch" style="background:${c.color}"></span>
          <h3>${c.name}</h3>
        </div>
        <div class="item-grid">${items.map(itemCardHtml).join('')}</div>
      </div>`;
  }).join('');
}

function renderMenuAll() {
  const el = document.getElementById('menuAllList');
  if (!el) return;
  el.innerHTML = ITEMS.map((it) => `
    <div class="menu-all-item" onclick="openDetail(${it.id})">
      <img src="${img('item-' + it.id, 120, 120)}" alt="${it.name}">
      <div class="info">
        <div class="item-name">${it.name}</div>
        <span class="cat-tag">${CATEGORIES.find((c) => c.key === it.cat)?.name || it.cat}</span>
      </div>
      <div class="price-add">
        <span class="price">${money(it.price)}</span>
        <button type="button" class="add-btn" onclick="event.stopPropagation();addItem(${it.id})">Add</button>
      </div>
    </div>
  `).join('');
}

function renderCartLines(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const count = cartCount();
  if (!count) {
    el.innerHTML = '<div class="cart-empty">Your order is empty.<br><br>Tap + on a dish to get started.</div>';
    return;
  }
  el.innerHTML = Object.entries(cart).map(([id, q]) => {
    const it = findItem(+id);
    const interactive = targetId === 'sheetCartLines';
    return `
      <div class="cart-line">
        <img src="${img('item-' + id, 120, 120)}" alt="${it.name}">
        <div class="cart-info">
          <div class="cart-name">${it.name}</div>
          <div class="cart-price">${interactive ? money(it.price) + ' each' : q + ' × ' + money(it.price)}</div>
        </div>
        ${interactive
          ? `<div class="qty"><button type="button" onclick="removeItem(${id})">−</button><span>${q}</span><button type="button" onclick="addItem(${id})">+</button></div>`
          : ''}
        <div class="cart-total">${money(it.price * q)}</div>
      </div>`;
  }).join('');
}

function updateCartUI() {
  const count = cartCount();
  const sub = cartTotal();
  const disc = discountAmount();
  const total = sub - disc;

  ['topBadge', 'tabBadge'].forEach((id) => {
    const el = document.getElementById(id);
    el.textContent = count;
    el.classList.toggle('hidden', !count);
  });

  document.getElementById('cartCountLabel').textContent = `${count} item${count === 1 ? '' : 's'}`;
  document.getElementById('desktopSubtotal').textContent = money(sub);
  document.getElementById('desktopTotal').textContent = money(total);
  document.getElementById('desktopCheckout').disabled = !count;
  document.getElementById('desktopDiscountRow').style.display = disc ? 'flex' : 'none';
  document.getElementById('desktopDiscount').textContent = '-' + money(disc);

  const sheetIds = [
    ['sheetSubtotal', sub], ['sheetTotal', total], ['checkoutTotal', total],
    ['checkSubtotal', sub]
  ];
  sheetIds.forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = money(val);
  });
  ['sheetDiscountRow', 'checkDiscountRow'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = disc ? 'flex' : 'none';
  });
  ['sheetDiscount', 'checkDiscountVal'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = '-' + money(disc);
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.disabled = !count;

  renderCartLines('desktopCart');
  renderCartLines('sheetCartLines');
  renderCategorySections(currentSearch);
}

function addItem(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  showToast(`${findItem(id).name} added to your order`);
}
function removeItem(id) {
  if (!cart[id]) return;
  cart[id]--;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
}

function handleSearch(e) {
  const v = e.target.value;
  document.getElementById('clearSearch').style.display = v ? 'block' : 'none';
  renderCategorySections(v);
}
function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearSearch').style.display = 'none';
  renderCategorySections('');
}
function filterCategory(cat, el) {
  document.querySelectorAll('.cat-pill').forEach((x) => x.classList.remove('active'));
  if (el) el.classList.add('active');
  if (cat === 'all') goToMenu();
  else scrollToCat(cat);
}

function applyCouponFrom(inputId) {
  const code = document.getElementById(inputId).value.trim().toUpperCase();
  const msgEl = document.getElementById('couponMessage');
  const c = COUPONS.find((x) => x.code === code);
  if (!c) {
    appliedCoupon = null;
    if (msgEl) msgEl.innerHTML = '<span style="color:#c63c2c">Invalid coupon code</span>';
    showToast('Invalid coupon code');
    updateCartUI();
    return;
  }
  appliedCoupon = c;
  const disc = discountAmount();
  if (msgEl) msgEl.innerHTML = `<span style="color:var(--success)">Coupon applied! -${money(disc)}</span>`;
  showToast(`Coupon applied: ${c.discount}`);
  updateCartUI();
}

function clearCoupon() {
  appliedCoupon = null;
  const msgEl = document.getElementById('couponMessage');
  if (msgEl) msgEl.innerHTML = '';
  ['desktopCoupon', 'couponInput'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  updateCartUI();
}

function toggleFavourite(id) {
  if (!id) return;
  const idx = favourites.indexOf(id);
  if (idx > -1) favourites.splice(idx, 1);
  else favourites.push(id);
  localStorage.setItem('malabar_favs', JSON.stringify(favourites));
  updateFavUI();
  renderCategorySections(currentSearch);
  renderBest();
  renderBestsellerGrid();
  if (currentDetailItem?.id === id) {
    const btn = document.getElementById('detailFavBtn');
    if (btn) {
      btn.textContent = isFavourite(id) ? '♥' : '♡';
      btn.classList.toggle('active', isFavourite(id));
    }
  }
}

function updateFavUI() {
  const favIcon = document.getElementById('favIcon');
  if (favIcon) {
    favIcon.textContent = favourites.length ? '♥' : '♡';
    favIcon.style.color = favourites.length ? 'var(--accent)' : '';
  }
  if (document.getElementById('favouritesView')?.style.display !== 'none') renderFavourites();
}

function renderFavourites() {
  const el = document.getElementById('favList');
  if (!el) return;
  if (!favourites.length) {
    el.innerHTML = '<div class="sheet-empty">No favourites yet.</div>';
    return;
  }
  el.innerHTML = favourites.map((id) => {
    const it = findItem(id);
    if (!it) return '';
    return `
      <div class="fav-item">
        <img src="${img('item-' + it.id, 120, 120)}" alt="${it.name}">
        <div class="cart-info"><div class="cart-name">${it.name}</div><div class="cart-price">${money(it.price)}</div></div>
        <button type="button" class="fav-remove" onclick="toggleFavourite(${it.id})">✕</button>
      </div>`;
  }).join('');
}

function renderNotifications() {
  const el = document.getElementById('notifList');
  if (!el) return;
  el.innerHTML = NOTIFICATIONS.map((n) => `
    <div class="notif-item">
      <div class="icon">${n.icon}</div>
      <div class="msg">${n.msg}</div>
      <div class="time">${n.time}</div>
    </div>
  `).join('');
}

function renderOrdersHistory() {
  const el = document.getElementById('ordersList');
  if (!el) return;
  const orders = [
    { id: 'ORD-2607-1234', date: '12 Jul 2026', items: 2, total: 919, status: 'delivered' },
    { id: 'ORD-2607-1235', date: '11 Jul 2026', items: 1, total: 260, status: 'preparing' },
    { id: 'ORD-2607-1236', date: '10 Jul 2026', items: 3, total: 440, status: 'cancelled' }
  ];
  el.innerHTML = orders.map((o) => `
    <div style="padding:12px 0;border-bottom:1px solid var(--line)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
        <strong>${o.id}</strong>
        <span class="order-status ${o.status}">${o.status}</span>
      </div>
      <div class="row-sub" style="margin-top:4px">${o.date} · ${o.items} items · ${money(o.total)}</div>
      ${o.status === 'delivered' ? `<button type="button" class="add-btn" style="margin-top:8px" onclick="openWriteReview()">Write Review</button>` : ''}
    </div>
  `).join('');
}

function renderAddresses() {
  const el = document.getElementById('addressesList');
  if (!el) return;
  el.innerHTML = ADDRESSES.map((a) => `
    <div class="address-card">
      <div><strong>${a.label}</strong><br><span style="font-size:13px;color:var(--muted)">${a.address}</span></div>
      <div style="display:flex;gap:8px">
        <button type="button" onclick="editAddress(${a.id})" aria-label="Edit">✎</button>
        <button type="button" onclick="deleteAddress(${a.id})" aria-label="Delete">✕</button>
      </div>
    </div>
  `).join('') + `<button type="button" class="cta" style="margin-top:12px;background:var(--success)" onclick="openAddAddress()">Add Address</button>`;
}

function renderPayments() {
  const el = document.getElementById('paymentsList');
  if (!el) return;
  el.innerHTML = PAYMENTS.map((p) => `
    <div class="address-card">
      <div><strong>${p.type}</strong><br><span style="font-size:13px;color:var(--muted)">${p.last4 ? '**** ' + p.last4 + ' · Exp ' + p.expiry : p.upi}</span></div>
    </div>
  `).join('');
}

function renderTablesForBooking() {
  const el = document.getElementById('tableSelectGrid');
  if (!el) return;
  el.innerHTML = TABLES.map((t) => `
    <button type="button" class="table-option ${t.status !== 'available' ? 'reserved' : ''} ${selectedTableId === t.id ? 'selected' : ''}"
      ${t.status === 'available' ? `onclick="selectTable(${t.id})"` : 'disabled'}>
      ${t.name}<br><small>${t.status}</small>
    </button>
  `).join('');
}

const SHEET_VIEWS = [
  'cartView', 'checkoutView', 'confirmView', 'trackView', 'detailView',
  'favouritesView', 'notificationsView', 'profileView', 'contactView', 'qrView',
  'ordersView', 'addressesView', 'paymentsView', 'settingsView', 'restaurantView',
  'bestsellersView', 'menuAllView', 'offersView', 'tableBookingView', 'writeReviewView'
];

function openSheet(view) {
  document.body.classList.add('no-scroll');
  document.getElementById('overlay').classList.add('show');
  document.getElementById('sheet').classList.add('show');

  if (view === 'detail' && currentDetailItem) populateDetail(currentDetailItem);
  else if (view === 'cart') updateCartUI();
  else if (view === 'checkout') updateCartUI();
  else if (view === 'favourites') renderFavourites();
  else if (view === 'notifications') renderNotifications();
  else if (view === 'bestsellers') renderBestsellerGrid();
  else if (view === 'menuall') renderMenuAll();
  else if (view === 'offers') renderOffersGrid();
  else if (view === 'orders') renderOrdersHistory();
  else if (view === 'addresses') renderAddresses();
  else if (view === 'payments') renderPayments();
  else if (view === 'tableBooking') renderTablesForBooking();
  else if (view === 'writeReview') resetReviewStars();

  const map = {
    cart: 'cartView', checkout: 'checkoutView', confirm: 'confirmView', track: 'trackView',
    detail: 'detailView', favourites: 'favouritesView', notifications: 'notificationsView',
    profile: 'profileView', contact: 'contactView', qr: 'qrView', orders: 'ordersView',
    addresses: 'addressesView', payments: 'paymentsView', settings: 'settingsView',
    restaurant: 'restaurantView', bestsellers: 'bestsellersView', menuall: 'menuAllView',
    offers: 'offersView', tableBooking: 'tableBookingView', writeReview: 'writeReviewView'
  };

  SHEET_VIEWS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById(map[view]);
  if (target) target.style.display = 'flex';
  target?.style.setProperty('flex-direction', 'column');
  target?.style.setProperty('height', '100%');
  target?.style.setProperty('min-height', '0');
}

function closeSheet() {
  document.body.classList.remove('no-scroll');
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('sheet').classList.remove('show');
}

function showCheckout() {
  openSheet('checkout');
}

function setFulfil(type) {
  fulfilType = type;
  document.getElementById('optDelivery')?.classList.toggle('active', type === 'delivery');
  document.getElementById('optPickup')?.classList.toggle('active', type === 'pickup');
  const a = document.getElementById('addressField');
  if (a) a.style.display = type === 'pickup' ? 'none' : 'block';
}

function openDetail(id) {
  const it = findItem(id);
  if (!it) return;
  currentDetailItem = it;
  detailQty = 1;
  openSheet('detail');
}

function populateDetail(it) {
  document.getElementById('detailImg').src = img('item-' + it.id, 900, 700);
  document.getElementById('detailName').textContent = it.name;
  document.getElementById('detailDesc').textContent = it.desc;
  document.getElementById('detailPrice').textContent = money(it.price);
  document.getElementById('detailTitle').textContent = it.name;
  document.getElementById('detailQty').textContent = '1';
  const favBtn = document.getElementById('detailFavBtn');
  favBtn.textContent = isFavourite(it.id) ? '♥' : '♡';
  favBtn.classList.toggle('active', isFavourite(it.id));
  document.getElementById('productReviews').innerHTML = `
    <div style="font-weight:800;margin-bottom:8px;">Reviews (${REVIEWS.length})</div>
    ${REVIEWS.map((r) => `
      <div style="font-size:13px;padding:8px 0;border-bottom:1px solid var(--line)">
        <strong>${r.customer}</strong> ${'★'.repeat(r.rating)}<br>${r.text}
      </div>`).join('')}`;
}

function changeDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  document.getElementById('detailQty').textContent = detailQty;
}

function addDetailToCart() {
  if (!currentDetailItem) return;
  cart[currentDetailItem.id] = (cart[currentDetailItem.id] || 0) + detailQty;
  updateCartUI();
  showToast(`${currentDetailItem.name} added to cart`);
  closeSheet();
}

function placeOrder() {
  const name = document.getElementById('custName')?.value.trim() || 'Guest';
  const phone = document.getElementById('custPhone')?.value.trim() || '';
  const address = document.getElementById('custAddress')?.value.trim() || '';
  const total = cartTotal() - discountAmount();
  const orderNo = 'ORD-2607-' + Math.floor(1000 + Math.random() * 9000);
  const lines = Object.entries(cart).map(([id, q]) => {
    const it = findItem(+id);
    return `${q} x ${it.name} - ${money(it.price * q)}`;
  }).join('\n');
  const msg = `Hi Malabar Table, confirming order ${orderNo}\n\n${lines}\n\nTotal: ${money(total)}\nName: ${name}${phone ? '\nPhone: ' + phone : ''}\n${fulfilType === 'delivery' ? 'Deliver to: ' + address : 'Pickup at store'}`;
  document.getElementById('waLink').href = 'https://wa.me/919847000000?text=' + encodeURIComponent(msg);
  document.getElementById('orderNo').textContent = orderNo;
  document.getElementById('trackOrderId').textContent = orderNo.slice(-4);
  document.getElementById('trackSummary').innerHTML = lines.replace(/\n/g, '<br>') + `<br><strong>Total: ${money(total)}</strong>`;
  clearCoupon();
  openSheet('confirm');
}

function showTracking() { openSheet('track'); }

function cancelOrder() {
  if (confirm('Cancel this order?')) {
    showToast('Order cancelled');
    closeSheet();
  }
}

function selectTable(id) {
  if (TABLES.find((t) => t.id === id)?.status !== 'available') return;
  selectedTableId = id;
  renderTablesForBooking();
}

function bookTable() {
  if (!selectedTableId) { showToast('Please select a table'); return; }
  const date = document.getElementById('bookingDate')?.value;
  const time = document.getElementById('bookingTime')?.value;
  const people = document.getElementById('bookingPeople')?.value;
  const table = TABLES.find((t) => t.id === selectedTableId)?.name || '';
  showToast(`Table ${table} booked for ${people} on ${date} at ${time}`);
  closeSheet();
}

function editAddress(id) {
  const a = ADDRESSES.find((ad) => ad.id === id);
  if (!a) return;
  const newLabel = prompt('Edit label:', a.label);
  if (newLabel) a.label = newLabel;
  const newAddr = prompt('Edit address:', a.address);
  if (newAddr) a.address = newAddr;
  renderAddresses();
}

function sendContactMessage() {
  const name = document.getElementById('contactName')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();
  if (!name || !message) {
    showToast('Please enter your name and message');
    return;
  }
  showToast('Message sent! We will reply soon.');
  document.getElementById('contactName').value = '';
  document.getElementById('contactMessage').value = '';
}

function logoutProfile() {
  showToast('Logged out successfully');
  closeSheet();
}

function openAddAddress() {
  const label = prompt('Address label (e.g. Home):');
  if (!label) return;
  const address = prompt('Full address:');
  if (!address) return;
  ADDRESSES.push({ id: Date.now(), label, address });
  renderAddresses();
}

function deleteAddress(id) {
  if (confirm('Delete this address?')) {
    ADDRESSES = ADDRESSES.filter((a) => a.id !== id);
    renderAddresses();
  }
}

function openWriteReview() {
  closeSheet();
  setTimeout(() => openSheet('writeReview'), 280);
}

function resetReviewStars() {
  document.querySelectorAll('#reviewStars .star').forEach((s) => s.classList.remove('active'));
}

function rateReview(val) {
  document.querySelectorAll('#reviewStars .star').forEach((s) => {
    s.classList.toggle('active', +s.dataset.val <= val);
  });
}

function submitReview() {
  const rating = document.querySelectorAll('#reviewStars .star.active').length || 5;
  const text = document.getElementById('reviewText').value.trim() || 'Great food!';
  REVIEWS.unshift({ customer: 'Anjali Nair', rating, text, date: new Date().toLocaleDateString() });
  showToast('Thank you for your review');
  closeSheet();
}

function toggleDarkMode() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  document.getElementById('darkToggle')?.classList.toggle('active', next === 'dark');
}

function changeLang(lang) {
  currentLang = lang;
  document.getElementById('brandName').textContent = lang === 'ml' ? 'മലബാർ ടേബിൾ' : 'Malabar Table';
  document.getElementById('brandSub').textContent = lang === 'ml' ? 'ഡിജിറ്റൽ മെനു' : 'Digital Menu';
  const sel = document.getElementById('langSelect');
  if (sel) sel.value = lang;
  showToast(lang === 'ml' ? 'ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി' : 'Language changed to English');
}

function toggleLang() {
  changeLang(currentLang === 'en' ? 'ml' : 'en');
}

function showSlide(i) {
  document.querySelectorAll('.hero-slide').forEach((s, n) => s.classList.toggle('active', n === i));
  document.querySelectorAll('.hero-dots button').forEach((b, n) => b.classList.toggle('active', n === i));
  currentSlide = i;
}
function nextSlide() { showSlide((currentSlide + 1) % 3); }

document.addEventListener('DOMContentLoaded', () => {
  renderOffers();
  renderBento();
  renderBest();
  renderBestsellerGrid();
  renderCategoryNav();
  renderCategorySections();
  updateCartUI();
  updateFavUI();

  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    document.getElementById('darkToggle')?.classList.add('active');
  }

  const bookingDate = document.getElementById('bookingDate');
  if (bookingDate) {
    bookingDate.value = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('table') || params.get('qr')) {
    setTimeout(() => openSheet('qr'), 400);
  }

  setInterval(nextSlide, 5000);

  document.querySelectorAll('.variant-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.parentElement.querySelectorAll('.variant-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const key = entry.target.id.replace('cat-', '');
        document.querySelectorAll('.cat-pill').forEach((p) => {
          p.classList.toggle('active', p.dataset.cat === key);
        });
      });
    }, { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 });
    CATEGORIES.forEach((c) => {
      const section = document.getElementById('cat-' + c.key);
      if (section) observer.observe(section);
    });
  }
});
