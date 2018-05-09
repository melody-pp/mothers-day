<template>
  <div class="page">
    <img src="../assets/picResult/pic_01.jpg" class="page-bg">
    <img :src="picResult" class="picResult center">
    <img src="../assets/picResult/pic_01.png" class="tips center">
    <img hidden src="../assets/picResult/MattingWoman.png" ref="woman">
    <img hidden src="../assets/picResult/MattingMan.png" ref="man">
    <img hidden :src="motherPic" ref="mother">
    <img hidden :src="selfPic" ref="self">
    <canvas hidden width="681" height="1014" ref="canvas"/>
    <img src="../assets/picResult/pic_04.png" class="enterBtn" @click="confirm">
    <img src="../assets/picResult/pic_05.png" class="myHome">
    <img src="../assets/picResult/pic_06.png" class="onceMore" @click="reTake">

    <!--彈框-->
    <div class="waringModal" v-show="showModal">
      <div class="contentBox">
        <img src="../assets/picResult/shuoming.png" class="center shuoming">
        <img src="../assets/picResult/queren.png" class="queren" @click="queren">
        <img src="../assets/picResult/quxiao.png" class="quxiao" @click="quxiao">
      </div>
    </div>
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
        const imgXYWH = [0, 0, 320, 400]
        const womanMotherXYWH = [180, 190, 160, 210]
        const womanSelfXYWH = [345, 210, 160, 200]
        const manMotherXYWH = [145, 370, 180, 220]
        const manSelfXYWH = [365, 250, 180, 230]

        if (this.userGender) {
          ctx.drawImage(mother, ...imgXYWH, ...womanMotherXYWH)
          ctx.drawImage(self, ...imgXYWH, ...womanSelfXYWH)
          ctx.drawImage(woman, 0, 0)
        } else {
          ctx.drawImage(mother, ...imgXYWH, ...manMotherXYWH)
          ctx.drawImage(self, ...imgXYWH, ...manSelfXYWH)
          ctx.drawImage(man, 0, 0)
        }

        this.setPicResult(canvas.toDataURL())
      },
      reTake () {
        this.moveTo(1)
      },
      confirm () {
        this.showModal = true
      },
      queren () {
        this.moveDown()
        this.postPicResult()
      },
      quxiao () {
        this.showModal = false
      },
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

  .enterBtn, .rulesBtn {
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

  .waringModal {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    position: absolute;
    background: rgba(0, 0, 0, .6);
    .contentBox {
      background: url("../assets/picResult/beijing.png") no-repeat;
      background-size: cover;
      width: 84vw;
      height: 42vw;
      top: 58vw;
      left: 9vw;
      position: absolute;
      .shuoming {
        width: 67vw;
        top: 9vw;
      }
      .queren {
        width: 23vw;
        position: absolute;
        top: 27vw;
        left: 14vw;
      }
      .quxiao {
        width: 23vw;
        position: absolute;
        top: 27vw;
        right: 14vw;
      }
    }
  }
</style>
