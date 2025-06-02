<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>

  <div class="category-list">
    <h1>Product Catalogue</h1>

    <div class="filters">
      <label for="sortBy">Sort By: </label>
      <select v-model="sortBy" @change="sortItems" id="sortBy">
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="alphaAsc">A-Z</option>
        <option value="alphaDesc">Z-A</option>
      </select>
    </div>

    <div class="product-items">
      <div v-for="item in sortedProducts" :key="item.sku" class="product-item">
        <router-link :to="`/product/${item.sku}`">
          <img :src="getImage(item.imageURL)" :alt="item.name" class="product-image" />
        </router-link>
        <h2 class="product-name">{{ item.name }}</h2>
        <p class="product-price">${{ item.price.toFixed(2) }}</p>
        <button class="cart-button" @click="handleAddToCart(item)">Add to Cart</button> 
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CategoryList',
  data() {
    return {
      products: [],
      sortBy: 'priceAsc'
    };
  },
  computed: {
    filteredProducts() {
      const category = this.$route.params.category;
      if (category === 'all' || !category) return this.products;
      if (category === 'new') return this.products.filter(p => p.new === 'yes');
      return this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    },
    sortedProducts() {
      let sortedItems = [...this.filteredProducts];
      switch (this.sortBy) {
        case 'priceAsc': return sortedItems.sort((a, b) => a.price - b.price);
        case 'priceDesc': return sortedItems.sort((a, b) => b.price - a.price);
        case 'alphaAsc': return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        case 'alphaDesc': return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        default: return sortedItems;
      }
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    getImage(imageURL) {
      return imageURL
        ? `http://localhost:3000/images/${imageURL}`
        : require('../assets/images/placeholder.jpg');
    },
    handleAddToCart(item) {
      this.addToCart(item);
      alert(`${item.name} has been added to your cart!`);
    }
  },
  mounted() {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        this.products = data;
      })
      .catch(err => {
        console.error('Failed to load products:', err);
      });
  }
};
</script>


<style scoped>
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

.book-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.book-item {
  border: 2px solid white;
  padding: 15px;
  background-color: #FCE7C8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.book-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.book-image {
  width: 100%;
  height: auto;
  border: 4px solid white;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 5px;
}

.book-author {
  font-style: italic;
  color: #867662;
  margin-bottom: 5px;
}

.book-price {
  font-size: 16px;
  font-weight: bold;
  color: #150725;
}

.book-item button {
  margin-top: 15px;
  padding: 12px 20px;
  background-color: #F0A04B; 
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.book-item button:hover {
  background-color: #FADA7A; 
  transform: scale(1.05); 
}

.book-item button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
