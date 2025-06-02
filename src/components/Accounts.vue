<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
  
  <div class="account-container">
    <h1 class="account-title">Login</h1>
    <h2 class="account-subtitle">Please enter your credentials</h2>

    <div class="account-form">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input 
          type="text" 
          class="form-control custom-input" 
          id="email" 
          v-model="email" 
          placeholder="Enter your email" 
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input 
          type="password" 
          class="form-control custom-input" 
          id="password" 
          v-model="password" 
          placeholder="Enter your password" 
        />
      </div>

      <button class="btn login-btn" @click="login">Log In</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      accounts: []
    };
  },
  created() {
    fetch('/data/accounts.json')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        this.accounts = data;
      })
      .catch(err => {
        console.error('Failed to load accounts.json:', err);
        alert('Unable to load account data.');
      });
  },
  methods: {
    login() {
      const account = this.accounts.find(
        acc => acc.email === this.email && acc.password === this.password
      );

      if (account) {
        alert(`Welcome, ${account.email}!`);

        // Optionally store the user in localStorage or Vuex
        localStorage.setItem('currentUser', JSON.stringify(account));

        // Redirect based on role
        if (account.isAdmin) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/account');
        }

        // Reset fields
        this.email = '';
        this.password = '';
      } else {
        alert('Invalid email or password.');
      }
    }
  }
};
</script>
