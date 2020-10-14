<template>
  <div>
    <h1>we will have our favorites here</h1>
    <b-row>
    <b-col cols="12" sm="4" md="6" v-for="list in lists" v-bind:key="list._id"><br>
      <favorite-item v-bind:list="list"></favorite-item>
      <!-- <b-list-group-item button>{{ list.name }}</b-list-group-item> -->
     </b-col>
     </b-row>

    <b-button v-b-modal.modal-prevent-closing>Add a new favorite</b-button>
    <div class="mt-3">
      Favorite Items:
      <div v-if="favoriteItems.length === 0">You don't have any items yet.</div>
      <ul v-else class="mb-0 pl-3">
        <b-row>
        <b-col cols="12" md="6">
        <favorite-item></favorite-item>
        </b-col>
        </b-row>
      </ul>
    </div>

    <b-modal id="modal-prevent-closing" ref="modal" title="Add a new favorite" @show="resetModal" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState" label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" v-model="name" required >
          </b-form-input>
        </b-form-group>

          <b-form-group :state="reviewState" label="Review" label-for="review-input" invalid-feedback="Review is required">
          <b-form-input id="review-input" v-model="review" :state="reviewState"></b-form-input>
        </b-form-group>

      </form>
    </b-modal>
    <item-review></item-review>
  </div>
</template>

<script>
import FavoriteItem from '@/components/FavoriteItem.vue'
import ItemReview from '@/components/ItemReview.vue'
import { Api } from '@/Api'
const userid = localStorage.getItem('objectId')

export default {
  name: 'lists',
  data() {
    return {
      name: '',
      message: '',
      review: '',
      nameState: null,
      reviewState: null,
      lists: [],
      favoriteItems: [],
      selected: null
    }
  },
  components: {
    FavoriteItem,
    ItemReview
  },
  methods: {
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
      // this.favoriteItems.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
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
h1 {
  color: pink;
}
.favoriteItems {
  position: relative;
}
</style>
