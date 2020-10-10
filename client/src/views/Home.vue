<template>
  <b-container>
    <h1>{{message}}</h1>
    <b-button type="submit" variant="primary" @click="signOut">Sign out</b-button>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  mounted() {
    const id = localStorage.getItem('objectId')
    Api.get(`/users/${id}`)
      .then(response => {
        this.message = 'Welcome, ' + response.data.username + '!'
      })
      .catch(error => {
        this.message = error
      })
  },
  methods: {
    signOut() {
      localStorage.clear()
      this.$router.push('/login')
      console.log('Signed out!')
    }

  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
h1{
  color:#D65DB1;
  padding-block-start: 4%;
}
</style>
