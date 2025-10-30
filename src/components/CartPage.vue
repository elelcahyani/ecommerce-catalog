<template>
  <div class="page cart-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Shopping Cart</h1>
        <p class="page-subtitle">Review your selected items</p>
      </div>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart</p>
        <button @click="$emit('goToCatalog')" class="btn btn-primary">
          Browse Products
        </button>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id + '-' + item.color" class="cart-item">
            <div class="cart-item-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="cart-item-info">
              <h3 class="cart-item-title">{{ item.title }}</h3>
              <p class="cart-item-color">Color: {{ item.color }}</p>
              <div class="cart-item-price">${{ item.price }}</div>
            </div>
            <div class="cart-item-controls">
              <div class="quantity-controls">
                <button @click="$emit('updateQuantity', item, -1)" class="quantity-btn">-</button>
                <span class="quantity">{{ item.quantity }}</span>
                <button @click="$emit('updateQuantity', item, 1)" class="quantity-btn">+</button>
              </div>
              <button @click="$emit('removeFromCart', item)" class="remove-btn">Remove</button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            <div class="summary-line">
              <span>Subtotal ({{ totalItems }} items)</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-line total">
              <span>Total</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <button @click="$emit('checkout')" class="btn btn-primary btn-large checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartPage',
  props: {
    cartItems: Array,
    totalItems: Number,
    subtotal: Number
  }
}
</script>