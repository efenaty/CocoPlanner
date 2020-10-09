<template>
  <div class="container">
    <p>Update your profile here!</p>
    <b-form  @delete="onDelete" v-if="show">
      <b-row class="my-1">
    <b-col sm="2">
      <label for="input-group-1">Username</label>
    </b-col>
    <b-col sm="10">
         <b-form-input id="input-1" v-model="form.username" required placeholder="Enter password"></b-form-input>
    </b-col>
  </b-row>

     <b-row class="my-1">
    <b-col sm="2">
      <label for="input-group-2">Password</label>
    </b-col>
    <b-col sm="10">
         <b-form-input id="input-2" v-model="form.password" required placeholder="Enter password"></b-form-input>
    </b-col>
  </b-row>

     <b-row class="my-1">
    <b-col sm="2">
      <label for="input-group-3">Email</label>
    </b-col>
    <b-col sm="10">
        <b-form-input id="input-3" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-group-4">Birth date</label>
    </b-col>
    <b-col sm="10">
        <b-form-input id="input-4" v-model="form.birthDate" type="date" required placeholder="Enter your new birthdate"></b-form-input>
    </b-col>
  </b-row>

      <b-button class="savebtn" type="submit" @click="updateUser" v-if="show">Save</b-button>
      <b-button class="deletebtn" type="delete" @click="onDelete">Delete account</b-button>
    </b-form>
  </div>
</template>

<script>

import { Api } from '@/Api'
var id = localStorage.getItem('objectId')
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
    width: 50%;
    height: 50%;
    background-color: #FF6F91;
    /* position: relative;
    margin: auto;
    display: inline-block; */
    margin-top: 7%
}
.my-1 {
  padding-bottom: 10px;
}

div {
  border-radius: 5px;
  padding: 10px;
  min-height: 100%;
}

label {
  color: white;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.savebtn {
margin-left: 75%;
    background-color: darkgray;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding-bottom: 5px;
}

.deletebtn {
  margin-left: 75%;
    background-color: darkgray;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-top: 1%;
    padding-bottom: 5px;
}

p {
 color: white;
 font-weight: bold;
 font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 text-align: center;
 font-size: 20px
}

#input-1, #input-2, #input-3, #input-4 {
  font-style: italic;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
