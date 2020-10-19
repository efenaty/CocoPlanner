<template>
<span>
  <div class="mt-3">
        <!-- <b-row>
        <b-col cols="12" sm="4" md="6" v-for="itm in itms" :key="itm.id">
        <b-list-group horizontal class="favorite"> -->
        <b-list-group-item id="fave-name">{{item.name}}</b-list-group-item>
        <b-list-group-item id= "review">{{item.review}}</b-list-group-item>
        <b-list-group-item>
         <b-form-rating id="rating" v-model="item.rating" disabled ></b-form-rating>
       </b-list-group-item>
     <!-- </b-list-group>
        </b-col>
        </b-row> -->
  </div>

</span>
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

  },
  mounted() {
    // this.itms = this.$store.state.items
    // this.id = localStorage.getItem('id')
    // var id = this.id
    // if (this.itms.length === 0) {
    //   Api.get(`/lists/${id}/items`)
    //     .then(response => {
    //       console.log(response.data)
    //       this.itms = response.data
    //     })
    //     .catch(error => {
    //       this.message = error.message
    //       console.error(error)
    //     // TODO: display error message
    //     })
    //     .then(() => {
    //     //   This code is always executed at the end. After success or failure.
    //     })
  }
}

</script>

<style scoped>
#rating {
    color:#150135;
    background-color:   #D65DB1;
}
</style>
