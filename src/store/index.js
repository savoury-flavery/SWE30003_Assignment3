import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      currentUser: null,
      cart: []
    };
  },

  mutations: {
    // User authentication
    setUser(state, user) {
      state.currentUser = user;
    },

    // Cart management
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
    // User authentication
    login({ commit }, { username, password }) {
      return fetch('/src/assets/accounts.json')
        .then(res => res.json())
        .then(accounts => {
          const user = accounts.find(acc => acc.username === username && acc.password === password);
          if (user) {
            commit('setUser', user);
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        });
    },

    logout({ commit }) {
      commit('setUser', null);
    },

    // Cart management
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
    // Auth
    currentUser(state) {
      return state.currentUser;
    },

    // Cart
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
