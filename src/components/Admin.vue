<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>

  <div>
    <router-link v-if="user" to="/account">Account</router-link>
    <router-link v-if="user?.isAdmin" to="/admin/statistics">Statistics</router-link>
    <router-link v-if="user?.isAdmin" to="/admin/inventory">Inventory</router-link>
    <button v-if="user" @click="logout">Logout</button>
    <router-link v-else to="/accounts">Login</router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['currentUser']),
    user() {
      return this.currentUser;
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
};
</script>
