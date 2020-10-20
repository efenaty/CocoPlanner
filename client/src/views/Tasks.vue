<template>
<div class="main">
   <div class= "mt-4 mb-5">
        <b-container fluid class="container">
<b-row>
  <b-col>
      <b-button id= "addAList"  v-b-modal.modal-prevent-closing>Add a new list</b-button>
      <b-button id= "deleteAll" @click="deleteAll">Delete all lists</b-button>
  </b-col>
</b-row>

      <b-modal id="modal-prevent-closing" ref="modal" title="Add a new list" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState" label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" v-model="name" required >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>

      <b-row>
        <b-col cols="12" sm="6" md="4" v-for="list in lists" v-bind:key="list._id">
            <list-item v-bind:list="list" v-on:delete-lists="deleteList"/>
            </b-col>
                 </b-row>
        </b-container>
    </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import ListItem from '@/components/ListItem.vue'
const userid = localStorage.getItem('objectId')
// var taskname = localStorage.getItem('name')

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
      name: '',
      nameState: null,
      lists: [],
      message: '',
      text: ''
    }
  },
  methods: {
    getLists() {
      Api.get(`/${userid}/lists?is_favorite_list=false`)
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
    deleteList(id) {
      // var listid = this.list._id
      Api.request({ url: `/lists/${id}`, method: 'delete' })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          this.getLists()
        })
    },
    editList(id) {
      var listid = this.list._id
      Api.put(`/lists/${listid}/tasks/${id}`, name)
        .then((result) => {
          console.log(result)
        }).catch(error => {
          console.error(error)
        })
        .then(() => {
          this.getTasks()
        })
    },

    deleteAll() {
      Api.request({ url: `/users/${userid}/lists`, method: 'delete' })
        .catch(error => {
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
          this.getLists()
        })
    },
    addNewList() {
      var form = {
        name: this.name,
        is_favorite_list: false,
        user: userid
      }
      Api.post('/lists', form)
        .then((result) => {
          console.log(result)
        }).catch(error => {
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
          this.getLists()
        //   This code is always executed at the end. After success or failure.
        })
      // e.preventDefault()
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Add the list to the database
      this.addNewList()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}

</script>

<style scoped>

.main {
  /* background-color: #f1f0f5; */
  min-height: 100vh;
  height:100%;
  overflow:hidden;
}

.container {
  align-content: center;
  align-items: center;
}
#deleteAll {
  float: right;
  background-color: #D65DB1;

}

#addAList {
float: left;

background-color: #D65DB1;
}
</style>
