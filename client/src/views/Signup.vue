<template>
<div class="main">
  <div class="container">
    <div>
   <b-img id="logo" src= "https://i.imgur.com/tIpEU7K.png" fluid alt="mycocoplanner logo"></b-img>
   </div>
   <h1>Sign Up</h1>
   <br>
    <b-form class= "form" @submit="onSubmit" v-if="show">

      <label id="username">Username</label>
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" required placeholder="Enter username"></b-form-input>
      </b-form-group>

    <label id="password">Password</label>
    <b-form-group id="input-group-2" label-for="input-2">
        <b-form-input id="input-2" type= "password" v-model="form.password" required placeholder="Enter password"></b-form-input>
          </b-form-group>

     <label id="email">Email</label>
      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-input id="input-3" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
      </b-form-group>

     <!-- <b-form-group id="input-4" label="Birthdate:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.birthDate" type="date" placeholder="Enter your new birthdate"></b-form-input>
      </b-form-group> -->

      <b-button class="signupbtn" variant="light" type="submit" >Sign up</b-button>
      <br>
      <div style="float: left; margin-left: 60%; margin-top: 3%;">
      <label id="login">or login here</label>
      <b-button class="loginbtn" variant="light" type="submit" @click="openLogin" >Login</b-button>
      </div>
    </b-form>
    <br>
  </div>
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
    },
    openLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.main {
  background-color:#150135;
  height:100%;
  overflow:hidden;
}

.container {
  overflow:auto;
  height:100%
}

p {
  color: white;
}

h1 {
font-weight: bold;
}

.form {
    width: 40%;
    height: 30%;
    margin: auto;
}

img {
  width: 40%;
  height: auto;
  margin-top: 3%;
}
::placeholder {
  font-style: italic;
}

div {
  height: 100%;
}

#password, #username, #email
{
 font-weight: bold;
 color: #D65DB1;
 margin-right: 90%;
}

.signupbtn {
 margin-left: 5%;
margin-top: 5%;
font-weight: bold;
color:#D65DB1;
}

.loginbtn {
  margin-top: 3%;
  position: relative;
  font-weight: bold;
  color:#D65DB1;
}

html { height: 100%; }

::placeholder {
  font-style: italic;
}

#login {
  color: white;
  margin-right: 10px;
  position: relative;
}
</style>
