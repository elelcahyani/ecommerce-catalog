<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <div class="nav-brand">
          <h1 class="brand-name">Our's Markt</h1>
          <span class="brand-tagline">Modern E-Commerce</span>
        </div>
        <div class="nav-menu">
          <button @click="currentPage = 'home'" :class="{ active: currentPage === 'home' }" class="nav-link">
            Home
          </button>
          <button @click="currentPage = 'catalog'" :class="{ active: currentPage === 'catalog' }" class="nav-link">
            Catalog
          </button>
          <button @click="currentPage = 'cart'" :class="{ active: currentPage === 'cart' }" class="nav-link cart-link">
            <span class="cart-icon">🛒</span>
            Cart
            <span v-if="cartItemsCount > 0" class="cart-badge">{{ cartItemsCount }}</span>
          </button>
        </div>
      </div>
    </nav>

    <HomePage 
      v-if="currentPage === 'home'"
      :loading="loading"
      :featuredProductLoading="featuredProductLoading"
      :quickAddLoading="quickAddLoading"
      :currentFeaturedProduct="currentFeaturedProduct"
      :currentFeaturedIndex="currentFeaturedIndex"
      :allProducts="allProducts"
      @goToCatalog="goToCatalog"
      @scrollToPreview="scrollToPreview"
      @viewProduct="viewProduct"
      @quickAddToCart="quickAddToCart"
      @nextFeaturedProduct="nextFeaturedProduct"
      @previousFeaturedProduct="previousFeaturedProduct"
    />

    <CatalogPage
      v-if="currentPage === 'catalog'"
      :loading="loading"
      :quickAddLoading="quickAddLoading"
      :modalActionLoading="modalActionLoading"
      :filteredProducts="filteredProducts"
      :selectedCategory="selectedCategory"
      :selectedProduct="selectedProduct"
      :selectedColor="selectedColor"
      @filterByCategory="filterByCategory"
      @selectProduct="selectProduct"
      @closeModal="closeModal"
      @selectColor="selectColor"
      @buyNow="buyNow"
      @addToCart="addToCart"
      @quickAddToCart="quickAddToCart"
    />

    <CartPage
      v-if="currentPage === 'cart'"
      :cartItems="cartItems"
      :totalItems="totalItems"
      :subtotal="subtotal"
      @goToCatalog="() => currentPage = 'catalog'"
      @updateQuantity="updateQuantity"
      @removeFromCart="removeFromCart"
      @checkout="checkout"
    />

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Our's Markt</h3>
            <p>Modern e-commerce experience built with Vue.js</p>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" @click="currentPage = 'home'">Home</a></li>
              <li><a href="#" @click="currentPage = 'catalog'">Catalog</a></li>
              <li><a href="#" @click="currentPage = 'cart'">Cart</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><a href="#" @click="goToCatalog('men\'s clothing')">Men's Clothing</a></li>
              <li><a href="#" @click="goToCatalog('women\'s clothing')">Women's Clothing</a></li>
              <li><a href="#" @click="goToCatalog('electronics')">Electronics</a></li>
              <li><a href="#" @click="goToCatalog('jewelery')">Jewelry</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 VIX Core Initiative - Rakamin Academy Final Task</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import CatalogPage from './components/CatalogPage.vue'
