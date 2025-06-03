<template>
  <div class="account-container" v-if="!isLoggedIn">
    <h1 class="account-title">{{ mode === 'login' ? 'Login' : 'Register' }}</h1>
    <h2 class="account-subtitle">
      {{ mode === 'login' ? 'Please enter your credentials' : 'Create a new account' }}
    </h2>

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

      <button class="btn login-btn" @click="mode === 'login' ? login() : register()">
        {{ mode === 'login' ? 'Log In' : 'Register' }}
      </button>

      <p class="mt-3">
        {{ mode === 'login' ? "Don't have an account?" : 'Already have an account?' }}
        <a href="#" @click.prevent="toggleMode">
          {{ mode === 'login' ? 'Register here' : 'Login here' }}
        </a>
      </p>
    </div>
  </div>

  <div v-else class="logout-section">
    <p>You are currently logged in as <strong>{{ currentUser.email }}</strong>.</p>
    <button class="btn logout-btn" @click="logout">Log Out</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      mode: 'login',
      currentUser: null
    };
  },
  computed: {
    isLoggedIn() {
      return this.currentUser !== null;
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.currentUser = user;
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert("Please enter both email and password.");
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/data/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        if (!response.ok) throw new Error('Invalid credentials');

        const account = await response.json();
        localStorage.setItem('currentUser', JSON.stringify(account));
        this.currentUser = account;
        this.email = '';
        this.password = '';
        this.$router.push(account.isAdmin ? '/admin' : '/accounts');
      } catch (err) {
        alert('Login failed: Invalid email or password.');
      }
    },

    async register() {
      if (!this.email || !this.password) {
        alert("Please enter both email and password.");
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/data/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        if (response.status === 409) {
          alert('Email already registered.');
          return;
        }

        if (!response.ok) throw new Error('Failed to register');

        alert('Account created. You can now log in.');
        this.mode = 'login';
      } catch (err) {
        alert('Registration failed.');
      }
    },

    toggleMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login';
    },

    logout() {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      this.email = '';
      this.password = '';
      this.mode = 'login';
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.account-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.account-title {
  text-align: center;
  margin-bottom: 1rem;
}
.account-subtitle {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
}
.account-form .form-label {
  font-weight: bold;
}
.custom-input {
  width: 100%;
  padding: 0.5rem;
}
.login-btn {
  width: 100%;
  background-color: #65a79d;
  color: white;
  border: none;
  margin: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 5px;
}
.login-btn:hover {
  background-color: #84c4aa;
}
.logout-btn {
  width: 100%;
  background-color: #c44e4e;
  color: white;
  border: none;
  margin-top: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 5px;
}
.logout-btn:hover {
  background-color: #e06e6e;
}
.logout-section {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
