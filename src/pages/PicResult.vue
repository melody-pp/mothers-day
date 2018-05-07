<template>
  <div class="page">
    <img src="../assets/picResult/pic_01.jpg" class="page-bg">
    <img :src="picResult" class="picResult center">
    <img src="../assets/picResult/pic_01.png" class="tips center">
    <img src="" class="button confirm" @click="confirm">
    <img src="" class="button reTake" @click="reTake">
    <div class="modal" v-show="showModal"></div>

    <img hidden src="../assets/picResult/MattingWoman.png" ref="woman">
    <img hidden src="../assets/picResult/MattingMan.png" ref="man">
    <img hidden :src="motherPic" ref="mother">
    <img hidden :src="selfPic" ref="self">
    <canvas hidden width="681" height="1014" ref="canvas"/>
  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'PicResult',
    mixins: [vuexMixin],
    data: () => ({
      showModal: false,  // 是否显示遮罩
    }),
    mounted () {
      const {woman, man, mother, self, canvas} = this.$refs
      const ctx = canvas.getContext('2d')

      ctx.drawImage(this.userGender ? woman : man, 0, 0)
      ctx.drawImage(mother, 0, 0, 320, 400, this.userGender ? 100 : 80, this.userGender ? 105 : 230, 320, 400)
      ctx.drawImage(self, 0, 0, 320, 400, this.userGender ? 210 : 220, this.userGender ? 120 : 150, 320, 400)

      this.setPicResult(canvas.toDataURL())
    },
    methods: {
      confirm () {
        this.showModal = true
        this.postPicResult()
      },
      reTake () {

      }
    }
  }
</script>

<style scoped lang="scss">
  .picResult {
    top: 4vw;
    width: 94vw;
  }

  .tips {
    top: 145vw;
    width: 50vw;
  }

  .button {
    &.confirm {

    }
    & .reTake {

    }
  }

  .modal {
    top: 0;
    left: 0;
    z-index: 2;
    height: 100vh;
    position: absolute;
    background: rgba(0, 0, 0, .5);
  }
</style>
