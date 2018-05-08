<template>
  <div class="page">
    <img src="../assets/picResult/pic_01.jpg" class="page-bg">
    <img :src="picResult" class="picResult center">
    <img src="../assets/picResult/pic_01.png" class="tips center">
    <div class="modal" v-show="showModal"></div>

    <img hidden src="../assets/picResult/MattingWoman.png" ref="woman">
    <img hidden src="../assets/picResult/MattingMan.png" ref="man">
    <img hidden :src="motherPic" ref="mother">
    <img hidden :src="selfPic" ref="self">
    <canvas hidden width="681" height="1014" ref="canvas"/>
    <img src="../assets/picResult/pic_04.png" class="enterBtn" @click="confirm">
    <img src="../assets/picResult/pic_05.png" class="myHome">
    <img src="../assets/picResult/pic_06.png" class="onceMore" @click="reTake">
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
    methods: {
      generateRes () {
        const {woman, man, mother, self, canvas} = this.$refs
        const ctx = canvas.getContext('2d')

        ctx.drawImage(mother, 0, 0, 320, 400, this.userGender ? 100 : 80, this.userGender ? 105 : 230, 320, 400)
        ctx.drawImage(self, 0, 0, 320, 400, this.userGender ? 210 : 220, this.userGender ? 120 : 150, 320, 400)
        ctx.drawImage(this.userGender ? woman : man, 0, 0)
        this.setPicResult(canvas.toDataURL())
      },
      confirm () {
        this.showModal = true
        this.postPicResult()
      },
      reTake () {
        this.moveTo(2)
      }
    },
    watch: {
      gender () {
        this.generateRes()
      },
      selfPic () {
        this.generateRes()
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
    top: 147vw;
    width: 48vw;
    left: 32vw;
  }

  .modal {
    top: 0;
    left: 0;
    z-index: 2;
    height: 100vh;
    position: absolute;
    background: rgba(0, 0, 0, .5);
  }

  .enterBtn {
    position: absolute;
    top: 162vw;
    left: 10vw;
    width: 34vw;
  }

  .myHome {
    position: absolute;
    top: 162vw;
    right: 10vw;
    width: 34vw;
  }

  .onceMore {
    position: absolute;
    top: 145vw;
    right: 10vw;
    width: 34vw;
  }
</style>
