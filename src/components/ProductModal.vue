<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button @click="$emit('close')" class="modal-close">×</button>
      <div class="modal-body">
        <div class="modal-image">
          <img :src="product.image" :alt="product.title" />
        </div>
        <div class="modal-info">
          <span class="modal-category">{{ formatCategory(product.category) }}</span>
          <h2 class="modal-title">{{ product.title }}</h2>
          <p class="modal-description">{{ product.description }}</p>
          
          <div class="color-palette">
            <h4>Available Colors:</h4>
            <div class="color-options">
              <div v-for="(color, index) in getProductColors(product.category)" 
                   :key="index"
                   class="color-swatch" 
                   :style="{ backgroundColor: color.hex }"
                   :title="color.name"
                   :class="{ selected: selectedColor.name === color.name }"
                   @click="$emit('selectColor', color)">
              </div>
            </div>
            <span class="selected-color">Selected: {{ selectedColor.name }}</span>
          </div>
          
          <div class="modal-rating">
            <div class="stars">
              <span v-for="star in 5" :key="star" 
                    class="star" 
                    :class="{ active: star <= Math.round(product.rating.rate) }">
                ★
              </span>
            </div>
            <span class="rating-text">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</span>
          </div>
          
          <div class="modal-price">${{ product.price }}</div>
          
          <div class="modal-actions">
            <button @click="$emit('buyNow')" 
                    class="btn btn-primary btn-large"
                    :disabled="modalActionLoading">
              <span v-if="modalActionLoading" class="button-loading">
                <div class="mini-spinner"></div>
                Processing...
              </span>
              <span v-else>Buy Now</span>
            </button>
            <button @click="$emit('addToCart')" 
                    class="btn btn-outline btn-large"
                    :disabled="modalActionLoading">
              <span v-if="modalActionLoading" class="button-loading">
                <div class="mini-spinner"></div>
                Adding...
              </span>
              <span v-else>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    product: Object,
    selectedColor: Object,
    modalActionLoading: Boolean
  },
  data() {
    return {
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
      }
    }
  },
  methods: {
    formatCategory(category) {
      return category
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },

    getProductColors(category) {
      const categoryKey = category.toLowerCase();
      return this.colorPalettes[categoryKey] || [
        { name: 'Default Blue', hex: '#4F46E5' },
        { name: 'Default Gray', hex: '#6b7280' },
        { name: 'Default Green', hex: '#10B981' }
      ];
    }
  }
}
</script>