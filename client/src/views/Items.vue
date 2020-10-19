<template>
    <b-container class="mt-5">
       <b-button id="addFavItemBtn" v-b-modal.modal-prevent-closing>Add a new favorite</b-button>
       <b-row>
    <b-col cols="12" sm="4" md="6" v-for="item in items" v-bind:key="item._id"><br>
      <item-review v-bind:item="item"></item-review>
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
  },

  methods: {
    getItems() {
      // this.items = this.$store.state.items
      this.id = this.$store.state.id
      Api.get(`/lists/${this.id}/items`)
        .then(response => {
          console.log(response.data)
          this.items = response.data
          // commit('setItems', response.data)
          // commit('setId', id)
          // router.push('/favorites/items')
        })
        .catch(error => {
          this.message = error.message
          console.error(error)
          this.items = []
          // commit('setItems', [])
        // TODO: display error message
        })
        .then(() => {
          // commit('setId', id)
        //   This code is always executed at the end. After success or failure.
        })
    },
    addNewFavItem(e) {
      var id = this.id
      // console.log(this.id)
      // var form2 = this.form
      // this.$store.dispatch('addItems', id, form2)
      // console.log(this.id)
      // },
      // var id = this.id
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
      this.addNewFavItem()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }

}
</script>

<style scoped>
#addFavItemBtn {
  background-color: #D65DB1;
  margin-bottom: 15px;
}
</style>
