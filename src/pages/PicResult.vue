<template>
  <div class="page">
    <img src="../assets/picResult/pic_01.jpg" class="page-bg">

    <transition name="fade">
      <img v-show="processing" src="../assets/processing.gif" class="processing center">
    </transition>
    <transition name="fade">
      <img v-show="!processing" id="picResult" ref="result" :src="picResult" class="picResult center">
    </transition>

    <img hidden src="../assets/picResult/pic_055.png" ref="base">
    <img hidden :src="togetherPic" ref="togetherImg">
    <canvas hidden width="1098" height="764" ref="canvas"></canvas>

    <img src="../assets/picResult/pic_01.png" class="tips center">
    <img src="../assets/picResult/pic_06.png" class="onceMore" @click="moveTo(1)">

    <img src="../assets/picResult/pic_04.png" class="enterBtn" @click="enter">
    <img src="../assets/picResult/pic_05.png" class="myHome" @click="toMyHome">
    <img src="../assets/picResult/xiangkuangBG2.png" class="xiangkuangBG">

    <!--彈框-->
    <div class="waringModal" v-show="showModal">
      <!--<div class="contentBox">-->
      <!-- zzh -->
      <img src="../assets/picResult/beijing.png" class="contentBox">
      <img src="../assets/picResult/shuoming.png" class="center shuoming">
      <!--<div class="center shuoming"></div>-->
      <img src="../assets/picResult/queren.png" class="queren" @click="queren">
      <img src="../assets/picResult/quxiao.png" class="quxiao" @click="quxiao">
      <!--</div>-->
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
    mounted () {
      this.$refs.togetherImg.onload = this.generatePicResult.bind(this)
    },
    methods: {
      generatePicResult () {
        const {canvas, base, togetherImg} = this.$refs
        const ctx = canvas.getContext('2d')
        ctx.drawImage(togetherImg, 0, 0, 1098, 764, 0, 0, 1098, 764)
        ctx.drawImage(base, 0, 0, 726, 533, 0, 0, 1098, 764)

        this.setState({picResult: canvas.toDataURL()})
        setTimeout(() => {
          this.setState({processing: false})
        }, 600)
      },
      enter () {
        if (this.processing) {
          return
        }
        this.showModal = true
      },
      queren () {
        this.postPicResult(() => {  
          this.getPerson()
          this.moveDown()
        })
      },
      quxiao () {
        this.showModal = false
      },
      toMyHome () {
        this.postPicResult(() => {
          this.moveTo(8)
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  img {
    z-index: 2;
  }

  .picResult {
    top: 34vw;
    width: 94vw;
  }

  .processing {
    top: 30vw;
    z-index: 3;
    width: 100vw;
    height: 75vw;
  }

  .tips {
    top: 109vw;
    width: 48vw;
    left: -40vw;
  }

  .onceMore {
    position: absolute;
    top: 107vw;
    right: 10vw;
    width: 34vw;
  }

  .enterBtn, .rulesBtn {
    position: absolute;
    top: 130vw;
    left: 10vw;
    width: 34vw;
  }

  .myHome {
    position: absolute;
    top: 130vw;
    right: 10vw;
    width: 34vw;
  }

  .xiangkuangBG {
    position: absolute;
    top: 31vw;
    left: 0.5vw;
    z-index: 1 !important;
    width: 99vw;
    height: 71vw;
  }

  .base {
    top: 34vw;
    width: 94vw;
    z-index: 2;
    height: 66vw;
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
      width: 84vw;
      height: 42vw;
      top: 58vw;
      left: 9vw;
      position: absolute;
    }
    // zzh
    .shuoming {
      width: 67vw;
      height: 15vw;
      top: 65vw;
    }
    .queren {
      width: 23vw;
      position: absolute;
      top: 84vw;
      left: 20vw;
      display: block;
    }
    .quxiao {
      width: 23vw;
      position: absolute;
      top: 84vw;
      right: 20vw;
    }
    .updating {
      width: 27vw;
      position: absolute;
      top: 30vw;
      left: 14vw;
      opacity: 0.5;
    }

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
