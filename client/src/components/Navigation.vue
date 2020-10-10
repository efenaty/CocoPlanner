 <template>
 <div>
    <b-navbar class= "navbar" type="dark" v-if="showNavbar">
    <b-navbar-nav justified class="flex-grow-1" >
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
</template>

<script>
export default {
  name: 'navigation',

  data() {
    this.$route.path === '/login' || this.$route.path === '/signup' ? this.showNavbar = false : this.showNavbar = true
    return {
      count: 0
    }
  }
}
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #845EC2;
    font-size: large;
}

.navbar-links {
    padding: 1rem;
    margin: 0;
    display: flex;
}
</style>
