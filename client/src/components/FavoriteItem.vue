<template>
    <b-container>
  <b-list-group horizontal class="favorite">
    <b-list-group-item id="fave-name">book</b-list-group-item>
    <b-list-group-item id= "review">I don't know which book I'm referring to so basically I have no review???</b-list-group-item>
    <b-list-group-item>
    <b-form-rating id="rating-inline" inline value=null ></b-form-rating>
    </b-list-group-item>
  </b-list-group>
    </b-container>
</template>

<script>
export default {
  name: 'favorite-item',
  data() {
    return {
      favoriteItems: [],
      message: '',
      form: {
        name: '',
        review: '',
        rating: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
