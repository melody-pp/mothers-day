<template>
  <div ref="page" class="page">
    <img src="../assets/editMother/pic_01.jpg" class="page-bg">
    <img src="../assets/editMother/pic_04.png" class="pic-frame center">
    <img src="../assets/editMother/pic_06.png" class="mask center">
    <div class="img-container center">
      <img ref="motherImg" :src="motherPic" class="motherPic" :style="imgStyle">
    </div>
    <img src="../assets/editMother/pic_01.png" class="tips center">
    <img src="../assets/editMother/pic_02.png" class="next center">
    <input class="next center" type="file" ref="self" @change="takeSelf">
    <img src="../assets/editMother/pic_03.png" class="reTake center">
    <input class="reTake center" type="file" ref="mother" @change="takeMother">
    <canvas hidden ref="canvas" width="320" height="400"/>
  </div>
</template>

<script>
  import { parseFile } from '../components/utils'
  import { vuexMixin } from '../components/mixins/index'

  /* for  AlloyFinger  start */
  let afInstance
  import AlloyFinger from '../components/AlloyFinger'
  /* for  AlloyFinger   end  */

  export default {
    name: 'EditMother',
    mixins: [vuexMixin],
    data: () => ({
      deltaX: 0,  // 图片移动横坐标
      deltaY: 0,  // 图片移动纵坐标
    }),
    computed: {
      imgStyle () {
        return {
          top: this.deltaY + 'px',
          left: this.deltaX + 'px',
        }
      }
    },
    methods: {
      takeSelf () {
        const {self, canvas, motherImg} = this.$refs
        const ctx = canvas.getContext('2d')
        const screenRatio = window.innerWidth * 0.695 / 549

        ctx.drawImage(
          motherImg,
          115 * screenRatio - this.deltaX,
          120 * screenRatio - this.deltaY,
          320 * screenRatio,
          400 * screenRatio,
          0, 0, 320, 400)

        this.saveMotherPic(canvas.toDataURL())
        parseFile(self.files[0], result => {
          this.moveDown()
          this.saveSelfPic(result)
        })
      },
      takeMother () {
        parseFile(this.$refs.mother.files[0], this.saveMotherPic)
      },
      pressMove (evt) {
        this.deltaX += evt.deltaX
        this.deltaY += evt.deltaY
      },
    },
    watch: {
      motherPic () {
        try {
          this.deltaX = 0
          this.deltaY = 0
          afInstance.destroy()
        } catch (e) {}

        afInstance = new AlloyFinger(this.$refs.page, {
          pressMove: this.pressMove.bind(this)
        })
      }
    }
  }
</script>

<style scoped>
  .pic-frame {
    top: 15vw;
    width: 75vw;
  }

  .mask {
    top: 17.5vw;
    width: 69.5vw;
    z-index: 10;
  }

  .img-container {
    top: 17.5vw;
    width: 69.5vw;
    height: 96.7vw;
    overflow: hidden;
  }

  .motherPic {
    position: absolute;
  }

  .tips {
    top: 119vw;
    width: 75vw;
  }

  .next {
    top: 127vw;
    width: 45vw;
  }

  input.next {
    height: 12vw;
    opacity: 0;
  }

  .reTake {
    top: 140vw;
    width: 36vw;
  }

  input.reTake {
    height: 12vw;
    opacity: 0;
  }
</style>