import CartPage from './components/CartPage.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    CatalogPage,
    CartPage
  },
  data() {
    return {
      currentPage: 'home',
      allProducts: [],
      featuredProducts: [],
      filteredProducts: [],
      selectedProduct: null,
      loading: false,
      previewLoading: false,
      carouselLoading: false,
      featuredProductLoading: false,
      quickAddLoading: false,
      modalActionLoading: false,
      selectedCategory: 'all',
      selectedColor: { name: 'Default', hex: '#4F46E5' },
      colorPalettes: {
        "men's clothing": [
          { name: 'Navy Blue', hex: '#1e3a8a' },
          { name: 'Charcoal', hex: '#374151' },
          { name: 'Forest Green', hex: '#065f46' },
          { name: 'Burgundy', hex: '#7c2d12' },
          { name: 'Steel Gray', hex: '#64748b' }
        ],
        "women's clothing": [
          { name: 'Rose Pink', hex: '#f43f5e' },
          { name: 'Lavender', hex: '#a855f7' },
          { name: 'Coral', hex: '#fb7185' },
          { name: 'Mint Green', hex: '#34d399' },
          { name: 'Peach', hex: '#fdba74' }
        ],
        "electronics": [
          { name: 'Space Gray', hex: '#4b5563' },
          { name: 'Silver', hex: '#d1d5db' },
          { name: 'Midnight Black', hex: '#111827' },
          { name: 'Electric Blue', hex: '#3b82f6' },
          { name: 'Tech Red', hex: '#dc2626' }
        ],
        "jewelery": [
          { name: 'Gold', hex: '#fbbf24' },
          { name: 'Rose Gold', hex: '#f59e0b' },
          { name: 'Silver', hex: '#e5e7eb' },
          { name: 'Platinum', hex: '#f3f4f6' },
          { name: 'Bronze', hex: '#92400e' }
        ]
      },
      cartItems: [],
      currentFeaturedIndex: 0,
      currentFeaturedProduct: null
    }
  },

  computed: {
    cartItemsCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },

  methods: {
    async fetchAllProducts() {
      try {
        this.loading = true;
        const response = await fetch('https://fakestoreapi.com/products');
        if (response.ok) {
          this.allProducts = await response.json();
          this.filteredProducts = [...this.allProducts];
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },

    filterByCategory(category) {
      this.selectedCategory = category;
      if (category === 'all') {
        this.filteredProducts = [...this.allProducts];
      } else {
        this.filteredProducts = this.allProducts.filter(product =>
          product.category.toLowerCase() === category.toLowerCase()
        );
      }
    },

    goToCatalog(category = 'all') {
      this.currentPage = 'catalog';
      this.filterByCategory(category);
    },

    viewProduct(product) {
      this.selectedProduct = product;
      this.initializeColorSelection();
      this.currentPage = 'catalog';
    },

    selectProduct(product) {
      this.selectedProduct = product;
      this.initializeColorSelection();
    },

    closeModal() {
      this.selectedProduct = null;
    },

    getProductColors(category) {
      const categoryKey = category.toLowerCase();
      return this.colorPalettes[categoryKey] || [
        { name: 'Default Blue', hex: '#4F46E5' },
        { name: 'Default Gray', hex: '#6b7280' },
        { name: 'Default Green', hex: '#10B981' }
      ];
    },

    selectColor(color) {
      this.selectedColor = color;
    },

    initializeColorSelection() {
      if (this.selectedProduct) {
        const colors = this.getProductColors(this.selectedProduct.category);
        this.selectedColor = colors[0] || { name: 'Default', hex: '#4F46E5' };
      }
    },

    scrollToPreview() {
      const previewSection = document.getElementById('preview');
      if (previewSection) {
        previewSection.scrollIntoView({ behavior: 'smooth' });
      }
    },

    async buyNow() {
      if (!this.selectedProduct) return;
      try {
        this.modalActionLoading = true;
        await new Promise(resolve => setTimeout(resolve, 1200));
        const orderDetails = {
          product: this.selectedProduct.title,
          price: this.selectedProduct.price,
          color: this.selectedColor.name,
          productId: this.selectedProduct.id
        };
        alert(`🛒 Purchase Initiated!\n\nProduct: ${orderDetails.product}\nColor: ${orderDetails.color}\nPrice: ${orderDetails.price}\n\nRedirecting to checkout...`);
        console.log('Order Details:', orderDetails);
        this.closeModal();
      } catch (error) {
        console.error('Error processing purchase:', error);
        alert('❌ Failed to process purchase. Please try again.');
      } finally {
        this.modalActionLoading = false;
      }
    },

    async addToCart() {
      if (!this.selectedProduct) return;
      try {
        this.modalActionLoading = true;
        await new Promise(resolve => setTimeout(resolve, 1000));
        const cartItem = {
          id: this.selectedProduct.id,
          title: this.selectedProduct.title,
          price: this.selectedProduct.price,
          image: this.selectedProduct.image,
          category: this.selectedProduct.category,
          color: this.selectedColor.name,
          quantity: 1
        };
        const existingItemIndex = this.cartItems.findIndex(item =>
          item.id === cartItem.id && item.color === cartItem.color
        );
        if (existingItemIndex > -1) {
          this.cartItems[existingItemIndex].quantity += 1;
        } else {
          this.cartItems.push(cartItem);
        }
        this.saveCartToStorage();
        alert(`✅ Added to Cart!\n\n${cartItem.title}\nColor: ${cartItem.color}\n\nCart items: ${this.cartItemsCount}`);
        this.closeModal();
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('❌ Failed to add item to cart. Please try again.');
      } finally {
        this.modalActionLoading = false;
      }
    },

    async quickAddToCart(product) {
      try {
        this.quickAddLoading = true;
        await new Promise(resolve => setTimeout(resolve, 800));
        const colors = this.getProductColors(product.category);
        const defaultColor = colors[0] || { name: 'Default', hex: '#4F46E5' };
        const cartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          color: defaultColor.name,
          quantity: 1
        };
        const existingItemIndex = this.cartItems.findIndex(item =>
          item.id === cartItem.id && item.color === cartItem.color
        );
        if (existingItemIndex > -1) {
          this.cartItems[existingItemIndex].quantity += 1;
        } else {
          this.cartItems.push(cartItem);
        }
        this.saveCartToStorage();
        alert(`✅ Quick Added to Cart!\n\n${cartItem.title}\nColor: ${cartItem.color}`);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('❌ Failed to add item to cart. Please try again.');
      } finally {
        this.quickAddLoading = false;
      }
    },

    updateQuantity(item, change) {
      const itemIndex = this.cartItems.findIndex(cartItem =>
        cartItem.id === item.id && cartItem.color === item.color
      );
      if (itemIndex > -1) {
        this.cartItems[itemIndex].quantity += change;
        if (this.cartItems[itemIndex].quantity <= 0) {
          this.cartItems.splice(itemIndex, 1);
        }
        this.saveCartToStorage();
      }
    },

    removeFromCart(item) {
      const itemIndex = this.cartItems.findIndex(cartItem =>
        cartItem.id === item.id && cartItem.color === item.color
      );
      if (itemIndex > -1) {
        this.cartItems.splice(itemIndex, 1);
        this.saveCartToStorage();
      }
    },

    saveCartToStorage() {
      localStorage.setItem('ours-markt-cart', JSON.stringify(this.cartItems));
    },

    loadCartFromStorage() {
      const savedCart = localStorage.getItem('ours-markt-cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    },

    checkout() {
      if (this.cartItems.length === 0) return;
      const orderSummary = {
        items: this.cartItems,
        totalItems: this.totalItems,
        subtotal: this.subtotal.toFixed(2),
        orderDate: new Date().toISOString()
      };
      alert(`🛒 Checkout Initiated!\n\nTotal Items: ${orderSummary.totalItems}\nTotal Amount: ${orderSummary.subtotal}\n\nRedirecting to payment...`);
      console.log('Order Summary:', orderSummary);
      this.cartItems = [];
      this.saveCartToStorage();
    },

    initializeFeaturedProduct() {
      if (this.allProducts.length > 0) {
        this.currentFeaturedIndex = Math.floor(Math.random() * this.allProducts.length);
        this.currentFeaturedProduct = this.allProducts[this.currentFeaturedIndex];
      }
    },

    async nextFeaturedProduct() {
      if (this.allProducts.length > 0) {
        try {
          this.featuredProductLoading = true;
          await new Promise(resolve => setTimeout(resolve, 600));
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * this.allProducts.length);
          } while (newIndex === this.currentFeaturedIndex && this.allProducts.length > 1);
          this.currentFeaturedIndex = newIndex;
          this.currentFeaturedProduct = this.allProducts[this.currentFeaturedIndex];
        } catch (error) {
          console.error('Error loading next product:', error);
        } finally {
          this.featuredProductLoading = false;
        }
      }
    },

    async previousFeaturedProduct() {
      if (this.allProducts.length > 0) {
        try {
          this.featuredProductLoading = true;
          await new Promise(resolve => setTimeout(resolve, 600));
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * this.allProducts.length);
          } while (newIndex === this.currentFeaturedIndex && this.allProducts.length > 1);
          this.currentFeaturedIndex = newIndex;
          this.currentFeaturedProduct = this.allProducts[this.currentFeaturedIndex];
        } catch (error) {
          console.error('Error loading previous product:', error);
        } finally {
          this.featuredProductLoading = false;
        }
      }
    }
  },

  async created() {
    this.loadCartFromStorage();
    await this.fetchAllProducts();
    this.initializeFeaturedProduct();
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.selectedProduct) {
        this.closeModal();
      }
    });
  }
}
</script>

<style>
@import './assets/styles.css';
</style>