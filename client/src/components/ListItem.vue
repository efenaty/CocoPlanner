<template>
    <div>
  <b-card
    no-body
  >
    <template v-slot:header>
      <h4 class="mb-0">{{list.name}}</h4>
    </template>

<div v-for="task in tasks" v-bind:key="task._id">

<b-list-group flush>
      <b-list-group-item>{{task.name}}</b-list-group-item>
    </b-list-group>
    </div>

  </b-card>
</div>

</template>

<script>
import { Api } from '@/Api'
export default {

  name: 'list-item',
  props: ['list'],
  data() {
    return {
      tasks: [],
      message: ''
    }
  },
  methods: {
    getTasks(e) {
      console.log()
      var id = this.list._id
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
    },

    deleteCamel(e) {
      var id = this.list._id
      Api.delete(`/lists/${id}`)
        .then(response => {
          const index = this.lists.findIndex(list => list._id === id)
          this.lists.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    }

  },
  mounted() {
    this.getTasks()
  }
}

</script>

<style scoped>
p {
    background-color: rgb(134, 155, 226);
}
</style>
