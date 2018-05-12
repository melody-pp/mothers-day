<template>
  <div class="page" @touchstart="touchstart" @touchend="touchend">
    <img class="page-bg" src="../assets/home/pic_01.jpg">
    <img src="../assets/home/GO.png" class="go" @click="go">
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
          document.getElementById('bgmusic').play()
        }
      },
      go () {
        document.getElementById('bgmusic').play()
      }
    }
  }
</script>

<style scoped>

</style>
