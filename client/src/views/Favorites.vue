<template>
  <div class="mt-5">
    <b-button id="addFavListBtn" v-b-modal.add-favorite-list>Add a new favorite list</b-button>
    <b-row>
    <b-col cols="12" sm="4" md="6" v-for="list in lists" v-bind:key="list._id"><br>
      <favorite-item v-bind:list="list"></favorite-item>
      <!-- <b-list-group-item button>{{ list.name }}</b-list-group-item> -->
     </b-col>
     </b-row>
       <br>
    <b-modal id="add-favorite-list" ref="modal" title="Add a new favorite" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState" label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" v-model="name" required >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import FavoriteItem from '@/components/FavoriteItem.vue'
import { Api } from '@/Api'
const userid = localStorage.getItem('objectId')

export default {
  name: 'lists',
  data() {
    return {
      name: '',
      message: '',
      nameState: null,
      lists: [],
      favoriteItems: []
    }
  },
  components: {
    FavoriteItem
  },
  methods: {
    addNewFavList() {
      var form = {
        name: this.name,
        is_favorite_list: true,
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
      // Push the name to submitted names
      this.addNewFavList()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('add-favorite-list')
      })
    },
    getLists() {
      Api.get(`/${userid}/lists?is_favorite_list=true`)
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
    }
  },
  mounted() {
    this.getLists()
    // Load the real list from the server
  }
}
</script>

<style scoped>
#addFavListBtn {
  background-color: #D65DB1;
  margin-bottom: 15px;
}
.favoriteItems {
  position: relative;
}
</style>
