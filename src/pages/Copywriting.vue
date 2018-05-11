<template>
  <div class="page" @touchstart="touchstart" @touchend="touchend">
    <img class="page-bg" src="../assets/copywriting/pic_01.jpg">
    <img class="title" src="../assets/copywriting/pic_01.png">
    <!-- zzh -->
    <!-- <img class="text center" src="../assets/copywriting/pic_02.png"> -->
    <div class="text center"></div>
    <img class="button center" src="../assets/copywriting/pic_03.png">
    <img class="tips center" src="../assets/copywriting/pic_04.png">
    <input class="button center" type="file" ref="mother" @change="takeMother">
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'
  import { parseFile } from '../components/utils'

  export default {
    name: 'Copywriting',
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
        if (endY - this.startY > 5) {
          this.moveUp()
        }
      },
      takeMother () {
        const mother = this.$refs.mother
        parseFile(mother.files[0], motherPic => {
          mother.value = ''
          this.moveDown()
          this.setState({motherPic})
        })
      },
    },
  }
</script>

<style scoped>
  .title {
    top: 5vw;
    left: 5vw;
    width: 17vw;
    position: absolute;
  }

  /* zzh */
  .text {
    top: 43vw;
    width: 70vw;
    height: 45.8vw;
    background: url(../assets/copywriting/pic_02.png) no-repeat center;
    background-size: contain;
  }

  .button {
    top: 95vw;
    width: 35vw;
  }

  input.button {
    height: 12vw;
    opacity: 0;
  }

  .tips {
    top: 110vw;
    width: 70vw;
  }
</style>
