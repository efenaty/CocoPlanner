<template>
    <b-container>
     <b-list-group-item id="favList" button v-on:click="showItems(list._id)"> {{ list.name }} </b-list-group-item>
      <!-- <b-list-group-item button>{{ favoriteList.name}}</b-list-group-item> -->
    </b-container>
</template>

<script>
// import { Api } from '@/Api'

export default {
  name: 'favorite-item',
  props: ['list'],
  data() {
    return {
      // items: [],
      message: ''
    }
  },
  methods: {
    showItems(id) {
      this.$store.dispatch('getItems', id)
    }
  }
}

</script>

<style scoped>
#favList {
  font-weight: bold;
  color: #D65DB1;
}
</style>
