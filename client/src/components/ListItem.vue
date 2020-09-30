<template>
    <div>
  <b-card
    no-body
  >
    <template v-slot:header>
      <h4 class="mb-0">{{list.name}}</h4>
    </template>

    <b-card-body>
      <b-card-title>sth</b-card-title>
      <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </b-card-text>
    </b-card-body>

    <b-list-group flush>
      <b-list-group-item>First</b-list-group-item>
      <b-list-group-item>Second thing</b-list-group-item>
      <b-list-group-item>Third thing</b-list-group-item>
    </b-list-group>

  </b-card>
</div>

</template>

<script>
export default {
  name: 'list-item',
  props: ['list'],
  methods: {
    // deleteCamel() {
    //   this.$emit('del-camel', this.camel._id)
    //   console.log('del-camel with id:' + this.camel._id)
    // }
  }
}
</script>

<style scoped>
p {
    background-color: rgb(134, 155, 226);
}
</style>
