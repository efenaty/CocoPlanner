<template>
  <div class="mt-3">
        <b-list-group class="favorite">
        <b-list-group-item id="name">Name: {{item.name}}
         <b-button-close type="delete" v-on:click="$emit('on-delete', item._id)"></b-button-close>
        </b-list-group-item>
        <b-list-group-item id= "review">Review: {{item.review}}</b-list-group-item>
        <b-list-group-item>
         <b-form-rating id="rating" v-model="item.rating" disabled ></b-form-rating>
       </b-list-group-item>
        </b-list-group>
  </div>
</template>

<script>
// import { Api } from '@/Api'
export default {
  name: 'ItemReview',
  props: ['item'],
  // computed: {
  //   items() {
  //     return this.$store.state.items
  //   }
  // },
  data() {
    return {
      message: '',
      itms: [],
      id: ''

    }
  },
  methods: {

  }

}

</script>

<style scoped>
#rating {
    color:#150135;
    background-color:   #D65DB1;
}

#name, #review {
  color:#150135;
  font-weight: 500;
}
</style>
