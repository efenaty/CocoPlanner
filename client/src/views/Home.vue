<template>
  <div>
    <p>{{message}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
const id = localStorage.getItem('objectId')
export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  mounted() {
    Api.get(`/users/${id}`)
      .then(response => {
        this.message = 'welcome ' + response.data.username
      })
      .catch(error => {
        this.message = error
      })
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
