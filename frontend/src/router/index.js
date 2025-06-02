import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; 
import ProductCategory from '../components/ProductCategory.vue';
import SearchResults from '../components/SearchResults.vue';
import Accounts from '../components/Accounts.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import Statistics from '../components/admin/Statistics.vue';
import Inventory from '../components/admin/Inventory.vue';

const routes = [
  { path: '/', redirect: '/categories/all' },
  { path: '/categories/:category', name: 'CategoryPage', component: ProductCategory },
  { path: '/search', name: 'SearchResults', component: SearchResults },
  { path: '/accounts', component: Accounts },
  { path: '/cart', component: ShoppingCart },
  {
    path: '/admin/statistics',
    component: Statistics,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/inventory',
    component: Inventory,
    meta: { requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Admin route protection
router.beforeEach((to, from, next) => {
  const user = store.state.currentUser;
  if (to.meta.requiresAdmin && (!user || user.role !== 'admin')) {
    alert('Admin access only');
    return next('/');
  }
  next();
});

export default router;
