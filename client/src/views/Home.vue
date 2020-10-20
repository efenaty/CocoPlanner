<template>
  <b-container>
    <h1>{{message}}</h1>
    <h2> Welcome to My Coco Planner!</h2>
    <p> Organize your daily to-dos, and list your favorite things! </p>
    <img src="../assets/logo.png">
  </b-container>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
// import LottieAnimation from 'lottie-vuejs' // import lottie-vuejs

export default {
  name: 'home',
  data() {
    return {
      message: ''
    }
  },
  // components: {
  //   LottieAnimation
  // },
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
