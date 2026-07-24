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
const BOOKING_TIMEOUT_MS = 5 * 60 * 1000;
let notificationsRead = localStorage.getItem('malabar_notifications_read') === 'true';
let activeBooking = (() => {
  try {
    return JSON.parse(localStorage.getItem('malabar_table_booking') || 'null');
  } catch {
    return null;
  }
})();

const img = (seed, w = 400, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const findItem = (id) => ITEMS.find((x) => x.id === id);
const money = (n) => '₹' + Math.round(n);
const isFavourite = (id) => favourites.includes(id);

const FAV_ICONS = {
  empty: 'assets/icons/empty-favorite-icon.png',
  filled: 'assets/icons/filled-favorite-icon.png'
};
const NOTIFICATION_ICONS = {
  empty: 'assets/icons/empty-notification-icon.png',
  filled: 'assets/icons/filled-notification-icon.png'
};
const CART_ICONS = {
  empty: 'assets/icons/empty-cart-icon.png',
  filled: 'assets/icons/filled-cart-icon.png'
};

function favIconImg(filled, extraClass = '') {
  const src = filled ? FAV_ICONS.filled : FAV_ICONS.empty;
  const label = filled ? 'Remove from favourites' : 'Add to favourites';
  const cls = extraClass ? ` fav-icon ${extraClass}` : ' fav-icon';
  return `<img src="${src}" class="${cls.trim()}" alt="${label}" width="20" height="20">`;
}

function setFavButtonIcon(btn, filled) {
  if (!btn) return;
  const extraClass = btn.classList.contains('fav-mini') ? 'fav-icon-mini'
    : btn.classList.contains('favourite-toggle') ? 'fav-icon-toggle'
    : btn.classList.contains('icon-btn') ? 'fav-icon-header' : '';
  btn.innerHTML = favIconImg(filled, extraClass);
  btn.classList.toggle('active', filled);
  btn.setAttribute('aria-label', filled ? 'Remove from favourites' : 'Add to favourites');
}

function updateNotificationUI() {
  const btn = document.getElementById('notifIcon');
  if (!btn) return;
  const filled = !notificationsRead;
  const src = filled ? NOTIFICATION_ICONS.filled : NOTIFICATION_ICONS.empty;
  const label = filled ? 'Notifications: unread messages' : 'Notifications';
  btn.innerHTML = `<img src="${src}" class="notification-icon notification-icon-header" alt="${label}" width="20" height="20">`;
  btn.setAttribute('aria-label', label);
}

function updateCartIcons(count) {
  const filled = count > 0;
  const src = filled ? CART_ICONS.filled : CART_ICONS.empty;
  const label = filled ? `Cart: ${count} item${count === 1 ? '' : 's'}` : 'Cart';

  const headerBtn = document.getElementById('cartIcon');
  if (headerBtn) {
    const img = headerBtn.querySelector('.cart-icon');
    if (img) {
      img.src = src;
      img.alt = label;
    }
    headerBtn.setAttribute('aria-label', label);
  }

  const navImg = document.querySelector('#cartNavIcon .cart-icon');
  if (navImg) {
    navImg.src = src;
    navImg.alt = 'Order';
  }
}

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

function getMenuScrollOffset() {
  const headerH = document.querySelector('.topbar')?.offsetHeight ?? 72;
  const navH = document.querySelector('.category-nav-wrap')?.offsetHeight ?? 64;
  return headerH + navH + 14;
}

function goHome() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function goToMenu() {
  const section = document.getElementById('menuSection');
  if (!section) return;
  const headerH = document.querySelector('.topbar')?.offsetHeight ?? 72;
  const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerH - 8);
  window.scrollTo({ top, behavior: 'smooth' });
}
function scrollCatPillIntoView(key) {
  const nav = document.getElementById('categoryNav');
  const pill = nav?.querySelector(`.cat-pill[data-cat="${key}"]`);
  if (!nav || !pill) return;
  const navRect = nav.getBoundingClientRect();
  const pillRect = pill.getBoundingClientRect();
  const offset = pillRect.left - navRect.left - (navRect.width / 2) + (pillRect.width / 2);
  nav.scrollTo({ left: nav.scrollLeft + offset, behavior: 'smooth' });
}

