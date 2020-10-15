<template>
  <b-card no-body class="mt-4" style="max-width: 25rem;">
    <template v-slot:header>
      <h4 class="mb-0">{{list.name}}
         <b-button-close type="delete" variant='danger' v-on:click="$emit('delete-lists', list._id)"></b-button-close>
      </h4>
    </template>

    <div class= "taskName" v-for="task in tasks" v-bind:key="task._id">
    <b-list-group>
      <b-list-group-item><b-button v-b-modal.change-task-name>edit</b-button>
        {{task.name}}
      <b-button-close type="delete" @click="onDelete(task._id)"></b-button-close>
      </b-list-group-item>
    </b-list-group>
    <b-modal id="change-task-name" ref="modal" title="Edit the task's name" @show="resetModal" @hidden="resetModal" @ok="editTaskName(task._id)">
      <form ref="form">
        <b-form-group :state="nameState" label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="task-name" v-model="form2.name" required >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>

 <hr>
<form class= "form" id="formElement">
  <label for="name">Task name:</label><br>
  <input type="text" id="name" name="name" placeholder="task name.." v-model="form.name"><br>
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
      },
      form2: {
        name: ''
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
    },
    resetModal() {
      this.name = ''
      this.nameState = null
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

.form {
  position: relative;
}

.card-header {
}

.mb-0 {
  color:#D65DB1;
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
