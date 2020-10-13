<template>
  <div class="main">
  <div class="container">
    <p id="updatetext">Update your profile here!</p>
    <b-form class="form" @delete="onDelete" v-if="show">

      <label id="username">Username</label>
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" placeholder="Enter your new username"></b-form-input>
      </b-form-group>

    <label id="password">Password</label>
    <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input id="input-2" type= "password" v-model="form.password" placeholder="Enter your new password"></b-form-input>
          </b-form-group>

     <label id="email">Email</label>
      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-input id="input-3" v-model="form.email" type="email" placeholder="Enter your new email"></b-form-input>
      </b-form-group>

      <label id="birthdate">Birth Date</label>
     <b-form-group id="input-4" label-for="input-4">
        <b-form-input id="input-4" v-model="form.birthDate" type="date" placeholder="Enter your new birthdate"></b-form-input>
      </b-form-group>

      <b-button class="savebtn" type="submit" @click="updateUser" v-if="show">Save</b-button>
        <div class= "deletediv">
        <p id="deletetext">Delete your account here</p>
      <b-button class="deletebtn" type="delete" @click="onDelete">Delete account</b-button>
   </div>
    </b-form>
  </div>
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

.main {
  min-height: 100vh;
  height: 100%;
  overflow: hidden;
  background-color: #D65DB1;
}
.container {
    width: 50%;
    height: 50%;
    /* position: relative;
    margin: auto;
    display: inline-block; */
    margin-top: 3%;
}

label {
  color: #150135;
  font-weight: bold;
  position: relative;
  margin-right: 85%;
}

.savebtn {
    margin-left: 75%;
    background-color: #150135;
}

.deletebtn {
  background-color: #150135;

}
.deletediv {
  margin-right: 75%;
  margin-top: 5%;
}

#deletetext {
  font-weight: bold;
  font-size: 15px;
  color: #150135;
}

#updatetext {
 color: #150135;
 font-weight: bold;
 text-align: center;
 font-size: 20px
}

::placeholder {
  font-style: italic;
}
</style>
