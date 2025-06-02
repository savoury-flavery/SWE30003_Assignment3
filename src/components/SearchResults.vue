<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>

  <div class="search-results">
    <h1>Search Results</h1>

    <!-- Filter dropdown for sorting -->
    <div class="filters">
      <label for="sortBy">Sort By: </label>
      <select v-model="sortBy" @change="sortItems" id="sortBy">
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="alphaAsc">A-Z</option>
        <option value="alphaDesc">Z-A</option>
      </select>
    </div>

    <!-- Product items -->
    <div class="product-items">
      <div v-for="item in sortedItems" :key="item.id" class="product-item">
        <img :src="getImage(item.imageURL)" :alt="item.name" class="product-image" />
        <h2 class="product-title">{{ item.name }}</h2>
        <p class="product-price">${{ item.price.toFixed(2) }}</p>
        <button class="cart-button" @click="handleAddToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SearchResults',
  data() {
    return {
      sortBy: 'priceAsc',
      searchQuery: this.$route.query.q || ''
    };
  },
  computed: {
    ...mapState(['products']),
    
    filteredItems() {
      const search = this.searchQuery.toLowerCase();
      return this.products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        (p.description && p.description.toLowerCase().includes(search))
      );
    },

    sortedItems() {
      let sorted = [...this.filteredItems];
      if (this.sortBy === 'priceAsc') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'priceDesc') {
        sorted.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === 'alphaAsc') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortBy === 'alphaDesc') {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      }
      return sorted;
    }
  },
  methods: {
    ...mapActions(['addToCart']),

    handleAddToCart(item) {
      this.addToCart(item);
      alert(`${item.name} has been added to your cart!`);
    },

    getImage(imageURL) {
      try {
        return new URL(`../assets/images/${imageURL}`, import.meta.url).href;
      } catch {
        return ''; // fallback or default image if needed
      }
    }
  }
};
</script>

