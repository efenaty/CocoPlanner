<template>
   <div>
        <p>Here are my lists:</p>
        <div v-for="list in lists" v-bind:key="list._id">
            <list-item v-bind:list="list" v-on:del-list="deleteList"/>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import ListItem from '@/components/ListItem.vue'

export default {
  name: 'lists',
  components: {
    ListItem
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real list from the server
    Api.get('/lists')
      .then(response => {
        console.log(response.data)
        this.lists = response.data
      })
      .catch(error => {
        this.message = error.message
        console.error(error)
        this.lists = []
        // TODO: display error message
      })
      .then(() => {
        //   This code is always executed at the end. After success or failure.
      })
  },
  data() {
    return {
      lists: [],
      message: '',
      text: ''
    }
  },
  methods: {
    deleteList(id) {
      Api.delete(`/lists/${id}`)
        .then(reponse => {
          const index = this.lists.findIndex(list => list._id === id)
          this.lists.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    createList() {
      console.log(this.text)
    //   Api.post(...)
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
