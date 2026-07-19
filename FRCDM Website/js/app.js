(function () {
  'use strict';

  const CONFIG = window.MALABAR_CONFIG;
  const DATA = window.MALABAR_DATA;
  const CATEGORIES = DATA.categories;
  const ITEMS = DATA.items;
  const OFFERS = DATA.offers;
  const COUPONS = DATA.coupons;
  const REVIEWS = DATA.reviews;
  const TABLES = DATA.tables;
  const NOTIFICATIONS = DATA.notifications;
  const HERO_SLIDES = DATA.heroSlides;

  let cart = {};
  let favourites = [];
  let appliedCoupon = null;
  let fulfilType = 'delivery';
  let selectedTableId = null;
  let currentDetailItem = null;
  let currentLang = 'en';
  let currentSlide = 0;
  let currentCat = 'all';
  let slideTimer = null;

  const $ = (id) => document.getElementById(id);
  const esc = (str) => {
    const el = document.createElement('span');
    el.textContent = str ?? '';
    return el.innerHTML;
  };

  const img = (seed, w = 500, h = 500) =>
    `${CONFIG.imageBase}/${encodeURIComponent(seed)}/${w}/${h}`;

  const findItem = (id) => ITEMS.find((x) => x.id === id);

  const money = (n) => CONFIG.currency + Math.round(n);

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function cartTotal() {
    return Object.entries(cart).reduce(
      (s, [id, q]) => s + findItem(+id).price * q,
      0
    );
  }

  function discountAmount() {
    if (!appliedCoupon) return 0;
    const t = cartTotal();
    if (appliedCoupon.discount.includes('%')) {
      return Math.min(t, t * (parseFloat(appliedCoupon.discount) / 100));
    }
    return Math.min(t, parseFloat(appliedCoupon.discount.replace('₹', '')));
  }

  function showToast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function goHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToMenu() {
    $('menuSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function scrollToCat(key) {
    if (key === 'all') {
      goToMenu();
      return;
    }
    const el = $('cat-' + key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      goToMenu();
      setTimeout(
        () => $('cat-' + key)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        350
      );
    }
  }

  function setNav(el) {
    document.querySelectorAll('.nav-item').forEach((x) => x.classList.remove('active'));
    el.classList.add('active');
  }

  function setQuick(el) {
    document.querySelectorAll('.quick').forEach((x) => x.classList.remove('active'));
    el.classList.add('active');
  }

  function renderHero() {
    const hero = $('hero');
    const slidesHtml = HERO_SLIDES.map((slide, i) => {
      const actions = [];
      if (slide.primary) {
        actions.push(
          `<button class="btn btn-primary" data-hero-action="${esc(slide.primary.action)}">${esc(slide.primary.label)}</button>`
        );
      }
      if (slide.secondary) {
        actions.push(
          `<button class="btn btn-ghost" data-hero-action="${esc(slide.secondary.action)}">${esc(slide.secondary.label)}</button>`
        );
      }
      return `<div class="hero-slide${i === 0 ? ' active' : ''}" role="group" aria-roledescription="slide" aria-label="Slide ${i + 1} of ${HERO_SLIDES.length}">
        <img src="${img(slide.seed, 1400, 700)}" alt="${esc(slide.alt)}" width="1400" height="700" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
        <div class="hero-copy">
          <div class="eyebrow">${esc(slide.eyebrow)}</div>
          <h1>${slide.title}</h1>
          <p>${esc(slide.text)}</p>
          <div class="hero-actions">${actions.join('')}</div>
        </div>
      </div>`;
    }).join('');

    const dotsHtml = HERO_SLIDES.map(
      (_, i) =>
        `<button type="button" class="${i === 0 ? 'active' : ''}" aria-label="Go to slide ${i + 1}" data-slide="${i}"></button>`
    ).join('');

    hero.innerHTML = slidesHtml + `<div class="hero-dots" role="tablist">${dotsHtml}</div>`;

    hero.querySelectorAll('[data-hero-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.heroAction;
        if (action === 'menu') goToMenu();
        else if (action === 'restaurant') openSheet('restaurant');
        else if (action === 'sweets') scrollToCat('sweets');
      });
    });

    hero.querySelectorAll('.hero-dots button').forEach((btn) => {
      btn.addEventListener('click', () => showSlide(+btn.dataset.slide));
    });
  }

  function renderOffers() {
    $('offersCarousel').innerHTML = OFFERS.map(
      (o) =>
        `<article class="offer">
          <div class="discount">${esc(o.discount)}</div>
          <h3>${esc(o.name)}</h3>
          <p>${esc(o.desc)} · Valid till ${esc(o.validTill)}</p>
          <button type="button" data-offer="${esc(o.name)}">Claim offer</button>
        </article>`
    ).join('');

    $('offersCarousel').querySelectorAll('[data-offer]').forEach((btn) => {
      btn.addEventListener('click', () =>
        showToast('Offer selected: ' + btn.dataset.offer)
      );
    });
  }

  function renderCategories() {
    $('categoryNav').innerHTML =
      `<button type="button" class="cat-pill active" data-cat="all">All</button>` +
      CATEGORIES.map(
        (c) =>
          `<button type="button" class="cat-pill" data-cat="${esc(c.key)}" id="cat-${esc(c.key)}">${esc(c.name)}</button>`
      ).join('');

    $('categoryNav').querySelectorAll('.cat-pill').forEach((btn) => {
      btn.addEventListener('click', () => filterCategory(btn.dataset.cat, btn));
    });
  }

  function itemCard(it) {
    const q = cart[it.id] || 0;
    return `<article class="item-card" id="item-${it.id}" tabindex="0" role="button" aria-label="View ${esc(it.name)}" data-item-id="${it.id}">
      <div class="item-photo">
        <img src="${img('item-' + it.id, 500, 500)}" alt="${esc(it.name)}" width="500" height="500" loading="lazy">
        <span class="veg ${it.veg ? '' : 'nonveg'}" aria-label="${it.veg ? 'Vegetarian' : 'Non-vegetarian'}"><i></i></span>
      </div>
      <div class="item-body">
        <div>
          <div class="item-name">${esc(it.name)}</div>
          <div class="item-desc">${esc(it.desc)}</div>
        </div>
        <div class="item-bottom">
          <span class="price">${money(it.price)}</span>
          ${
            q
              ? `<div class="qty" data-stop-propagation>
                  <button type="button" aria-label="Remove one ${esc(it.name)}" data-remove="${it.id}">−</button>
                  <span>${q}</span>
                  <button type="button" aria-label="Add one ${esc(it.name)}" data-add="${it.id}">+</button>
                </div>`
              : `<button type="button" class="add" aria-label="Add ${esc(it.name)}" data-add="${it.id}">+</button>`
          }
        </div>
      </div>
    </article>`;
  }

  function bindMenuEvents() {
    $('menuList').querySelectorAll('.item-card').forEach((card) => {
      const id = +card.dataset.itemId;
      card.addEventListener('click', (e) => {
        if (e.target.closest('[data-stop-propagation]')) return;
        openDetail(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetail(id);
        }
      });
    });

    $('menuList').querySelectorAll('[data-add]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addItem(+btn.dataset.add);
      });
    });

    $('menuList').querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeItem(+btn.dataset.remove);
      });
    });
  }

  function renderMenu(search = '', cat = 'all') {
    const term = search.toLowerCase().trim();
    const list = ITEMS.filter(
      (i) =>
        (cat === 'all' || i.cat === cat) &&
        (!term || `${i.name} ${i.desc} ${i.cat}`.toLowerCase().includes(term))
    );

    $('resultCount').textContent = `${list.length} items`;
    $('menuList').innerHTML = list.length
      ? list.map(itemCard).join('')
      : '<div class="empty-state">No dishes found.</div>';

    document.querySelectorAll('.cat-pill').forEach((x) =>
      x.classList.toggle('active', x.dataset.cat === cat)
    );
    currentCat = cat;
    bindMenuEvents();
  }

  function renderBest() {
    $('bestRow').innerHTML = ITEMS.filter((i) => i.best)
      .map(
        (i) =>
          `<button type="button" class="best" data-item-id="${i.id}">
            <img src="${img('best-' + i.id, 400, 400)}" alt="${esc(i.name)}" width="400" height="400" loading="lazy">
            <div class="best-name">${esc(i.name)}</div>
            <div class="best-price">${money(i.price)}</div>
          </button>`
      )
      .join('');

    $('bestRow').querySelectorAll('[data-item-id]').forEach((btn) => {
      btn.addEventListener('click', () => openDetail(+btn.dataset.itemId));
    });
  }

  function renderCart(target = 'desktopCart') {
    const el = $(target);
    if (!el) return;
    const count = cartCount();
    if (!count) {
      el.innerHTML =
        '<div class="cart-empty">Your order is empty.<br><br>Tap + on a dish to get started.</div>';
      return;
    }
    el.innerHTML = Object.entries(cart)
      .map(([id, q]) => {
        const it = findItem(+id);
        return `<div class="cart-line">
          <img src="${img('item-' + id, 120, 120)}" alt="" width="52" height="52" loading="lazy">
          <div class="cart-info">
            <div class="cart-name">${esc(it.name)}</div>
            <div class="cart-price">${q} × ${money(it.price)}</div>
          </div>
          <div class="cart-total">${money(it.price * q)}</div>
        </div>`;
      })
      .join('');
  }

  function updateUI() {
    const count = cartCount();
    const sub = cartTotal();
    const disc = discountAmount();
    const total = sub - disc;

    ['topBadge', 'tabBadge'].forEach((id) => {
      const el = $(id);
      el.textContent = count;
      el.classList.toggle('hidden', !count);
    });

    $('cartCountLabel').textContent = `${count} item${count === 1 ? '' : 's'}`;
    $('desktopSubtotal').textContent = money(sub);
    $('desktopTotal').textContent = money(total);
    $('desktopCheckout').disabled = !count;
    $('desktopDiscountRow').style.display = disc ? 'flex' : 'none';
    $('desktopDiscount').textContent = '-' + money(disc);

    renderCart();
    renderMenu($('searchInput').value, currentCat);
    if ($('cartView')) renderSheetCart();
  }

  function addItem(id) {
    cart[id] = (cart[id] || 0) + 1;
    updateUI();
    showToast(`${findItem(id).name} added to your order`);
  }

  function removeItem(id) {
    if (!cart[id]) return;
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    updateUI();
  }

  function filterCategory(cat, el) {
    renderMenu($('searchInput').value, cat);
    if (el) {
      document.querySelectorAll('.cat-pill').forEach((x) => x.classList.remove('active'));
      el.classList.add('active');
    }
  }

  function handleSearch(e) {
    const v = e.target.value;
    $('clearSearch').style.display = v ? 'block' : 'none';
    renderMenu(v, currentCat);
  }

  function clearSearch() {
    $('searchInput').value = '';
    $('clearSearch').style.display = 'none';
    renderMenu('', currentCat);
  }

  function applyCouponFrom(inputId) {
    const code = $(inputId).value.trim().toUpperCase();
    const c = COUPONS.find((x) => x.code === code);
    if (!c) {
      appliedCoupon = null;
      showToast('Invalid coupon code');
      updateUI();
      return;
    }
    appliedCoupon = c;
    showToast(`Coupon applied: ${c.discount}`);
    updateUI();
  }

  function openDetail(id) {
    currentDetailItem = findItem(id);
    openSheet('detail');
  }

  function renderSheetCart() {
    const el = $('sheetCartLines');
    if (!el) return;
    const count = cartCount();
    el.innerHTML = count
      ? Object.entries(cart)
          .map(([id, q]) => {
            const it = findItem(+id);
            return `<div class="cart-line">
              <img src="${img('item-' + id, 120, 120)}" alt="" width="52" height="52" loading="lazy">
              <div class="cart-info">
                <div class="cart-name">${esc(it.name)}</div>
                <div class="cart-price">${money(it.price)} each</div>
              </div>
              <div class="qty">
                <button type="button" data-remove="${id}">−</button>
                <span>${q}</span>
                <button type="button" data-add="${id}">+</button>
              </div>
              <div class="cart-total">${money(it.price * q)}</div>
            </div>`;
          })
          .join('')
      : '<div class="cart-empty">Your order is empty.<br>Tap + on any dish to add it.</div>';

    el.querySelectorAll('[data-add]').forEach((btn) => {
      btn.addEventListener('click', () => addItem(+btn.dataset.add));
    });
    el.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => removeItem(+btn.dataset.remove));
    });

    const sub = cartTotal();
    const disc = discountAmount();
    $('sheetSubtotal').textContent = money(sub);
    $('sheetTotal').textContent = money(sub - disc);
    $('sheetDiscountRow').style.display = disc ? 'flex' : 'none';
    $('sheetDiscount').textContent = '-' + money(disc);
    $('checkoutBtn').disabled = !count;
  }

  function openSheet(view) {
    const content = $('sheetContent');
    let html = '';

    if (view === 'cart') {
      html = `<div id="cartView">
        <div class="sheet-head"><h2 id="sheetTitle">Your Order</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">
          <div id="sheetCartLines"></div>
          <div class="coupon"><input id="sheetCoupon" placeholder="Coupon code" aria-label="Coupon code"><button type="button" data-coupon="sheetCoupon">Apply</button></div>
          <div class="summary-row"><span>Subtotal</span><strong id="sheetSubtotal">₹0</strong></div>
          <div class="summary-row" id="sheetDiscountRow" style="display:none"><span>Discount</span><strong id="sheetDiscount">-₹0</strong></div>
          <div class="summary-row total"><span>Total</span><span id="sheetTotal">₹0</span></div>
          <button type="button" class="cta" id="checkoutBtn" data-open-sheet="checkout">Continue to Checkout</button>
        </div>
      </div>`;
    } else if (view === 'checkout') {
      html = `<div id="checkoutView">
        <div class="sheet-head"><h2 id="sheetTitle">Checkout</h2><button type="button" class="close" aria-label="Back to cart" data-open-sheet="cart">‹</button></div>
        <div class="sheet-body">
          <div class="segmented">
            <button type="button" id="optDelivery" class="segment active" data-fulfil="delivery">🛵 Delivery</button>
            <button type="button" id="optPickup" class="segment" data-fulfil="pickup">🏪 Pickup</button>
          </div>
          <div class="form-field"><label for="custName">Your Name</label><input id="custName" placeholder="Enter your name" autocomplete="name"></div>
          <div class="form-field" id="addressField"><label for="custAddress">Delivery Address</label><textarea id="custAddress" placeholder="Enter delivery address" autocomplete="street-address"></textarea></div>
          <div class="summary-row total"><span>Total to pay</span><span id="checkoutTotal">${money(cartTotal() - discountAmount())}</span></div>
          <button type="button" class="cta" id="placeOrderBtn">Confirm Order via WhatsApp</button>
        </div>
      </div>`;
    } else if (view === 'detail' && currentDetailItem) {
      const it = currentDetailItem;
      html = `<div id="detailView">
        <div class="sheet-head"><h2 id="sheetTitle">Dish Details</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">
          <div class="detail-hero"><img src="${img('item-' + it.id, 900, 700)}" alt="${esc(it.name)}" width="900" height="700"></div>
          <h2 class="detail-title">${esc(it.name)}</h2>
          <p class="detail-desc">${esc(it.desc)}</p>
          <div class="detail-foot">
            <strong class="price" style="font-size:24px">${money(it.price)}</strong>
            <button type="button" class="cta" style="width:auto;padding:13px 28px" data-add-detail="${it.id}">Add to Order</button>
          </div>
        </div>
      </div>`;
    } else if (view === 'offers') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">All Offers</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body"><div class="offer-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px">
          ${OFFERS.map(
            (o) =>
              `<article class="offer" style="min-width:0"><div class="discount">${esc(o.discount)}</div><h3>${esc(o.name)}</h3><p>${esc(o.desc)}<br>Valid till ${esc(o.validTill)}</p><button type="button" data-offer="${esc(o.name)}">Claim offer</button></article>`
          ).join('')}
        </div></div>
      </div>`;
    } else if (view === 'bestsellers') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">Customer Favourites</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body"><div class="bestsellers" style="display:grid;grid-template-columns:repeat(2,1fr)">
          ${ITEMS.filter((i) => i.best)
            .map(
              (i) =>
                `<button type="button" class="best" data-item-id="${i.id}"><img src="${img('best-' + i.id, 400, 400)}" alt="${esc(i.name)}" loading="lazy"><div class="best-name">${esc(i.name)}</div><div class="best-price">${money(i.price)}</div></button>`
            )
            .join('')}
        </div></div>
      </div>`;
    } else if (view === 'restaurant') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">About ${esc(CONFIG.name)}</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">
          <div class="detail-hero"><img src="${img('restaurant-cover', 900, 600)}" alt="${esc(CONFIG.name)} restaurant" width="900" height="600" loading="lazy"></div>
          <h2 class="detail-title">${esc(CONFIG.name)}</h2>
          <p class="detail-desc">Kerala Cuisine · Seafood · Traditional<br><br>Serving authentic Kerala flavours since ${esc(CONFIG.since)}. Dine-in, takeaway and WhatsApp ordering available.</p>
          <a class="menu-row" href="tel:${CONFIG.phone.replace(/\s/g, '')}" style="text-decoration:none;color:inherit">
            <div class="row-icon">📞</div><div class="row-main"><div class="row-title">${esc(CONFIG.phone)}</div><div class="row-sub">Call restaurant</div></div>
          </a>
          <div class="menu-row"><div class="row-icon">📍</div><div class="row-main"><div class="row-title">${esc(CONFIG.address)}</div><div class="row-sub">${esc(CONFIG.city)}</div></div></div>
          <button type="button" class="cta" id="shareBtn">Share Restaurant</button>
        </div>
      </div>`;
    } else if (view === 'notifications') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">Notifications</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">${NOTIFICATIONS.map(
          (n) =>
            `<div class="menu-row"><div class="row-icon">${n.icon}</div><div class="row-main"><div class="row-title">${esc(n.msg)}</div><div class="row-sub">${esc(n.time)}</div></div></div>`
        ).join('')}</div>
      </div>`;
    } else if (view === 'profile') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">My Profile</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">
          <div class="profile-card"><div class="avatar">A</div><div><strong>Anjali Nair</strong><div style="color:var(--muted);font-size:12px">Gold member · 1,240 points</div></div></div>
          <div class="menu-row" data-toast="Favourites opened"><div class="row-icon">♡</div><div class="row-main"><div class="row-title">Favourites</div><div class="row-sub">Your saved dishes</div></div><span>›</span></div>
          <div class="menu-row" data-toast="Order History opened"><div class="row-icon">⌁</div><div class="row-main"><div class="row-title">Order History</div><div class="row-sub">View previous orders</div></div><span>›</span></div>
          <div class="menu-row" data-toast="Settings opened" data-toggle-theme><div class="row-icon">⚙</div><div class="row-main"><div class="row-title">Settings</div><div class="row-sub">Theme and preferences</div></div><span>›</span></div>
        </div>
      </div>`;
    } else if (view === 'contact') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">Contact Us</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">
          <a class="menu-row" href="tel:${CONFIG.phone.replace(/\s/g, '')}" style="text-decoration:none;color:inherit"><div class="row-icon">📞</div><div class="row-main"><div class="row-title">${esc(CONFIG.phone)}</div><div class="row-sub">Call restaurant</div></div></a>
          <a class="menu-row" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit"><div class="row-icon">💬</div><div class="row-main"><div class="row-title">WhatsApp</div><div class="row-sub">Chat with us for quick support</div></div></a>
          <div class="menu-row"><div class="row-icon">📍</div><div class="row-main"><div class="row-title">${esc(CONFIG.address)}</div><div class="row-sub">${esc(CONFIG.hours)}</div></div></div>
        </div>
      </div>`;
    } else if (view === 'qr') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">Scan & Order</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body" style="text-align:center;padding:50px 20px">
          <div style="font-size:90px" aria-hidden="true">▣</div>
          <h2>Scan to open menu</h2>
          <p style="color:var(--muted)">Point your camera at the restaurant QR code to open this menu instantly.</p>
          <button type="button" class="cta" data-toast="QR scanner ready">Open Scanner</button>
        </div>
      </div>`;
    } else if (view === 'tableBooking') {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">Book a Table</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">
          <div class="form-field"><label for="bookingDate">Date</label><input type="date" id="bookingDate"></div>
          <div class="form-field"><label for="bookingTime">Time</label><input type="time" id="bookingTime" value="19:30"></div>
          <div class="form-field"><label for="bookingPeople">Number of People</label><select id="bookingPeople"><option>2</option><option>4</option><option>6</option><option>8</option><option>10</option></select></div>
          <div class="form-field"><label>Select Table</label><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px" id="tableGrid">
            ${TABLES.map(
              (t) =>
                `<button type="button" class="segment ${selectedTableId === t.id ? 'active' : ''}" ${t.status !== 'available' ? 'disabled' : ''} data-table-id="${t.id}">${esc(t.name)}<br><small>${esc(t.status)}</small></button>`
            ).join('')}
          </div></div>
          <div class="form-field"><label for="bookingRequests">Special Requests</label><textarea id="bookingRequests" placeholder="Any special occasion?"></textarea></div>
          <button type="button" class="cta" id="bookTableBtn">Confirm Booking</button>
        </div>
      </div>`;
    } else {
      html = `<div>
        <div class="sheet-head"><h2 id="sheetTitle">Write a Review</h2><button type="button" class="close" aria-label="Close" data-close-sheet>×</button></div>
        <div class="sheet-body">
          <div class="form-field"><label>Rating</label><div class="star-rating" id="reviewStars">${[1, 2, 3, 4, 5]
            .map((i) => `<span class="star" role="button" tabindex="0" data-val="${i}" aria-label="${i} stars">☆</span>`)
            .join('')}</div></div>
          <div class="form-field"><label for="reviewText">Review</label><textarea id="reviewText" placeholder="Share your experience."></textarea></div>
          <button type="button" class="cta" id="submitReviewBtn">Submit Review</button>
        </div>
      </div>`;
    }

    content.innerHTML = html;
    $('overlay').classList.add('show');
    $('sheet').classList.add('show');
    $('sheet').setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    bindSheetEvents(view);
    if (view === 'cart') renderSheetCart();
  }

  function bindSheetEvents(view) {
    $('sheetContent').querySelectorAll('[data-close-sheet]').forEach((btn) => {
      btn.addEventListener('click', closeSheet);
    });

    $('sheetContent').querySelectorAll('[data-open-sheet]').forEach((btn) => {
      btn.addEventListener('click', () => openSheet(btn.dataset.openSheet));
    });

    $('sheetContent').querySelectorAll('[data-coupon]').forEach((btn) => {
      btn.addEventListener('click', () => applyCouponFrom(btn.dataset.coupon));
    });

    $('sheetContent').querySelectorAll('[data-offer]').forEach((btn) => {
      btn.addEventListener('click', () => showToast('Offer selected: ' + btn.dataset.offer));
    });

    $('sheetContent').querySelectorAll('[data-item-id]').forEach((btn) => {
      btn.addEventListener('click', () => openDetail(+btn.dataset.itemId));
    });

    $('sheetContent').querySelectorAll('[data-toast]').forEach((el) => {
      el.addEventListener('click', () => showToast(el.dataset.toast));
    });

    $('sheetContent').querySelector('[data-toggle-theme]')?.addEventListener('click', toggleDarkMode);

    $('sheetContent').querySelector('[data-add-detail]')?.addEventListener('click', (e) => {
      addItem(+e.target.dataset.addDetail);
      closeSheet();
    });

    $('sheetContent').querySelectorAll('[data-fulfil]').forEach((btn) => {
      btn.addEventListener('click', () => setFulfil(btn.dataset.fulfil));
    });

    $('placeOrderBtn')?.addEventListener('click', placeOrder);
    $('bookTableBtn')?.addEventListener('click', bookTable);
    $('submitReviewBtn')?.addEventListener('click', submitReview);

    $('shareBtn')?.addEventListener('click', shareRestaurant);

    $('sheetContent').querySelectorAll('[data-table-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedTableId = +btn.dataset.tableId;
        openSheet('tableBooking');
      });
    });

    $('sheetContent').querySelectorAll('.star').forEach((star) => {
      star.addEventListener('click', () => rateReview(+star.dataset.val));
      star.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          rateReview(+star.dataset.val);
        }
      });
    });
  }

  function closeSheet() {
    $('overlay').classList.remove('show');
    $('sheet').classList.remove('show');
    $('sheet').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function setFulfil(type) {
    fulfilType = type;
    $('optDelivery')?.classList.toggle('active', type === 'delivery');
    $('optPickup')?.classList.toggle('active', type === 'pickup');
    const a = $('addressField');
    if (a) a.style.display = type === 'pickup' ? 'none' : 'block';
  }

  function placeOrder() {
    const name = $('custName').value.trim() || 'Guest';
    const address = $('custAddress')?.value.trim() || '';
    const total = cartTotal() - discountAmount();
    const orderNo = 'ORD-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
    const lines = Object.entries(cart)
      .map(([id, q]) => `${q} x ${findItem(+id).name} - ${money(findItem(+id).price * q)}`)
      .join('\n');
    const msg = `Hi ${CONFIG.name}, confirming order ${orderNo}\n\n${lines}\n\nTotal: ${money(total)}\nName: ${name}\n${fulfilType === 'delivery' ? 'Deliver to: ' + address : 'Pickup at store'}`;
    window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    showToast('Order prepared for WhatsApp');
    closeSheet();
  }

  function bookTable() {
    if (!selectedTableId) {
      showToast('Please select a table');
      return;
    }
    showToast('Table booking confirmed');
    closeSheet();
  }

  function rateReview(v) {
    document.querySelectorAll('.star').forEach((s) =>
      s.classList.toggle('active', +s.dataset.val <= v)
    );
  }

  function submitReview() {
    showToast('Thank you for your review');
    closeSheet();
  }

  async function shareRestaurant() {
    const shareData = {
      title: CONFIG.name,
      text: CONFIG.description,
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (_) {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Menu link copied to clipboard');
    } catch (_) {
      showToast('Share this page URL with friends');
    }
  }

  function toggleDarkMode() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('malabar_theme', next);
    showToast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
  }

  function showSlide(i) {
    document.querySelectorAll('.hero-slide').forEach((s, n) =>
      s.classList.toggle('active', n === i)
    );
    document.querySelectorAll('.hero-dots button').forEach((b, n) =>
      b.classList.toggle('active', n === i)
    );
    currentSlide = i;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % HERO_SLIDES.length);
  }

  function startSlideTimer() {
    if (slideTimer) clearInterval(slideTimer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      slideTimer = setInterval(nextSlide, 5000);
    }
  }

  function loadFavourites() {
    try {
      favourites = JSON.parse(localStorage.getItem('malabar_favs') || '[]');
    } catch (_) {
      favourites = [];
    }
  }

  function bindGlobalEvents() {
    $('overlay').addEventListener('click', closeSheet);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $('sheet').classList.contains('show')) closeSheet();
    });

    $('searchInput').addEventListener('input', handleSearch);
    $('clearSearch').addEventListener('click', clearSearch);

    document.querySelectorAll('.quick').forEach((btn) => {
      btn.addEventListener('click', () => {
        setQuick(btn);
        scrollToCat(btn.dataset.cat || 'all');
      });
    });

    document.querySelectorAll('[data-action]').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.dataset.action;
        if (action === 'home') {
          setNav(el);
          goHome();
        } else if (action === 'menu') {
          setNav(el);
          goToMenu();
        } else if (action === 'cart') {
          setNav(el);
          openSheet('cart');
        } else if (action === 'contact') {
          setNav(el);
          openSheet('contact');
        } else if (action === 'restaurant') {
          openSheet('restaurant');
        } else if (action === 'notifications') {
          openSheet('notifications');
        } else if (action === 'profile') {
          openSheet('profile');
        } else if (action === 'qr') {
          openSheet('qr');
        } else if (action === 'offers') {
          openSheet('offers');
        } else if (action === 'bestsellers') {
          openSheet('bestsellers');
        }
      });
    });

    $('desktopCoupon')?.parentElement?.querySelector('button')?.addEventListener('click', () =>
      applyCouponFrom('desktopCoupon')
    );

    $('desktopCheckout')?.addEventListener('click', () => openSheet('cart'));
  }

  function init() {
    loadFavourites();
    renderHero();
    renderOffers();
    renderCategories();
    renderBest();
    renderMenu();
    updateUI();
    bindGlobalEvents();
    startSlideTimer();

    const yearEl = $('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (localStorage.getItem('malabar_theme') === 'dark') {
      document.documentElement.dataset.theme = 'dark';
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
