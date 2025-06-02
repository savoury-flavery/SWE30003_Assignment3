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
  background-color: #101f1d !important;
  background-blend-mode: multiply;
  font-family: 'Courier New', Courier, monospace;
  color: #e6e4d9; 
  margin: 0;
  padding: 0;
  min-height: 100vh; 
  box-sizing: border-box;
}
</style>
