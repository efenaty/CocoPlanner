<template>
  <div class="container">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

    <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
  <b-form-group
        id="input-group-3"
        label="Email address:"
        label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      </b-form-group>
     <!-- <b-form-group id="input-4" label="Birthdate:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.birthDate" type="date" placeholder="Enter your new birthdate"></b-form-input>
      </b-form-group> -->

      <b-button type="submit" variant="primary">Sign up</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: ''
        // birthDate: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(e) {
      // console.log(this.form)
      Api.post('/users', this.form)
        .then((result) => {
          console.log(result)
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
}
</style>
