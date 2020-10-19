<template>
  <div class="modal-wrapper" v-if="visible">
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <div class="modal-buttons">
      <button class="modal-button" @click="hide">Close</button>
      <button class="modal-button" @click="confirm">Confirm</button>
    </div>
  </div>
</template>

<script>
// we must import our Modal plugin instance
// because it contains reference to our Eventbus
import Modal from '@/plugins.js'
export default {
  data() {
    return {
      visible: false,
      title: '',
      text: '',
      // adding callback function variable
      onConfirm: {}
    }
  },
  methods: {
    hide() {
      // this method is unchanged
    },
    confirm() {
      // we must check if this.onConfirm is function
      if (typeof this.onConfirm === 'function') {
        // run passed function and then close the modal
        this.onConfirm()
        this.hide()
      } else {
        // we only close the modal
        this.hide()
      }
    },
    show(params) {
      // making modal visible
      this.visible = true
      // setting title and text
      this.title = params.title
      this.text = params.text
      // setting callback function
      this.onConfirm = params.onConfirm
    }
  },
  beforeMount() {
    // here we need to listen for emited events
    // we declared those events inside our plugin
    Modal.EventBus.$on('show', (params) => {
      this.show(params)
    })
  }
}
</script>

<style scoped>
/* styles are unchanged */
</style>
