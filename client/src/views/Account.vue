<template>
  <div class="container">
    <b-form  @delete="onDelete" v-if="show">
      <b-form-group id="input-1" label="Username" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" placeholder="Enter your new username"></b-form-input>
      </b-form-group>
      <b-form-group id="input-2" label="Password:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" type="password" placeholder="Enter your new password"></b-form-input>
      </b-form-group>
      <b-form-group id="input-3" label="Email address:" label-for="input-3">
       <b-form-input id="input-3" v-model="form.email" type="email" placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group id="input-4" label="Birthdate:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.birthDate" type="date" placeholder="Enter your new birthdate"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" @click="updateUser" v-if="show">Save</b-button>
      <b-button type="delete" variant="danger" @click="onDelete">Delete</b-button>
    </b-form>
  </div>
</template>

<script>

import { Api } from '@/Api'
const id = localStorage.getItem('objectId')
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        birthDate: ''
      },
      show: true
    }
  },
  methods: {
    updateUser(e) {
      // console.log(this.form)
      e.preventDefault()
      Api.patch(`/users/${id}`, this.form)
        .then((result) => {
          console.log('Updated')
        }).catch(error => {
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
        //   This code is always executed at the end. After success or failure.
        })
    },

    onDelete(e) {
      // console.log(this.form)
      e.preventDefault()
      Api.request({ url: `/users/${id}`, method: 'delete' })
        .catch(error => {
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
        //   This code is always executed at the end. After success or failure.
          console.log('Deleted')
          this.$router.push('/login')
        })
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
