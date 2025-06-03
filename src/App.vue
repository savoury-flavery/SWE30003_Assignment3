<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
};
</script>

<style>
body {
  position: relative;
  background-color: #f3f5f1 !important;
  background-blend-mode: multiply;
  font-family: 'Courier New', Courier, monospace;
  color: #252007; 
  margin: 0;
  padding: 0;
  min-height: 100vh; 
  box-sizing: border-box;
}
</style>
