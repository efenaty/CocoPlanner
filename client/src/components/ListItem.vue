<template>
<div>
  <b-card no-body class="mt-4" style="max-width: 25rem;">
    <template v-slot:header>
      <h4 class="mb-0">{{list.name}}
         <b-button-close type="delete" variant='danger' v-on:click="$emit('delete-lists', list._id)"></b-button-close>
      </h4>
    </template>

    <div class= "taskName" v-for="task in tasks" v-bind:key="task._id">
    <b-list-group>
      <b-list-group-item>{{task.name}}
      <b-button-close type="delete" @click="onDelete(task._id)"></b-button-close>
      <form class= "form" id="formElementedit">
      <input type="text" id="name" name="name" placeholder="change task name.." v-model="form2.name" required>
      <input id="taskSubmit2" type="submit" value="Change" @click="editTaskName(task._id)">
      </form>

      </b-list-group-item>
    </b-list-group>
  </div>

 <br>
<form class= "form" id="formElementadd">
  <label id="task" for="name">Add a Task</label><br>
  <input type="text" id="name" name="name" placeholder="task name.." v-model="form.name"><br>
  <input id="taskSubmit" type="submit" value="Add" @click="addNewTasks">
</form>
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
      message: '',
      form: {
        name: '',
        startDate: '',
        endDate: ''
      },
      form2: {
        name: ''
      }
    }
  },
  mounted() {
    this.getTasks()
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
    },
    editTaskName(id) {
      var listid = this.list._id
      Api.put(`/lists/${listid}/tasks/${id}`, this.form2)
        .then((result) => {
          console.log(result)
        }).catch(error => {
          console.error(error)
        })
        .then(() => {
          this.getTasks()
        })
    }

  }
}

</script>

<style scoped>
p {
    background-color: rgb(134, 155, 226);
}

#formElementadd {
  position: relative;
  background-color: #eeeeee;
}

.mb-0 {
  color: #150135;
}

.mt-4 {
box-shadow: 4px 4px 4px #00000017;
}

.listDelete {
  position: absolute;
  top:16px;
  right:8px;
}

.taskName {
  position: relative;
  color: #D65DB1;;
  font-weight: 500;
}

#taskSubmit, #taskSubmit2 {
  color: #150135;
  font-weight: bold;
  background-color:#ffffff;
  margin-top: 15px;
}

#task {
  color: #150135;
  font-weight: bold;
  margin-top: 15px;
}

.taskDelete {
  position: absolute;
  top:10px;
  right:5px;
}

::placeholder {
  font-style: italic;
}

.form {
  padding-bottom: 30px;
}
</style>
