<template>
  <b-card no-body class="mt-4" style="max-width: 20rem;">
    <template v-slot:header>
      <h4 class="mb-0">{{list.name}}</h4>
      <b-button-close type="delete"  @click="onDelete(task._id)"></b-button-close>
    </template>

  <div class= "taskName" v-for="task in tasks" v-bind:key="task._id">
    <b-list-group>
      <b-list-group-item>{{task.name}}</b-list-group-item>
      <b-button-close type="delete" @click="onDelete(task._id)"></b-button-close>
    </b-list-group>
  </div>

 <hr>
<form class= "form" id="formElement">
  <label for="name">Task name:</label><br>
  <input type="text" id="name" name="name" v-model="form.name"><br>
  <label for='startDate'>Startdate:</label><br>
  <input type="date" id="startDate" name="startDate" data-date-format="DD MMMM YYYY" v-model="form.startDate"><br>
  <label for='endDate'>Enddate:</label><br>
  <input type="date" id="endDate" name="endDate" v-model="form.endDate"><br>
  <input type="submit" value="Submit" @click="addNewTasks">
</form>

  </b-card>
</template>

<script>
import { Api } from '@/Api'
export default {

  name: 'list-item',
  props: ['list'],
  data() {
    return {
      tasks: [],
      message: '',
      form: {
        name: '',
        startDate: '',
        endDate: ''
      }
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

    // showForm(e) {
    //   document.getElementById('formElement').style.display = 'block'
    // },

    addNewTasks(e) {
      var id = this.list._id
      Api.post(`/lists/${id}/tasks`, this.form)
        .then((result) => {
          console.log(result)
          console.log(this.form)
        }).catch(error => {
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
          this.getTasks()
        //   This code is always executed at the end. After success or failure.
        })
      e.preventDefault()
    },

    onDelete(id) {
      var listid = this.list._id
      Api.request({ url: `/lists/${listid}/tasks/${id}`, method: 'delete' })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          this.getTasks()
        //   This code is always executed at the end. After success or failure.
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

.mb-0 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.taskName {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
