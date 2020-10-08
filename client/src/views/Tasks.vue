<template>
   <div class= "mt-4 mb-5">
        <b-container>
          <div>
      <b-button class= "deleteAll">Delete all lists</b-button>
      <b-button class= "addAList">Add a new list</b-button>
      </div>
      <b-row>
        <b-col cols="12" sm="6" md="4" v-for="list in lists" v-bind:key="list._id">
            <list-item v-bind:list="list" v-on:get-tasks="getTasks"/>
            </b-col>
                 </b-row>
        </b-container>
    </div>
</template>

<script>
import { Api } from '@/Api'
import ListItem from '@/components/ListItem.vue'
const userid = localStorage.getItem('objectId')

export default {
  name: 'lists',
  components: {
    ListItem
  },
  mounted() {
    this.getLists()
    // Load the real list from the server
  },
  data() {
    return {
      lists: [],
      tasks: [],
      message: '',
      text: ''
    }
  },
  methods: {
    getLists() {
      Api.get(`/${userid}/lists`)
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
    getTasks(id) {
      Api.get(`/lists/${id}/tasks`)
        .then(response => {
          console.log(response.data)
          this.tasks = response.data
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.tasks = []
        })
        .then(() => {
          // This code is always executed at the end. After success or failure.
        })
    },
    deleteCamel(id) {
      Api.delete(`/camels/${id}`)
        .then(reponse => {
          const index = this.camels.findIndex(camel => camel._id === id)
          this.camels.splice(index, 1)
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

.deleteAll {
  margin-left: 80%;

}
.addAList {
  margin-right: 80%;

}
</style>
