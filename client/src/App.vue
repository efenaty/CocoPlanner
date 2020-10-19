<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home </router-link>
      <router-link to="/calendar">Calendar</router-link>
    </div> -->
    <!-- <div>
    <b-nav tabs justified>
    <b-nav-item to ="/">Home</b-nav-item>
    <b-nav-item to = "/calendar">Calendar</b-nav-item>
    <b-nav-item to = "/tasks">Tasks</b-nav-item>
    <b-nav-item to = "/favorites">Favorites</b-nav-item>
    <b-nav-item to = "/account">Account</b-nav-item>
<div>
</div>
    </b-nav>
    </div> -->
    <!-- Render the content of the current page view -->
    <navigation />
  <!-- <div style="background-color:#150135; overflow:hidden;"> -->
    <router-view/>
    <app-modal/>
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
