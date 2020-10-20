<template>
    <b-container>
          <div class="flex">
      <b-list-group-item id="favList" button v-on:click="showItems(list._id)"> {{ list.name }}</b-list-group-item>
         <b-button id="delbtn" type="delete" @click="onDelete()">X</b-button>
         </div>
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
      this.$store.dispatch('getid', id)
    }
  }
}

</script>

<style scoped>
#favList {
  font-weight: bold;
  color: #D65DB1;
}

.flex {
    display: flex;
}

#delbtn {
  background-color: #150135;
}
</style>
