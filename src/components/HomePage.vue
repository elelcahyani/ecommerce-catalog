<template>
  <div class="page home-page">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Discover Amazing Products</h1>
            <p class="hero-subtitle">Explore our curated collection of premium fashion, electronics, and jewelry. Find exactly what you're looking for with our modern shopping experience.</p>
          </div>
          <div class="hero-image">
            <div class="hero-graphic">
              <div class="floating-card card-1">🛍️</div>
              <div class="floating-card card-2">👕</div>
              <div class="floating-card card-3">💎</div>
              <div class="floating-card card-4">📱</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-product-section" id="preview">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Product</h2>
          <p class="section-subtitle">Discover our handpicked product of the moment</p>
        </div>
        
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Loading featured product...</p>
        </div>
        
        <div v-else-if="currentFeaturedProduct" class="featured-card-container">
          <div v-if="featuredProductLoading" class="featured-loading-overlay">
            <div class="featured-loading-spinner">
              <div class="loading-ring"></div>
              <div class="loading-ring"></div>
              <div class="loading-ring"></div>
            </div>
            <p class="loading-text">Loading next product...</p>
          </div>

          <div v-if="isProductAvailable(currentFeaturedProduct)" class="featured-card" @click="$emit('viewProduct', currentFeaturedProduct)">
            <div class="featured-image">
              <img :src="currentFeaturedProduct.image" :alt="currentFeaturedProduct.title" />
              <div class="featured-overlay">
                <span class="featured-action">View Details</span>
                <button @click.stop="$emit('quickAddToCart', currentFeaturedProduct)" 
                        class="featured-quick-add"
                        :disabled="quickAddLoading">
                  <span v-if="quickAddLoading" class="button-loading">
                    <div class="mini-spinner"></div>
                    Adding...
                  </span>
                  <span v-else>Add to Cart</span>
                </button>
              </div>
            </div>
            <div class="featured-info">
              <div class="featured-category-wrapper">
                <span class="featured-category">{{ formatCategory(currentFeaturedProduct.category) }}</span>
              </div>
              <h3 class="featured-title">{{ currentFeaturedProduct.title }}</h3>
              <div class="featured-rating">
                <div class="stars">
                  <span v-for="star in 5" :key="star" 
                        class="star" 
                        :class="{ active: star <= Math.round(currentFeaturedProduct.rating.rate) }">
                    ★
                  </span>
                </div>
                <span class="rating-text">{{ currentFeaturedProduct.rating.rate }} ({{ currentFeaturedProduct.rating.count }} reviews)</span>
              </div>
              <p class="featured-description">{{ truncateDescription(currentFeaturedProduct.description, 150) }}</p>
              <div class="featured-price">${{ currentFeaturedProduct.price }}</div>
            </div>
          </div>

          <div v-else class="featured-card unavailable-card">
            <div class="featured-image unavailable-image">
              <div class="unavailable-placeholder">
                <div class="unavailable-icon">🚫</div>
                <p class="unavailable-text">This product is unavailable to show</p>
              </div>
            </div>
            <div class="featured-info">
              <div class="featured-category-wrapper">
                <span class="featured-category unavailable-category">Unavailable</span>
              </div>
              <h3 class="featured-title unavailable-title">Product Unavailable</h3>
              <div class="featured-rating">
                <div class="stars">
                  <span v-for="star in 5" :key="star" class="star">☆</span>
                </div>
                <span class="rating-text">Not available for display</span>
              </div>
              <p class="featured-description">This product category is currently not available for preview.</p>
              <div class="featured-price unavailable-price">---</div>
              <button @click="$emit('nextFeaturedProduct')" class="next-product-btn">
                Next Product
              </button>
            </div>
          </div>
          
          <div class="featured-navigation">
            <button @click="$emit('previousFeaturedProduct')" class="featured-nav-btn prev-btn">
              ‹
            </button>
            <button @click="$emit('nextFeaturedProduct')" class="featured-nav-btn next-btn">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    loading: Boolean,
    featuredProductLoading: Boolean,
    quickAddLoading: Boolean,
    currentFeaturedProduct: Object,
    currentFeaturedIndex: Number,
    allProducts: Array
  },
  methods: {
    formatCategory(category) {
      return category
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },

    truncateDescription(description, maxLength = 150) {
      if (description.length <= maxLength) return description;
      return description.substring(0, maxLength) + '...';
    },

    truncateTitle(title, maxLength = 50) {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + '...';
    },

    isProductAvailable(product) {
      const availableCategories = ["men's clothing", "women's clothing"];
      return availableCategories.includes(product.category.toLowerCase());
    }
  }
}
</script>