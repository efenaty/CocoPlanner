<template>
  <div id="app">
    <!-- Render the content of the current page view -->
    <navigation />
  <!-- <div style="background-color:#150135; overflow:hidden;"> -->
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  },
  data() {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  height:100%;
  overflow:hidden;
  background-color: #f1f0f5;
}

</style>