function scrollToCat(key) {
  const el = document.getElementById('cat-' + key);
  if (!el) {
    goToMenu();
    return;
  }
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - getMenuScrollOffset());
  window.scrollTo({ top, behavior: 'smooth' });
  document.querySelectorAll('.cat-pill').forEach((p) => p.classList.toggle('active', p.dataset.cat === key));
  scrollCatPillIntoView(key);
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
      <div class="best-photo-wrap">
        <div class="best-photo">
          <img src="${img('item' + it.id, 220, 220)}" alt="${it.name}" loading="lazy">
        </div>
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
      <div class="best-photo-wrap">
        <div class="best-photo">
          <img src="${img('item' + it.id, 220, 220)}" alt="${it.name}" loading="lazy">
        </div>
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
        <button type="button" class="fav-mini${fav ? ' active' : ''}"
          onclick="event.stopPropagation();toggleFavourite(${it.id})">${favIconImg(fav, 'fav-icon-mini')}</button>
      </div>
      <div class="item-body">
        <div class="item-name">${it.name}</div>
        <div class="item-desc">${it.desc}</div>
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
  updateCartIcons(count);

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
  if (cat === 'all') {
    goToMenu();
    scrollCatPillIntoView('all');
  } else {
    scrollToCat(cat);
  }
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
    setFavButtonIcon(document.getElementById('detailFavBtn'), isFavourite(id));
  }
}

