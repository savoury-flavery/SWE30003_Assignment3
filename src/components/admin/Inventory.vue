<template>
  <div class="inventory-container">
    <Navbar />
    <h1>Inventory Management</h1>
    <div class="product-items">
      <div v-for="item in sortedByStock" :key="item.sku" class="product-item">
        <img :src="getImage(item.imageURL)" :alt="item.name" class="product-image" />
        <h2 class="product-name">{{ item.name }}</h2>
        <p class="product-stock">Stock Level: <strong>{{ item.stocklevel }}</strong></p>
        
        <input
          type="number"
          min="1"
          v-model.number="orderQuantities[item.sku]"
          placeholder="Order Qty"
          class="order-input"
        />
        <button class="stock-order" @click="placeOrder(item)">Place Order</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inventory',
  data() {
    return {
      products: [],
      orderQuantities: {}
    };
  },
  computed: {
    sortedByStock() {
      return [...this.products].sort((a, b) => a.stocklevel - b.stocklevel);
    }
  },
  methods: {
    getImage(imageURL) {
      return imageURL
        ? `http://localhost:3000/images/${imageURL}`
        : 'http://localhost:3000/images/placeholder.jpg';
    },
    placeOrder(item) {
      const quantity = this.orderQuantities[item.sku];
      if (!quantity || quantity <= 0) {
        alert('Please enter a valid order quantity.');
        return;
      }
      alert(`Placed an order for ${quantity} more of ${item.name}.`);
      // You can send this to backend here with fetch/axios if needed
    }
  },
  mounted() {
    fetch('http://localhost:3000/data/products')
      .then(res => res.json())
      .then(data => {
        this.products = data;
        // Initialize order quantities
        data.forEach(product => {
          this.orderQuantities[product.sku] = '';
        });
      })
      .catch(err => {
        console.error('Failed to load products:', err);
      });
  }
};
</script>

<style scoped>

.inventory-container {
  margin: auto;
  padding: 2rem;
  text-align: center;
}

.order-input {
  margin-top: 10px;
  padding: 8px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
}

.category-list {
  text-align: center;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

select {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.product-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  border: 2px solid white;
  padding: 15px;
  background-color: #e2f1f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: auto;
  border: 4px solid white;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 5px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #150725;
}

.stock-order {
  margin-top: 15px;
  padding: 12px 20px;
  background-color: #65a79d;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.stock-order:hover {
  background-color: #84c4aa;
  transform: scale(1.05);
}

.stock-order:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
