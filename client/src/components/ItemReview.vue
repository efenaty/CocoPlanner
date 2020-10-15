<template>
        <b-row>
        <b-col cols="12" sm="4" md="6" v-for="item in items" :key="item.id">
        <b-list-group horizontal class="mb-5">
        <b-list-group-item id="fave-name">{{item.name}}</b-list-group-item>
        <b-list-group-item id= "review">{{item.review}}</b-list-group-item>
        <b-list-group-item>
         <b-form-rating v-model="item.rating" disabled></b-form-rating>
       </b-list-group-item>
      </b-list-group>
        </b-col>
        </b-row>
</template>

<script>
export default {
  name: 'ItemReview',
  computed: {
    items() {
      return this.$store.state.items
    }
  },
  data() {
    return {
      message: ''
      // items: []

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