function updateFavUI() {
  setFavButtonIcon(document.getElementById('favIcon'), favourites.length > 0);
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
      <div class="fav-item" onclick="openDetail(${it.id})" role="button" tabindex="0">
        <img src="${img('item-' + it.id, 120, 120)}" alt="${it.name}">
        <div class="cart-info"><div class="cart-name">${it.name}</div><div class="cart-price">${money(it.price)}</div></div>
        <button type="button" class="fav-remove" onclick="event.stopPropagation();toggleFavourite(${it.id})">✕</button>
      </div>`;
  }).join('');
}

function renderNotifications() {
  const el = document.getElementById('notifList');
  if (!el) return;
  notificationsRead = true;
  localStorage.setItem('malabar_notifications_read', 'true');
  updateNotificationUI();
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

function clearExpiredBooking() {
  if (!activeBooking || activeBooking.confirmed || activeBooking.expiresAt > Date.now()) return false;
  activeBooking = null;
  localStorage.removeItem('malabar_table_booking');
  return true;
}

function getTableStatus(table) {
  return activeBooking?.tableId === table.id ? 'booked' : table.status;
}

function formatBookingTimeRemaining() {
  const remaining = Math.max(0, activeBooking.expiresAt - Date.now());
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderBookingDetails() {
  const el = document.getElementById('bookingDetails');
  if (!el) return;
  clearExpiredBooking();
  if (!activeBooking) {
    el.classList.add('hidden');
    el.innerHTML = '';
    return;
  }
  el.classList.remove('hidden');
  const confirmed = Boolean(activeBooking.confirmed);
  el.innerHTML = `
    <div class="booking-summary-head">
      <strong>${confirmed ? 'Table booking confirmed' : 'Table hold active'}</strong>
      <span class="booking-status">${confirmed ? 'Confirmed' : 'Awaiting confirmation'}</span>
    </div>
    <div class="booking-summary-grid">
      <span>Table <strong>${activeBooking.tableName}</strong></span>
      <span>Guests <strong>${activeBooking.people}</strong></span>
      <span>${activeBooking.date}</span>
      <span>${activeBooking.time}</span>
    </div>
    ${confirmed ? '' : `<div class="booking-expiry">Confirm within <strong>${formatBookingTimeRemaining()}</strong></div>`}
    <div class="booking-actions">
      ${confirmed ? '' : '<button type="button" class="booking-action primary" onclick="confirmTableBooking()">Confirm booking</button>'}
      <button type="button" class="booking-action" onclick="modifyTableBooking()">Modify booking</button>
      <button type="button" class="booking-cancel" onclick="cancelTableBooking()">Cancel booking</button>
    </div>`;
}

function renderTablesForBooking() {
  const bookingExpired = clearExpiredBooking();
  const el = document.getElementById('tableSelectGrid');
  if (!el) return;
  el.innerHTML = TABLES.map((t) => `
    <button type="button" class="table-option status-${getTableStatus(t)} ${selectedTableId === t.id ? 'selected' : ''}"
      ${getTableStatus(t) === 'available' ? `onclick="selectTable(${t.id})"` : 'disabled'}>
      <strong>${t.name}</strong><small>${getTableStatus(t)}</small>
    </button>
  `).join('');
  renderBookingDetails();
  if (bookingExpired) showToast('Your table hold has expired');
}

const SHEET_VIEWS = [
  'cartView', 'checkoutView', 'confirmView', 'trackView', 'detailView',
  'favouritesView', 'notificationsView', 'profileView', 'contactView', 'qrView',
  'ordersView', 'addressesView', 'paymentsView', 'settingsView', 'restaurantView',
  'bestsellersView', 'menuAllView', 'offersView', 'tableBookingView', 'writeReviewView'
];

const SHEET_VIEW_MAP = {
  cart: 'cartView', checkout: 'checkoutView', confirm: 'confirmView', track: 'trackView',
  detail: 'detailView', favourites: 'favouritesView', notifications: 'notificationsView',
  profile: 'profileView', contact: 'contactView', qr: 'qrView', orders: 'ordersView',
  addresses: 'addressesView', payments: 'paymentsView', settings: 'settingsView',
  restaurant: 'restaurantView', bestsellers: 'bestsellersView', menuall: 'menuAllView',
  offers: 'offersView', tableBooking: 'tableBookingView', writeReview: 'writeReviewView'
};

let sheetStack = [];
let currentSheetView = null;

function prepareSheetView(view) {
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

  SHEET_VIEWS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById(SHEET_VIEW_MAP[view]);
  if (target) target.style.display = 'flex';
  target?.style.setProperty('flex-direction', 'column');
  target?.style.setProperty('height', '100%');
  target?.style.setProperty('min-height', '0');
  currentSheetView = view;
}

function openSheet(view) {
  const sheet = document.getElementById('sheet');
  const sheetOpen = sheet.classList.contains('show');
  if (sheetOpen && currentSheetView && currentSheetView !== view) {
    sheetStack.push(currentSheetView);
  } else if (!sheetOpen) {
    sheetStack = [];
  }

  document.body.classList.add('no-scroll');
  document.getElementById('overlay').classList.add('show');
  sheet.classList.add('show');
  prepareSheetView(view);
}

function closeSheet() {
  if (sheetStack.length) {
    const previous = sheetStack.pop();
    prepareSheetView(previous);
    return;
  }
  dismissSheet();
}

function dismissSheet() {
  sheetStack = [];
  currentSheetView = null;
  document.body.classList.remove('no-scroll');
  document.getElementById('overlay').classList.remove('show');
  const sheet = document.getElementById('sheet');
  sheet.style.removeProperty('transform');
  sheet.style.removeProperty('transition');
  sheet.classList.remove('show');
}

function showCheckout() {
  openSheet('checkout');
}

function setFulfil(type) {
  fulfilType = type;
  document.getElementById('optDelivery')?.classList.toggle('active', type === 'delivery');
  document.getElementById('optPickup')?.classList.toggle('active', type === 'pickup');
  const addressField = document.getElementById('addressField');
  const pickupTimeField = document.getElementById('pickupTimeField');
  if (addressField) addressField.style.display = type === 'pickup' ? 'none' : 'block';
  if (pickupTimeField) pickupTimeField.style.display = type === 'pickup' ? 'block' : 'none';
}

function openDetail(id) {
  const it = findItem(id);
  if (!it) return;
  currentDetailItem = it;
  detailQty = 1;
  openSheet('detail');
}

function renderProductReviews() {
  const el = document.getElementById('productReviews');
  if (!el) return;
  const avg = REVIEWS.length
    ? (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
    : '0.0';
  el.innerHTML = `
    <div class="reviews-head">
      <h3>Customer Reviews</h3>
      <span class="avg">★ ${avg} · ${REVIEWS.length} reviews</span>
    </div>
    <div class="reviews-row">
      ${REVIEWS.map((r) => `
        <article class="review-card">
          <div class="review-top">
            <span class="review-name">${r.customer}</span>
            <span class="review-date">${r.date || ''}</span>
          </div>
          <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          <p class="review-text">${r.text}</p>
        </article>
      `).join('')}
    </div>`;
}

function populateDetail(it) {
  document.getElementById('detailImg').src = img('item-' + it.id, 900, 700);
  document.getElementById('detailName').textContent = it.name;
  document.getElementById('detailDesc').textContent = it.desc;
  document.getElementById('detailPrice').textContent = money(it.price);
  document.getElementById('detailTitle').textContent = it.name;
  document.getElementById('detailQty').textContent = '1';
  setFavButtonIcon(document.getElementById('detailFavBtn'), isFavourite(it.id));
  renderProductReviews();
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
  const pickupTime = document.getElementById('pickupTime')?.value || '';
  if (fulfilType === 'pickup' && !pickupTime) {
    showToast('Please select a pickup time');
    return;
  }
  const total = cartTotal() - discountAmount();
  const orderNo = 'ORD-2607-' + Math.floor(1000 + Math.random() * 9000);
  const lines = Object.entries(cart).map(([id, q]) => {
    const it = findItem(+id);
    return `${q} x ${it.name} - ${money(it.price * q)}`;
  }).join('\n');
  const fulfilment = fulfilType === 'delivery'
    ? 'Deliver to: ' + address
    : `Pickup at store in ${pickupTime}`;
  const msg = `Hi Malabar Table, confirming order ${orderNo}\n\n${lines}\n\nTotal: ${money(total)}\nName: ${name}${phone ? '\nPhone: ' + phone : ''}\n${fulfilment}`;
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
  if (activeBooking) {
    showToast('You already have an active table booking');
    return;
  }
  if (!selectedTableId) { showToast('Please select a table'); return; }
  const date = document.getElementById('bookingDate')?.value;
  const time = document.getElementById('bookingTime')?.value;
  const people = document.getElementById('bookingPeople')?.value;
  const table = TABLES.find((t) => t.id === selectedTableId);
  if (!date || !time || !table) {
    showToast('Please select a date, time, and table');
    return;
  }
  activeBooking = {
    tableId: table.id,
    tableName: table.name,
    date,
    time,
    people,
    confirmed: false,
    expiresAt: Date.now() + BOOKING_TIMEOUT_MS
  };
  localStorage.setItem('malabar_table_booking', JSON.stringify(activeBooking));
  selectedTableId = null;
  renderTablesForBooking();
  showToast(`Table ${table.name} is held for 5 minutes`);
}

function cancelTableBooking() {
  if (!activeBooking) return;
  if (!confirm(`Cancel the booking for table ${activeBooking.tableName}?`)) return;
  activeBooking = null;
  localStorage.removeItem('malabar_table_booking');
  renderTablesForBooking();
  showToast('Table booking cancelled');
}

function modifyTableBooking() {
  if (!activeBooking) return;
  const booking = activeBooking;
  const dateField = document.getElementById('bookingDate');
  const timeField = document.getElementById('bookingTime');
  const peopleField = document.getElementById('bookingPeople');
  const peopleLabel = document.getElementById('bookingPeopleLabel');
  if (dateField) dateField.value = booking.date;
  if (timeField) timeField.value = booking.time;
  if (peopleField) peopleField.value = booking.people;
  if (peopleLabel) peopleLabel.textContent = booking.people;
  selectedTableId = booking.tableId;
  activeBooking = null;
  localStorage.removeItem('malabar_table_booking');
  renderTablesForBooking();
  showToast('Update your booking details, then hold the table again');
}

function confirmTableBooking() {
  if (!activeBooking || activeBooking.confirmed) return;
  activeBooking.confirmed = true;
  activeBooking.expiresAt = null;
  localStorage.setItem('malabar_table_booking', JSON.stringify(activeBooking));
  renderBookingDetails();
  showToast(`Table ${activeBooking.tableName} booking confirmed`);
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
  dismissSheet();
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
  REVIEWS.unshift({ customer: 'Anjali Nair', rating, text, date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) });
  if (currentDetailItem) renderProductReviews();
  showToast('Thank you for your review');
  closeSheet();
}

function closeCustomSelects(exceptId = '') {
  document.querySelectorAll('[data-custom-select]').forEach((select) => {
    if (select.dataset.customSelect === exceptId) return;
    select.classList.remove('is-open');
    select.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
  });
}

function toggleCustomSelect(id) {
  const select = document.querySelector(`[data-custom-select="${id}"]`);
  if (!select) return;
  const shouldOpen = !select.classList.contains('is-open');
  closeCustomSelects(id);
  select.classList.toggle('is-open', shouldOpen);
  select.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', String(shouldOpen));
}

function selectCustomOption(id, value, label = value) {
  const field = document.getElementById(id);
  const labelEl = document.getElementById(`${id}Label`);
  if (field) field.value = value;
  if (labelEl) labelEl.textContent = label;
  closeCustomSelects();
  if (id === 'langSelect') changeLang(value);
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

function setupHeroSwipe() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  let startX = null;
  hero.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    startX = event.clientX;
  });
  hero.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    startX = null;
    if (Math.abs(deltaX) < 50) return;
    const slideCount = document.querySelectorAll('.hero-slide').length;
    showSlide((currentSlide + (deltaX < 0 ? 1 : -1) + slideCount) % slideCount);
  });
  hero.addEventListener('pointercancel', () => { startX = null; });
}

function setupSheetDismiss() {
  const sheet = document.getElementById('sheet');
  if (!sheet) return;
  let startY = 0;
  let dragDistance = 0;
  let dragging = false;

  sheet.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, input, select, textarea')) return;
    if (!event.target.closest('.handle, .sheet-head')) return;
    startY = event.clientY;
    dragDistance = 0;
    dragging = true;
    sheet.setPointerCapture?.(event.pointerId);
    sheet.style.transition = 'none';
  });

  sheet.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    dragDistance = Math.max(0, event.clientY - startY);
    if (dragDistance > 0) sheet.style.transform = `translate(-50%, ${dragDistance}px)`;
  });

  const finishDrag = () => {
    if (!dragging) return;
    dragging = false;
    sheet.style.removeProperty('transition');
    if (dragDistance > 96) dismissSheet();
    else sheet.style.removeProperty('transform');
  };
  sheet.addEventListener('pointerup', finishDrag);
  sheet.addEventListener('pointercancel', finishDrag);
}

function setupHorizontalDragScroll(selector) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) return;
  let startX = 0;
  let startY = 0;
  let startScroll = 0;
  let dragging = false;
  let axis = null;
  let moved = false;

  el.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target.closest('button, a, input, select, textarea')) return;
    dragging = true;
    axis = null;
    moved = false;
    startX = event.clientX;
    startY = event.clientY;
    startScroll = el.scrollLeft;
  });

  el.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (!axis) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
      axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
      if (axis === 'x') el.setPointerCapture?.(event.pointerId);
      else {
        dragging = false;
        return;
      }
    }
    if (axis !== 'x') return;
    moved = true;
    el.scrollLeft = startScroll - deltaX;
    event.preventDefault();
  }, { passive: false });

  const endDrag = () => {
    dragging = false;
    axis = null;
  };
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);
  el.addEventListener('click', (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}

document.addEventListener('DOMContentLoaded', () => {
  renderOffers();
  renderBento();
  renderBest();
  renderBestsellerGrid();
  renderCategoryNav();
  renderCategorySections();
  updateCartUI();
  updateFavUI();
  updateNotificationUI();
  setupHorizontalDragScroll('#offersCarousel');
  setupHorizontalDragScroll('#bestRow');

  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    document.getElementById('darkToggle')?.classList.add('active');
  }

  const bookingDate = document.getElementById('bookingDate');
  if (bookingDate) {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    bookingDate.value = tomorrow;
    bookingDate.min = tomorrow;
  }
  renderBookingDetails();
  setInterval(() => {
    if (!activeBooking) return;
    if (clearExpiredBooking()) {
      renderTablesForBooking();
      showToast('Your table hold has expired');
    } else {
      renderBookingDetails();
    }
  }, 1000);

  const params = new URLSearchParams(window.location.search);
  if (params.get('table') || params.get('qr')) {
    setTimeout(() => openSheet('qr'), 400);
  }

  setInterval(nextSlide, 5000);
  setupHeroSwipe();
  setupSheetDismiss();
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('sheet')?.classList.contains('show')) closeSheet();
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-custom-select]')) closeCustomSelects();
  });

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
        scrollCatPillIntoView(key);
      });
    }, { rootMargin: `-${getMenuScrollOffset()}px 0px -55% 0px`, threshold: 0.05 });
    CATEGORIES.forEach((c) => {
      const section = document.getElementById('cat-' + c.key);
      if (section) observer.observe(section);
    });
  }
});
