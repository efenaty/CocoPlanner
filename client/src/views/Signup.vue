<template>
<body>
  <div id="background">
  <div class="container">
    <p>Join us here!</p>
    <b-form @submit="onSubmit" v-if="show">

      <b-row class="my-1">
    <b-col sm="2">
      <label for="input-group-1">Username</label>
    </b-col>
    <b-col sm="10">
         <b-form-input id="input-1" v-model="form.username" required placeholder="Enter username"></b-form-input>
    </b-col>
  </b-row>

     <b-row class="my-1">
    <b-col sm="2">
      <label for="input-group-2">Password</label>
    </b-col>
    <b-col sm="10">
         <b-form-input id="input-2" v-model="form.password" type="password" required placeholder="Enter password"></b-form-input>
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
<!--
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.username" required placeholder="Enter username"></b-form-input>
      </b-form-group>

    <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" required placeholder="Enter password"></b-form-input>
          </b-form-group>

      <b-form-group id="input-group-3" label="Email address:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
      </b-form-group> -->

     <!-- <b-form-group id="input-4" label="Birthdate:" label-for="input-4">
        <b-form-input id="input-4" v-model="form.birthDate" type="date" placeholder="Enter your new birthdate"></b-form-input>
      </b-form-group> -->

      <b-button class="signupbtn" type="submit" >Sign up</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->

  </div>
  </div>
  </body>
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
    width: 40%;
    height: 40%;
    background-color: #FF6F91;
    /* position: relative;
    margin: auto;
    display: inline-block; */
    box-shadow: 7px 7px 4px 0px rgba(0, 0, 0, 0.123);
    margin-top: 2%
}
.signupbtn {
    margin-left: 75%;
    background-color: darkgray;
    padding-bottom: 10px;

}

.my-1 {
  padding-bottom: 10px;
}

div {
  border-radius: 5px;
  padding: 20px;
  margin-top: 2%;
  min-height: 100%;
}

label {
  color: white;
  font-weight: bold;
  position: relative;
}

p {
 color: white;
 font-weight: bold;
 text-align: center;
 font-size: 20px
}

body {
  position: relative;
  min-height: 100%;
  background-color:#845EC2;
  padding: 66px;
  margin-top: 0%;
}

html { height: 100%; }

::placeholder {
  font-style: italic;
}

</style>
