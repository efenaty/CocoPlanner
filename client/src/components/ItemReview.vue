<template>
        <v-layout row wrap name>
            <b-col cols="12" sm="4" md="6" v-for="item in items" :key="item.id">
         <b-container>
        <b-list-group horizontal class="favorite">
        <b-list-group-item id="fave-name">{{item.name}}</b-list-group-item>
        <b-list-group-item id= "review">{{item.review}}</b-list-group-item>
        <b-list-group-item>
         <b-form-rating id="rating-inline" inline value=null>{{item.rating}}</b-form-rating>
       </b-list-group-item>
      </b-list-group>
      </b-container>

        </b-col>
        </v-layout>
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

<style scoped></style>
