<template>
 <div class="container">
   <h1>Log in</h1>
   <br>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-1" label="Username" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" placeholder="Enter your new username"></b-form-input>
      </b-form-group>
      <b-form-group id="input-2" label="Password:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" type="password" placeholder="Enter your new password"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">log in</b-button>
    </b-form>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(e) {
      Api.post('/login', this.form)
        .then((result) => {
          console.log(result)
          // Saving the user's _id
          const objectId = result.data._id
          // Clear the local storage before saving the _id
          localStorage.clear()
          // Saving the objectId in the local storage
          localStorage.setItem('objectId', objectId)
          this.$router.push('/')
          this.$router.go(0)
        }).catch(error => {
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
        //   This code is always executed at the end. After success or failure.
        })
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
.container {
    width: 30%;
    height: 30%;
    margin: auto;
    display: inline-block;
    margin-top: 5%;
}
</style>
