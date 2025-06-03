<template>
  <div class="statistics-container">
    <h1>Sales Statistics</h1>

    <div class="filter-section">
      <label for="Date">Select Date(s): </label>
      <select id="Date" v-model="selectedDate">
        <option value="dailyStats">Daily</option>
        <option value="weeklyStats">Weekly</option>
        <option value="monthlyStats">Monthly</option>
        <option value="yearlyStats">Yearly</option>
      </select>
    </div>

    <div v-if="stats">
      <div v-if="selectedDate === 'dailyStats'">
        <h2>Daily Sales</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Sales</th>
              <th>Category Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in stats.dailyStats" :key="entry.date">
              <td>{{ entry.date }}</td>
              <td>${{ entry.totalSales.toFixed(2) }}</td>
              <td>
                <ul>
                  <li v-for="(amount, category) in entry.categorySales" :key="category">
                    {{ category }}: ${{ amount.toFixed(2) }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="selectedDate === 'weeklyStats'">
        <h2>Weekly Sales</h2>
        <p>Total Sales: ${{ stats.weeklyStats.totalSales.toFixed(2) }}</p>
        <p>Average Sales: ${{ stats.weeklyStats.averageSales.toFixed(2) }}</p>
      </div>

      <div v-else-if="selectedDate === 'monthlyStats'">
        <h2>Monthly Sales</h2>
        <p>Total Sales: ${{ stats.monthlyStats.totalSales.toFixed(2) }}</p>
        <p>Average Sales: ${{ stats.monthlyStats.averageSales.toFixed(2) }}</p>
      </div>

      <div v-else-if="selectedDate === 'yearlyStats'">
        <h2>Yearly Sales</h2>
        <p>Total Sales: ${{ stats.yearlyStats.totalSales.toFixed(2) }}</p>
        <p>Average Sales: ${{ stats.yearlyStats.averageSales.toFixed(2) }}</p>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Statistics',
  setup() {
    const stats = ref(null);
    const selectedDate = ref('dailyStats');

    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/data/stats.json');
        if (!response.ok) throw new Error('Failed to fetch stats.json');
        stats.value = await response.json();
        console.log("Stats loaded:", stats.value);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchStats);

    return {
      stats,
      selectedDate,
    };
  },
};
</script>

<style scoped>
.statistics-container {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}

.filter-section {
  margin-bottom: 1.5rem;
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
