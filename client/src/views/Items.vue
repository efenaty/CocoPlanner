<template>
<div class="mt-5">
    <b-container>
       <b-row>
    <b-col cols="12" sm="4" md="6" v-for="item in items" v-bind:key="item._id"><br>
      <item-review v-bind:item="item"></item-review>
      <!-- <b-list-group-item button>{{ list.name }}</b-list-group-item> -->
     </b-col>
     </b-row>
     </b-container>
       </div>
</template>

<script>
import ItemReview from '@/components/ItemReview.vue'

export default {
  name: 'items',
  data() {
    return {
      items: []
    }
  },
  components: {
    ItemReview
  },
  mounted() {
    this.items = this.$store.state.items
  }
}
</script>

<style scoped>
</style>
