window.MALABAR_DATA = {
  categories: [
    { key: 'sadya', name: "Today's Sadya", color: '#e8a72e' },
    { key: 'curries', name: 'Curries & Fry', color: '#ff5a36' },
    { key: 'breads', name: 'Breads', color: '#5f9a55' },
    { key: 'sweets', name: 'Sweets & Chai', color: '#9162a5' },
    { key: 'beverages', name: 'Beverages', color: '#218c8e' },
    { key: 'starters', name: 'Starters & Snacks', color: '#d77a2e' }
  ],
  items: [
    { id: 1, cat: 'sadya', name: 'Onam Sadya Thali', desc: 'Rice, sambar, avial, thoran, pachadi, payasam', price: 220, veg: true, best: true },
    { id: 2, cat: 'sadya', name: 'Curd Rice Bowl', desc: 'Creamy curd rice with tempering and pickle', price: 120, veg: true },
    { id: 3, cat: 'sadya', name: 'Kerala Meals', desc: 'Traditional rice meal with seasonal sides', price: 180, veg: true, best: true },
    { id: 4, cat: 'curries', name: 'Fish Moilee', desc: 'Kerala-style fish curry with coconut milk', price: 260, veg: false, best: true },
    { id: 5, cat: 'curries', name: 'Karimeen Pollichathu', desc: 'Pearl spot wrapped in banana leaf and grilled', price: 420, veg: false, best: true },
    { id: 6, cat: 'curries', name: 'Chicken Curry', desc: 'Classic Malabar chicken curry with roasted spices', price: 240, veg: false },
    { id: 7, cat: 'curries', name: 'Beef Ularthiyathu', desc: 'Slow-cooked beef with coconut and spices', price: 280, veg: false, best: true },
    { id: 8, cat: 'breads', name: 'Appam', desc: 'Soft-centred lace pancakes, freshly made', price: 35, veg: true, best: true },
    { id: 9, cat: 'breads', name: 'Malabar Parotta', desc: 'Flaky layered flatbread', price: 25, veg: true },
    { id: 10, cat: 'breads', name: 'Pathiri', desc: 'Soft rice flatbread', price: 30, veg: true },
    { id: 11, cat: 'sweets', name: 'Palada Pradhaman', desc: 'Traditional payasam with milk, rice ada and sugar', price: 110, veg: true, best: true },
    { id: 12, cat: 'sweets', name: 'Unniyappam', desc: 'Sweet rice and banana fritters', price: 80, veg: true },
    { id: 13, cat: 'sweets', name: 'Chai', desc: 'Strong Kerala tea with cardamom', price: 30, veg: true },
    { id: 14, cat: 'beverages', name: 'Fresh Lime Soda', desc: 'Refreshing lime with soda and mint', price: 70, veg: true },
    { id: 15, cat: 'beverages', name: 'Mango Lassi', desc: 'Thick creamy mango yoghurt drink', price: 120, veg: true },
    { id: 16, cat: 'beverages', name: 'Tender Coconut', desc: 'Fresh chilled tender coconut water', price: 90, veg: true },
    { id: 17, cat: 'starters', name: 'Chicken 65', desc: 'Spicy deep-fried chicken', price: 220, veg: false, best: true },
    { id: 18, cat: 'starters', name: 'Gobi Manchurian', desc: 'Crispy cauliflower in Chinese sauce', price: 160, veg: true },
    { id: 19, cat: 'starters', name: 'Prawns Fry', desc: 'Butter-garlic tossed prawns', price: 280, veg: false, best: true }
  ],
  offers: [
    { name: 'Weekend Special', discount: '20%', desc: '20% off on all curries', validTill: '31 Aug 2026' },
    { name: 'BOGO on Appam', discount: 'BOGO', desc: 'Buy 1 Get 1 free on Appam', validTill: '15 Jul 2026' },
    { name: 'Diwali Feast', discount: '25%', desc: '25% off on your entire order', validTill: '31 Oct 2026' },
    { name: 'Happy Hour', discount: '₹50', desc: '₹50 off on all beverages', validTill: '30 Jul 2026' },
    { name: 'Student Discount', discount: '15%', desc: '15% off with valid ID', validTill: '31 Dec 2026' }
  ],
  coupons: [
    { code: 'FEAST30', discount: '30% off', validTill: '31 Dec 2026' },
    { code: 'WELCOME15', discount: '15% off', validTill: '15 Aug 2026' },
    { code: 'SUMMER10', discount: '₹10 off', validTill: '30 Jun 2026' }
  ],
  reviews: [
    { customer: 'Anand Krishnan', rating: 5, text: 'Authentic Kerala taste! The Sadya was divine.', date: '12 Jul 2026' },
    { customer: 'Meera Nair', rating: 4, text: 'Fish Moilee was superb. Will come again.', date: '11 Jul 2026' },
    { customer: 'Suresh Kumar', rating: 5, text: 'Best restaurant in Kochi. Highly recommend.', date: '10 Jul 2026' }
  ],
  tables: [
    { id: 1, name: 'A-01', status: 'available' },
    { id: 2, name: 'A-02', status: 'occupied' },
    { id: 3, name: 'A-03', status: 'reserved' },
    { id: 4, name: 'B-01', status: 'available' },
    { id: 5, name: 'B-02', status: 'available' },
    { id: 6, name: 'C-01', status: 'available' }
  ],
  notifications: [
    { icon: '✅', msg: 'Your order #ORD-2607-1234 has been delivered.', time: '2 hours ago' },
    { icon: '🔥', msg: 'Weekend Special: 20% off all curries!', time: '5 hours ago' },
    { icon: '⏳', msg: 'Your order #ORD-2607-1235 is being prepared.', time: '1 day ago' },
    { icon: '🎉', msg: 'Welcome to Malabar Table! Enjoy your meal.', time: '2 days ago' }
  ],
  heroSlides: [
    {
      seed: 'kerala-feast',
      alt: 'Kerala feast spread with traditional dishes',
      eyebrow: 'Authentic Kerala flavours',
      title: 'Good food.<br>Good mood.',
      text: 'Explore traditional favourites, modern comfort food and chef-curated specials made for sharing.',
      primary: { label: 'Explore Menu', action: 'menu' },
      secondary: { label: 'About Restaurant', action: 'restaurant' }
    },
    {
      seed: 'seafood-feast',
      alt: 'Fresh seafood platter from the Kerala coast',
      eyebrow: 'Fresh from the coast',
      title: 'Flavours worth<br>coming back for.',
      text: 'From Karimeen to prawns, discover our most-loved coastal specials.',
      primary: { label: 'Order Now', action: 'menu' }
    },
    {
      seed: 'palada-dessert',
      alt: 'Traditional Kerala dessert payasam',
      eyebrow: 'Sweet tooth',
      title: 'End your meal<br>on a sweet note.',
      text: 'Traditional desserts, chai and handcrafted favourites.',
      primary: { label: 'View Sweets', action: 'sweets' }
    }
  ]
};
