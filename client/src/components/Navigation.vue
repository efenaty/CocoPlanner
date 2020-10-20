 <template>
    <b-navbar class= "navbar" type="dark" v-if="showNavbar">
    <b-navbar-nav justified class="flex-grow-1" >
    <b-nav-item href ="/home">Home</b-nav-item>
    <b-nav-item href ="/calendar">Calendar</b-nav-item>
    <b-nav-item href ="/tasks">Tasks</b-nav-item>
    <b-nav-item href ="/favorites">Favorites</b-nav-item>
      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown id="account" text="Account" right>
        <b-dropdown-item href="/Account">Profile Settings</b-dropdown-item>
        <b-dropdown-item href="/">Log out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'navigation',

  data() {
    this.$route.path === '/' || this.$route.path === '/signup' ? this.showNavbar = false : this.showNavbar = true
    return {
      count: 0
    }
  }
}
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    background-color: #150135;
    font-size: 15px;
    box-shadow: 4px 4px 4px #0000003b;
}

.navbar-links {
    margin: 0;

}

</style>
