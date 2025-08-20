
// 🌿 Filipino veggies – ₱ PHP
const products = [
  {
    name: 'Malunggay',
    price: 18,
    tags: ['organic'],
    category: 'Leafy Greens',
    img: '/images/malunggay.jpg'
  },
  {
    name: 'Kangkong',
    price: 15,
    tags: ['organic', 'fresh'],
    category: 'Leafy Greens',
    img: '/images/kangkong.jfif'
  },
  {
    name: 'Pechay',
    price: 20,
    tags: ['fresh'],
    category: 'Leafy Greens',
    img: '/images/pechay.jpg'
  },
  {
    name: 'Sitaw',
    price: 25,
    tags: ['organic'],
    category: 'Vegetables',
    img: '/images/sitaw.png'
  },
  {
    name: 'Talong',
    price: 30,
    tags: ['fresh'],
    category: 'Vegetables',
    img: '/images/talong.jpg'
  },
  {
    name: 'Kamatis',
    price: 28,
    tags: ['organic', 'ripe'],
    category: 'Fruits & Vegetables',
    img: '/images/kamatis.jpg'
  },
  {
    name: 'Kalabasa',
    price: 35,
    tags: ['fresh', 'organic'],
    category: 'Vegetables',
    img: '/images/kalabasa.jpg'
  },
  {
    name: 'Ampalaya',
    price: 40,
    tags: ['organic'],
    category: 'Vegetables',
    img: '/images/ampalaya.png'
  },
  {
    name: 'Okra',
    price: 22,
    tags: ['fresh'],
    category: 'Vegetables',
    img: '/images/okra.jpg'
  },
  {
    name: 'Upo',
    price: 25,
    tags: ['organic', 'fresh'],
    category: 'Vegetables',
    img: '/images/upo.jpg'
  },
  {
    name: 'Patola',
    price: 28,
    tags: ['organic'],
    category: 'Vegetables',
    img: '/images/patola.jpg'
  },
  {
    name: 'Sayote',
    price: 18,
    tags: ['fresh'],
    category: 'Vegetables',
    img: '/images/sayote.jpg'
  },
  {
    name: 'Labanos',
    price: 30,
    tags: ['organic'],
    category: 'Root Crops',
    img: '/images/labanos.jpg'
  },
  {
    name: 'Singkamas',
    price: 32,
    tags: ['fresh'],
    category: 'Root Crops',
    img: '/images/singkamas.jpg'
  },
  {
    name: 'Camote',
    price: 40,
    tags: ['organic', 'sweet'],
    category: 'Root Crops',
    img: '/images/camote.jpg'
  },
  {
    name: 'Luya',
    price: 60,
    tags: ['organic', 'spice'],
    category: 'Root Crops',
    img: '/images/luya.jpg'
  },
  {
    name: 'Bawang',
    price: 120,
    tags: ['organic', 'spice'],
    category: 'Condiments',
    img: '/images/bawang.jpg'
  },
  {
    name: 'Sibuyas',
    price: 140,
    tags: ['fresh', 'spice'],
    category: 'Condiments',
    img: '/images/sibuyas.jpg'
  },
  {
    name: 'Siling Labuyo',
    price: 80,
    tags: ['spice', 'hot'],
    category: 'Condiments',
    img: '/images/silinglabuyo.jpg'
  },
  {
    name: 'Pipino',
    price: 25,
    tags: ['organic', 'fresh'],
    category: 'Vegetables',
    img: '/images/pipino.jpg'
  }

];

let cart = [];
let activeTags = [];

// Render cards
function render(list = products) {
  const grid = document.getElementById('products');
  grid.innerHTML = list.map(p => `
    <div class="card">
   <a href="product-detail.html?name=${encodeURIComponent(p.name)}">
     <img src="${p.img}" alt="${p.name}" loading="lazy"/>
   </a>
   <div class="card-body">
     <a href="product-detail.html?name=${encodeURIComponent(p.name)}"
        style="text-decoration:none;color:inherit">
        <h4>${p.name}</h4>
     </a>
     <span class="price">₱${p.price}</span>
     <button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
   </div>
 </div>
  `).join('');
}

// Cart helpers
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}
function updateCart() {
  const cartEl = document.getElementById('cart');
  const count = document.getElementById('cart-count');
  const items = document.getElementById('cart-items');
  count.textContent = cart.length;
  items.innerHTML = cart.map((item, idx) =>
    `<li>${item.name} – ₱${item.price}
       <span onclick="removeFromCart(${idx})" style="cursor:pointer;color:red;margin-left:8px;">×</span>
     </li>`
  ).join('');
  cartEl.classList.add('show');
}
function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCart();
}

// Filters
function filterProducts() {
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category').value;
  let filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search);
    const matchCat = category === 'all' || p.category === category;
    const matchTag = activeTags.length === 0 || activeTags.every(t => p.tags.includes(t));
    return matchSearch && matchCat && matchTag;
  });
  render(filtered);
}
function toggleTag(btn, tag) {
  btn.classList.toggle('active');
  activeTags = [...document.querySelectorAll('.tags .active')].map(b => b.textContent.trim());
  filterProducts();
}

// Checkout
function checkout() {
  alert('Proceeding to payment (COD / Card coming soon)');
}

// Scroll
function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

/* ---------- ACCUMULATOR CART ---------- */
function addToCart(name, price) {
  const found = cart.find(i => i.name === name);
  found ? found.qty++ : cart.push({ name, price, qty: 1 });
  updateCart();
}
function updateCart() {
  const list   = document.getElementById('cart-items');
  const total  = document.getElementById('cart-total');
  const count  = document.getElementById('cart-count');

  list.innerHTML = cart.map(
  (item, idx) =>
    `<li>
       ${item.name} – ₱${item.price} × ${item.qty}
       <span class="item-controls">
         <button class="minus" onclick="changeQty(${idx},-1)">-</button>
         <button class="plus"  onclick="changeQty(${idx},1)">+</button>
         <button class="remove" onclick="removeItem(${idx})">×</button>
       </span>
     </li>`
).join('');

  const grand = cart.reduce((t, i) => t + i.price * i.qty, 0);
  total.textContent = '₱' + grand;
  count.textContent = cart.reduce((c, i) => c + i.qty, 0);

  document.getElementById('cart').classList.toggle('show', cart.length > 0);
}
function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty < 1) cart.splice(idx, 1);
  updateCart();
}
function removeItem(idx) {
  cart.splice(idx, 1);
  updateCart();
}
function closeCart() {
  document.getElementById('cart').classList.remove('show');
}

/* ----- My Orders page navigation ----- */
function openOrders () {
  if (!localStorage.getItem('currentUser')) {
    alert('Please log in first');
    // Optional: open your login modal instead
    return;
  }
  window.location.href = 'my-orders.html';
}



// Init
render();
