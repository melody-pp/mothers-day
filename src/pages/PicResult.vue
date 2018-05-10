<template>
  <div class="page">
    <img src="../assets/picResult/pic_01.jpg" class="page-bg">
    <img id="picResult" ref="result" :src="picResult" class="picResult center">

    <img src="../assets/picResult/pic_01.png" class="tips center">
    <img src="../assets/picResult/pic_06.png" class="onceMore" @click="reTake">

    <img src="../assets/picResult/pic_04.png" class="enterBtn" @click="confirm">
    <img src="../assets/picResult/pic_05.png" class="myHome" @click="toMyHome">
    <img src="../assets/picResult/xiangkuangBG.png" class="xiangkuangBG">

    <img hidden src="../assets/picResult/pic_05(2).png" ref="base">
    <img hidden :src="motherPic" ref="mother">
    <img hidden :src="selfPic" ref="self">
    <canvas hidden width="1098" height="764" ref="canvas"/>

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
    mounted () {
      this.$refs.self.onload = this.generateRes.bind(this)
    },
    methods: {
      generateRes () {
        const {base, mother, self, canvas, result} = this.$refs
        const ctx = canvas.getContext('2d')
        const imgXYWH = [0, 0, 549, 764]
        const motherXYWH = [549, 0, 549, 764]
        const selfXYWH = [0, 0, 549, 764]

        ctx.drawImage(mother, ...imgXYWH, ...motherXYWH)
        ctx.drawImage(self, ...imgXYWH, ...selfXYWH)
        ctx.drawImage(base, 0, 0, 645, 506, 0, 0, 974, 764)
        ctx.filter = 'saturate(60%) grayscale(50%) brightness(120%)'
        this.setPicResult(canvas.toDataURL())
        // result.loadOnce(() => {
        //   this.setPicResult($AI(result).ps('lomo').canvas.toDataURL())
        // })
        // const image = document.getElementById('picResult')
        // $AI(image).act('灰度处理').add(
        //   $AI(image.width, image.height, '#a0a0a0')
        //     .act('高斯模糊', 4)
        //     .act('色相/饱和度调节', 25, 15, 0, true),
        //   '叠加'
        // ).replace(image)

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
    top: 38vw;
    width: 94vw;
  }

  .tips {
    top: 110vw;
    width: 48vw;
    left: 32vw;
  }

  .onceMore {
    position: absolute;
    top: 108vw;
    right: 10vw;
    width: 34vw;
  }

  .enterBtn, .rulesBtn {
    position: absolute;
    top: 128vw;
    left: 10vw;
    width: 34vw;
  }

  .myHome {
    position: absolute;
    top: 128vw;
    right: 10vw;
    width: 34vw;
  }

  .xiangkuangBG {
    position: absolute;
    top: 35vw;
    left: 0.5vw;
    z-index: 1 !important;
    width: 99vw;
    height: 71vw;
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
