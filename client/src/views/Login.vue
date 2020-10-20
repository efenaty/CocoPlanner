<template>
<div class="main">
 <div class="container">
   <div>
   <b-img id="logo" src= "https://i.imgur.com/tIpEU7K.png" fluid alt="mycocoplanner logo"></b-img>
   </div>
   <h1>Log In</h1>
   <br>
    <b-form class="form" @submit="login" v-if="show">
      <label id="username">Username</label>
      <b-form-group id="input-1" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" required placeholder="Enter your username"></b-form-input>
      </b-form-group>
      <label id="password">Password</label>
      <b-form-group id="input-2" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" type="password" required placeholder="Enter your password"></b-form-input>
      </b-form-group>
      <b-button class="submitBtn" variant="light" type="submit" >Log in</b-button>
      <b-button class="signupBtn" variant="light" type="submit" @click="openSignup" >Sign up</b-button>
    </b-form>

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
        password: ''
      },
      show: true
    }
  },
  methods: {
    login(e) {
      Api.post('/login', this.form)
        .then((result) => {
          console.log('Logged in!')
          // Saving the user's _id
          const objectId = result.data._id
          // Clear the local storage before saving the _id
          localStorage.clear()
          // Saving the objectId in the local storage
          localStorage.setItem('objectId', objectId)
          this.$router.push('/home')
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
    openSignup() {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>

.main {
  background-color:#150135;
  height:100%;
  overflow:hidden;
  min-height: 100vh;
}

h1 {
font-weight: bold;
}

#password, #username
{
 font-weight: bold;
 color: #D65DB1;
 margin-right: 90%;
}

.signupBtn {
margin-left: 5%;
margin-top: 5%;
font-weight: bold;
color:#D65DB1;
}

.submitBtn {
  margin-top: 5%;
  position: relative;
  font-weight: bold;
  color:#D65DB1;
}

.form {
    width: 40%;
    height: 30%;
    margin: auto;
    margin-top: 1%;
}

img {
  width: 40%;
  height: auto;
  margin-top: 5%;
}
::placeholder {
  font-style: italic;
}

div {
  height: 100%;
}

</style>
