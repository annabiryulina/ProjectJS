
import '../style/style.scss';

function navigate(page) { 
    const content = document.getElementById("content");
    
    switch(page) {
      case 'home':
        content.innerHTML = '<h1>Welcome to MyShop!</h1><p>Browse our amazing products!</p>';
        break;
      case 'shop':
        loadShopPage();  
        break;
      case 'products':
        content.innerHTML = '<h1>Products</h1><p>Here are some products for you.</p>';
        break;
      case 'pages':
        content.innerHTML = '<h1>Pages</h1><p>Learn more about our site.</p>';
        break;
      default:
        content.innerHTML = '<h1>Welcome to MyShop!</h1><p>Browse our amazing products!</p>';
    }
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
      
      event.preventDefault();
      
      
      const page = link.getAttribute('data-page');
      navigate(page);
    });
  }); 


  
  function handleSearch() {
    alert("Searching...");
  }
  
  function handleProfile() {
    alert("Profile clicked");
  }
  
  function handleFavorites() {
    alert("Favorites clicked");
  }
  
  function handleCart() {
    alert("Cart clicked");
  }
  
  
  let products = [];
  let filteredProducts = [];
  let categories = [];
  let currentPage = 1; 
  const productsPerPage = 9;  
  
  async function loadShopPage() {
    const content = document.getElementById("content");
    content.innerHTML = `
      <h1>Shop</h1>
      <div class="container">
        <div class="sidebar">
          <h2>Filters</h2>
  
          <!-- Category Filter (dynamically populated) -->
          <div class="filter">
            <h3>Category</h3>
            <select id="category-filter">
              <option value="all">All</option>
            </select>
          </div>
  
          <!-- Price Filter -->
          <div class="filter">
            <h3>Price</h3>
            <label for="min-price">Min Price:</label>
            <input type="number" id="min-price" placeholder="0" />
            
            <label for="max-price">Max Price:</label>
            <input type="number" id="max-price" placeholder="1000" />
  
            <button onclick="applyFilters()">Apply Filters</button>
          </div>
        </div>
  
        <div class="product-list" id="product-list"></div>
        <div class="pagination" id="pagination"></div>
      </div>
    `;
  
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('min-price').addEventListener('input', applyFilters);
    document.getElementById('max-price').addEventListener('input', applyFilters);
  
  
    await fetchCategories();
    await fetchProducts();  
  }
  
  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      categories = await response.json();
  
  
      const categorySelect = document.getElementById('category-filter');
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1); 
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
  
  async function fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      products = data;  
      filteredProducts = products;  
      applyFilters();  
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  function displayProducts(productsToDisplay) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  
  
    if (productsToDisplay.length === 0) {
      productList.innerHTML = '<p>No products available</p>';
    }
  
    productsToDisplay.forEach(product => {
      const imageUrl = product.image || 'images/default-image.jpg'; 
  
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${imageUrl}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <div class="quantity-controls">
          <button class="quantity-btn decrease" data-id="${product.id}" data-action="decrease">-</button>
          <span class="quantity" id="quantity-${product.id}">0</span>
          <button class="quantity-btn increase" data-id="${product.id}" data-action="increase">+</button>
        </div>
  
        <!-- Add to Cart -->
        <button class="add-to-cart-btn" data-id="${product.id}">
      🛒
       </button>
       `;
  
      productList.appendChild(productCard);
    });
    addEventListeners();
  }
  
  function displayPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
  
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
   
  
    
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => goToPage(i));
      pagination.appendChild(button);
    }
  }
  
  function goToPage(page) {
    currentPage = page;
  
    const start = (currentPage - 1) * productsPerPage;
    const end = currentPage * productsPerPage;
  
    const productsToDisplay = filteredProducts.slice(start, end);
    displayProducts(productsToDisplay);
  }
  
  function applyFilters() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const category = document.getElementById('category-filter').value;
  
    if (minPrice < 0) {
      document.getElementById('min-price').value = 0;
    }
  
    if (maxPrice < 0) {
      document.getElementById('max-price').value = 0;
    }
  
    let filtered = products;
  
   
    if (category !== 'all') {
      filtered = products.filter(product => product.category === category);
    }
  
   
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
  
    filteredProducts = filtered; 
  
    
    displayProducts(filteredProducts.slice(0, productsPerPage));  
    displayPagination();  
  }
  
  navigate('home');
  
  
  function addEventListeners() {
    
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
  
    decreaseButtons.forEach(button => {
      button.addEventListener('click', () => updateQuantity(button, 'decrease'));
    });
  
    increaseButtons.forEach(button => {
      button.addEventListener('click', () => updateQuantity(button, 'increase'));
    });
  
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => addToCart(button));
    });
  }
  
  function updateQuantity(button, action) {
    const productId = button.dataset.id;
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
  
    if (action === 'increase') {
      quantity++;
    } else if (action === 'decrease' && quantity > 0) {  
      quantity--;
    }
  
    quantityElement.textContent = quantity;
  }
  
  
  function addToCart(button) {
    const productId = button.dataset.id;
    const quantityElement = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 0) {
      alert(`Товар  ${productId} добавлен в корзину с количеством ${quantity}`);
    } else {
      alert('Количество товара должно быть больше 0 для добавления в корзину.');
    }
  }