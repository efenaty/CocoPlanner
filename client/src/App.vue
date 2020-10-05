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
     <navigation v-if="showNavigation">
    <div>
  <b-navbar class= "navbar" type="dark" >
    <b-navbar-nav>
    <b-nav-item href ="/">Home</b-nav-item>
    <b-nav-item href ="/calendar">Calendar</b-nav-item>
    <b-nav-item href ="/tasks">Tasks</b-nav-item>
    <b-nav-item href ="/favorites">Favorites</b-nav-item>
      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="Account" right>
        <b-dropdown-item href="/Account">Profile Settings</b-dropdown-item>
        <b-dropdown-item href="/login">Log out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</div>
     </navigation>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    this.$route.path === '/login' || this.$route.path === '/signup' ? this.showNavigation = false : this.showNavigation = true
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
 background-color: #845EC2;
}
</style>
