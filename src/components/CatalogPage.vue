<template>
  <div class="page catalog-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Product Catalog</h1>
        <p class="page-subtitle">Browse our complete collection</p>
      </div>

      <div class="catalog-filters">
        <button @click="$emit('filterByCategory', 'all')" 
                :class="{ active: selectedCategory === 'all' }" 
                class="filter-btn">
          All Products
        </button>
        <button @click="$emit('filterByCategory', 'men\'s clothing')" 
                :class="{ active: selectedCategory === 'men\'s clothing' }" 
                class="filter-btn">
          Men's Clothing
        </button>
        <button @click="$emit('filterByCategory', 'women\'s clothing')" 
                :class="{ active: selectedCategory === 'women\'s clothing' }" 
                class="filter-btn">
          Women's Clothing
        </button>
        <button @click="$emit('filterByCategory', 'jewelery')" 
                :class="{ active: selectedCategory === 'jewelery' }" 
                class="filter-btn">
          Jewelry
        </button>
        <button @click="$emit('filterByCategory', 'electronics')" 
                :class="{ active: selectedCategory === 'electronics' }" 
                class="filter-btn">
          Electronics
        </button>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>

      <div v-else class="catalog-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="catalog-card" @click="$emit('selectProduct', product)">
          <div class="catalog-image">
            <img :src="product.image" :alt="product.title" />
            <div class="catalog-overlay">
              <button @click.stop="$emit('quickAddToCart', product)" 
                      class="quick-add-btn"
                      :disabled="quickAddLoading">
                <span v-if="quickAddLoading" class="button-loading">
                  <div class="mini-spinner"></div>
                  Adding...
                </span>
                <span v-else>Quick Add</span>
              </button>
            </div>
          </div>
          <div class="catalog-info">
            <span class="catalog-category">{{ formatCategory(product.category) }}</span>
            <h3 class="catalog-title">{{ truncateTitle(product.title) }}</h3>
            <div class="catalog-rating">
              <div class="stars">
                <span v-for="star in 5" :key="star" 
                      class="star" 
                      :class="{ active: star <= Math.round(product.rating.rate) }">
                  ★
                </span>
              </div>
              <span class="rating-text">{{ product.rating.rate }}</span>
            </div>
            <div class="catalog-price">${{ product.price }}</div>
          </div>
        </div>
      </div>

      <ProductModal
        v-if="selectedProduct"
        :product="selectedProduct"
        :selectedColor="selectedColor"
        :modalActionLoading="modalActionLoading"
        @close="$emit('closeModal')"
        @selectColor="$emit('selectColor', $event)"
        @buyNow="$emit('buyNow')"
        @addToCart="$emit('addToCart')"
      />
    </div>
  </div>
</template>

<script>
import ProductModal from './ProductModal.vue'

export default {
  name: 'CatalogPage',
  components: {
    ProductModal
  },
  props: {
    loading: Boolean,
    quickAddLoading: Boolean,
    modalActionLoading: Boolean,
    filteredProducts: Array,
    selectedCategory: String,
    selectedProduct: Object,
    selectedColor: Object
  },
  methods: {
    formatCategory(category) {
      return category
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },

    truncateTitle(title, maxLength = 50) {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + '...';
    }
  }
}
</script>