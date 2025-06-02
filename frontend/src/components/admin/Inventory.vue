<template>
  <div id="app">
    <Navbar />
    <router-view />
    <p>testing</p>
  </div>
</template>

<script>

</script>

<style>
body {
  position: relative;
  background-image: url('@/assets/images/texture.jpg');
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
