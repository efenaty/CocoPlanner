<template>
    <b-container class="mt-5">
      <div>
        <b-row>
          <b-col>
       <h2>{{favoritelistname}}</h2>
       <b-button id="addFavItemBtn" v-b-modal.modal-prevent-closing>Add a new favorite</b-button>
        </b-col>
       </b-row>
      </div>
       <b-row>
    <b-col cols="12" sm="4" md="6" v-for="item in items" v-bind:key="item._id"><br>
      <item-review v-bind:item="item" v-on:onDelete="deleteItem"></item-review>
      <!-- <b-list-group-item button>{{ list.name }}</b-list-group-item> -->
     </b-col>
     </b-row>
    <br>
      <b-modal id="modal-prevent-closing" ref="modal" title="Add a new favorite" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState" label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" v-model="form.name" required >
          </b-form-input>
        </b-form-group>

          <b-form-group :state="reviewState" label="Review" label-for="review-input" invalid-feedback="Review is required">
          <b-form-input id="review-input" v-model="form.review" :state="reviewState"></b-form-input>
        </b-form-group>
          <b-form-group label="Rating" label-for="rating-input" >
          <b-form-select v-model="form.rating" :options="options"></b-form-select>
          </b-form-group>
      </form>
    </b-modal>
     </b-container>
</template>

<script>
import ItemReview from '@/components/ItemReview.vue'
import { Api } from '@/Api'

export default {
  name: 'items',
  data() {
    return {
      id: '',
      favoritelistname: '',
      nameState: null,
      reviewState: null,
      items: [],
      form: {
        name: '',
        review: '',
        rating: ''
      },
      options: [
        { value: null, text: 'Please select a rating number' },
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 2, text: '3' },
        { value: 2, text: '4' },
        { value: 5, text: '5' }
      ]
    }
  },
  components: {
    ItemReview
  },
  mounted() {
    this.getItems()
    console.log(this.id)
    this.getFavoriteListName()
  },

  methods: {
    getItems() {
      // this.items = this.$store.state.items
      this.id = this.$store.state.id
      Api.get(`/lists/${this.id}/items`)
        .then(response => {
          console.log(response.data)
          this.items = response.data
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.items = []
        })
        .then(() => {
        })
    },
    addNewFavItem(e) {
      var id = this.id
      Api.post(`/lists/${id}/items`, this.form)
        .then((result) => {
          console.log(result)
          console.log(this.form)
        }).catch(error => {
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
          this.getItems()
        //   This code is always executed at the end. After success or failure.
        })
    },
    deleteItem(id) {
      var listid = this.id
      Api.request({ url: `/lists/${listid}/items/${id}`, method: 'delete' })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          this.getItems()
        })
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
      this.addNewFavItem()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    getFavoriteListName() {
      Api.get(`/lists/${this.id}`)
        .then(response => {
          console.log(response.data)
          this.favoritelistname = response.data.name
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
        // TODO: display error message
        })
        .then(() => {
        //   This code is always executed at the end. After success or failure.
        })
    }
  }
}
</script>

<style scoped>
#addFavItemBtn {
  background-color: #D65DB1;
  margin-bottom: 10px;
  float: left;
}

h2 {
  color: #150135;
}
</style>
