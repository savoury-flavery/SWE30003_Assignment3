<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>

  <div class="shopping-cart">
    <h1>Your Shopping Cart</h1>

    <div v-if="cartItems.length > 0" class="cart-items">
      <div v-for="item in cartItems" :key="item.sku" class="cart-item">
        <img :src="getImage(item.imageURL)" :alt="item.productName" class="cart-item-image" />
        <div class="cart-item-details">
          <h2 class="cart-item-title">{{ item.productName }}</h2>
          <p class="cart-item-price">Unit Price: ${{ item.price.toFixed(2) }}</p>
          <p class="cart-item-price">Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}</p>

          <div class="quantity-controls">
            <button @click="decreaseQuantity(item.sku)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.sku)">+</button>
          </div>

          <button class="remove-button" @click="removeFromCart(item.sku)">Remove</button>
        </div>
      </div>

      <p class="cart-total">Total: ${{ totalPrice.toFixed(2) }}</p>
    </div>

    <div v-else>
      <p>Your cart is empty. Start shopping now!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ShoppingCart',
  computed: {
    ...mapGetters(['cartItems']),
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods: {
    ...mapActions(['increaseQuantity', 'decreaseQuantity', 'removeFromCart']),
    getImage(imageURL) {
      try {
        return require(`@/assets/images/${imageURL}`);
      } catch (error) {
        console.warn('Image not found:', imageURL);
        return '';
      }
    }
  }
};
</script>

<style scoped>
.shopping-cart {
  text-align: center;
  padding: 20px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 2px solid white;
  background-color: #FCE7C8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.cart-item-details {
  text-align: left;
  flex: 1;
}

.cart-item-title {
  font-size: 18px;
  font-weight: bold;
}

.cart-item-author {
  font-style: italic;
  color: #867662;
}

.cart-item-price {
  font-size: 16px;
  font-weight: bold;
  color: #150725;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-controls button {
  background-color: #B1C29E;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.quantity-controls button:hover {
  background-color: #4CAF50;
}

.remove-button {
  background-color: #F0A04B;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.remove-button:hover {
  background-color: #FADA7A;
}

.cart-total {
  align-self: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid white;
  background-color: #FCE7C8;
  border-radius: 8px;
  width: 14cm;
}
</style>
