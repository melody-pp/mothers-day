<template>
  <div class="page">
    <img class="page-bg" src="../assets/home/pic_01.jpg"
         @touchstart="touchstart" @touchend="touchend">
    <img src="../assets/home/GO.png" class="go" @click="moveDown">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'Home',
    mixins: [vuexMixin],
    data: () => ({
      startY: null
    }),
    methods: {
      touchstart (event) {
        this.startY = event.changedTouches[0].pageY
      },
      touchend (event) {
        const endY = event.changedTouches[0].pageY
        if (endY - this.startY < -5) {
          this.moveDown()
        }
      },
    }
  }
</script>

<style scoped>

</style>
