import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      products: [],
      currentUser: null,
      cart: []
    };
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    setUser(state, user) {
      state.currentUser = user;
    },

    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.sku === product.sku);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(state, sku) {
      state.cart = state.cart.filter(item => item.sku !== sku);
    },

    increaseQuantity(state, sku) {
      const cartItem = state.cart.find(item => item.sku === sku);
      if (cartItem) {
        cartItem.quantity++;
      }
    },

    decreaseQuantity(state, sku) {
      const cartItem = state.cart.find(item => item.sku === sku);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          state.cart = state.cart.filter(item => item.sku !== sku);
        }
      }
    }
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        commit('setProducts', products);
      } catch (error) {
        console.error('Fetch products error:', error);
      }
    },

    async login({ commit }, { email, password }) {
      try {
        const response = await fetch('http://localhost:3000/assets/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const user = await response.json();
        commit('setUser', user);
        return user;
      } catch (error) {
        console.error('Login error:', error.message);
        throw error;
      }
    },

    logout({ commit }) {
      commit('setUser', null);
    },

    addToCart({ commit }, product) {
      commit('addToCart', product);
    },

    removeFromCart({ commit }, sku) {
      commit('removeFromCart', sku);
    },

    increaseQuantity({ commit }, sku) {
      commit('increaseQuantity', sku);
    },

    decreaseQuantity({ commit }, sku) {
      commit('decreaseQuantity', sku);
    }
  },

  getters: {
    products(state) {
      return state.products;
    },

    currentUser(state) {
      return state.currentUser;
    },

    cartItems(state) {
      return state.cart;
    },

    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    cartItemCount(state) {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    }
  }
});
