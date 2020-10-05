<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home </router-link>
      <router-link to="/calendar">Calendar</router-link>
    </div> -->
    <div>
    <b-nav tabs justified>
    <b-nav-item to ="/">Home</b-nav-item>
    <b-nav-item to = "/calendar">Calendar</b-nav-item>
    <b-nav-item to = "/tasks">Tasks</b-nav-item>
    <b-nav-item to = "/favorites">Favorites</b-nav-item>
    <b-nav-item to = "/account">Account</b-nav-item>
<div>
</div>
    <!-- <b-nav-item disabled>Disabled</b-nav-item> -->
    </b-nav>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
