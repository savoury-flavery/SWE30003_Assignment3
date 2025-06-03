<template>
  <div class="search-results">
    <h1>Search Results</h1>

    <div class="filters">
      <label for="sortBy">Sort By:</label>
      <select v-model="sortBy" @change="sortItems" id="sortBy">
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="alphaAsc">A-Z</option>
        <option value="alphaDesc">Z-A</option>
      </select>
    </div>

    <div v-if="sortedProducts.length" class="product-items">
      <div v-for="item in sortedProducts" :key="item.sku" class="product-item">
        <img :src="getImage(item.imageURL)" :alt="item.name" class="product-image" />
        <h2 class="product-title">{{ item.name }}</h2>
        <p class="product-price">${{ item.price.toFixed(2) }}</p>
        <button class="cart-button" @click="handleAddToCart(item)">Add to Cart</button>
      </div>
    </div>
    <div v-else>
      <p>No products found matching your search.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SearchResults',

  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },

computed: {
  ...mapGetters(['products']),

filteredProducts() {
  const query = this.searchQuery?.toLowerCase() || '';
  return this.products.filter(product => {
    const name = product.name?.toLowerCase() || '';
    const desc = product.description?.toLowerCase() || '';
    return name.includes(query) || desc.includes(query);
  });
},

  sortedProducts() {
    return [...this.filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }
}
}
</script>


<style scoped>
.search-results{
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

.cart-button {
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

.cart-button:hover {
  background-color: #84c4aa;
  transform: scale(1.05);
}

.cart-button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
