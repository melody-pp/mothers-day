<template>
  <div class="page">
    <img src="../assets/picResult/pic_01.jpg" class="page-bg">

    <transition name="fade">
      <img v-show="processing" src="../assets/processing.gif" class="processing center">
    </transition>
    <transition name="fade">
      <img v-show="!processing" id="picResult" ref="result" :src="picResult" class="picResult center">
    </transition>

    <img src="../assets/picResult/pic_01.png" class="tips center">
    <img src="../assets/picResult/pic_06.png" class="onceMore" @click="moveTo(1)">

    <img src="../assets/picResult/pic_04.png" class="enterBtn" @click="showModal=true">
    <img src="../assets/picResult/pic_05.png" class="myHome" @click="toMyHome">
    <img src="../assets/picResult/xiangkuangBG2.png" class="xiangkuangBG">

    <img hidden src="../assets/picResult/pic_055.png" ref="base" class="base">
    <img hidden :src="motherPic" ref="mother">
    <img hidden :src="selfPic" ref="self">
    <canvas hidden width="1098" height="764" ref="canvas"/>

    <!--彈框-->
    <div class="waringModal" v-show="showModal">
      <!--<div class="contentBox">-->
      <!-- zzh -->
      <img src="../assets/picResult/beijing.png" class="contentBox">
      <img src="../assets/picResult/shuoming.png" class="center shuoming">
      <!--<div class="center shuoming"></div>-->
      <img src="../assets/picResult/queren.png" class="queren" @click="queren" v-show="!showUpdate">
      <img src="../assets/picResult/updating.png" class="updating" v-show="showUpdate">
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
      showUpdate: false,  // 是否显示上传中
    }),
    mounted () {
      this.$refs.self.onload = this.generateRes.bind(this)
    },
    methods: {
      generateRes () {
        const {base, mother, self, canvas} = this.$refs
        const ctx = canvas.getContext('2d')
        const imgXYWH = [0, 0, 549, 764]
        const selfXYWH = [549, 0, 549, 764]
        const motherXYWH = [0, 0, 549, 764]

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(self, ...imgXYWH, ...selfXYWH)
        ctx.drawImage(mother, ...imgXYWH, ...motherXYWH)
        ctx.drawImage(base, 0, 0, 726, 533, 0, 0, 1098, 764)
        ctx.filter = 'saturate(200%) '

        this.setState({picResult: canvas.toDataURL()})
        setTimeout(() => {
          this.setState({processing: false})
        }, 1000)
      },
      queren () {
        this.showUpdate = true
        this.postPicResult(() => {
          this.getPerson()
          this.moveDown()
        })
      },
      quxiao () {
        this.showModal = false
        this.showUpdate = false
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
    left: 32vw;
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
    width: 94vw;
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
      left: 14vw;
      display: block;
    }
    .quxiao {
      width: 23vw;
      position: absolute;
      top: 84vw;
      right: 14vw;
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
