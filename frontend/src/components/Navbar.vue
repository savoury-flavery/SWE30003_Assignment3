<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/home" class="nav-item"><strong>AWE Electronics</strong></router-link>

      <div class="nav-item dropdown">
        <span class="dropbtn">Categories</span>
        <div class="dropdown-content">
          <router-link to="/categories/all">All</router-link>
          <router-link to="/categories/new">New</router-link>
          <router-link to="/categories/laptops">Laptops & Computers</router-link>
          <router-link to="/categories/cameras">Cameras</router-link>
          <router-link to="/categories/phones">Mobile Phones</router-link>
          <router-link to="/categories/appliances">Home Appliances</router-link>
        </div>
      </div>
    </div>

    <div class="search-container">
      <input type="text" placeholder="Search..." v-model="searchQuery" @keyup.enter="searchProduct" />
      <button @click="searchProduct">Search</button>
    </div>

    <div class="account-cart">
      <router-link v-if="!currentUser" to="/accounts" class="nav-item">Log In</router-link>
      <router-link v-else to="/account" class="nav-item">Account</router-link>
      <router-link to="/cart" class="nav-item">🛒 Cart</router-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    searchProduct() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery } });
        this.searchQuery = '';
      }
    }
  }
};
</script>

 <style scoped>
 /* General Navbar Styles */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #65a79d;
  padding: 10px 20px;
  color: #150725;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-radius: 5px;
}

/* Logo */
.logo img {
  height: 65px;
  padding: 5px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 15px;
}

.nav-item {
  color: #eee6f8;
  text-decoration: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: #84c4aa;
  border-radius: 5px;
}

/* allows the category dropdown to blend in */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  color: #eee6f8;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropbtn:hover {
  background-color: #84c4aa;
  border-radius: 5px;
}

/* Dropdown Content */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-content a {
  color: #150725;
  padding: 10px;
  display: block;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.dropdown-content a:hover {
  background-color: #84c4aa;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Search Bar */
.search-container {
  display: flex;
  gap: 5px;
}

.search-container input {
  padding: 5px;
  border: solid;
  border-color: #84c4aa;
  border-radius: 3px;
}

.search-container button {
  background-color: #84c4aa;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.search-container button:hover {
  background-color: #6dc1b4;
}

/* Account & Cart */
.account-cart a {
  color: #eee6f8;
  text-decoration: none;
  margin-left: 15px;
  padding: 8px 12px;
  transition: background-color 0.3s ease;
}

.account-cart a:hover {
  background-color: #84c4aa;
  border-radius: 5px;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .search-container {
    margin-top: 15px;
    width: 100%;
    justify-content: center;
  }

  .account-cart {
    margin-top: 10px;
    width: 100%;
    justify-content: center;
    text-align: center;
  }
}
  </style>
  