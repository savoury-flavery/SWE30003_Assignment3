<template>
  <div class="account-container" v-if="currentUser">
    <h1>Account Details</h1>
    <p><strong>Email:</strong> {{ currentUser.email }}</p>

    <div v-if="userOrders.length">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in userOrders" :key="order.orderId">
            <td>{{ order.orderId }}</td>
            <td>{{ order.date }}</td>
            <td>${{ order.total.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No orders found.</p>
    </div>

    <div v-if="isAdmin">
      <h2>Admin Dashboard</h2>
      <div class="admin-buttons">
        <button @click="$router.push('/admin/statistics')" class="btn admin-btn">
          View Statistics
        </button>
        <button @click="$router.push('/admin/inventory')" class="btn admin-btn">
          Manage Inventory
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Please log in to view account details.</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
  name: 'Accounts',
  setup() {
    const currentUser = ref(null);
    const orders = ref([]);

    onMounted(async () => {
      try {
        // Retrieve the current user from localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          currentUser.value = JSON.parse(storedUser);
        }

        // Fetch orders data
        const response = await fetch('http://localhost:3000/data/orders.json');
        if (!response.ok) throw new Error('Failed to fetch orders.json');
        orders.value = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    // Computed property to filter orders for the current user
    const userOrders = computed(() => {
      if (!currentUser.value || !orders.value) return [];
      return orders.value.filter(order => order.email === currentUser.value.email);
    });

    // Computed property to check if the user is an admin
    const isAdmin = computed(() => {
      return currentUser.value?.isAdmin === true;
    });

    return {
      currentUser,
      userOrders,
      isAdmin,
    };
  },
};
</script>

<style scoped>
.account-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 10px;
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
.admin-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
}

.admin-btn {
  width: 100%;
  padding: 1rem 2rem;
  background-color: #65a79d;
  border: none;
  color: white;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.admin-btn:hover {
  background-color: #84c4aa;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.75rem;
  text-align: left;
}

ul {
  margin: 0;
  padding-left: 1.2rem;
}
</style>
