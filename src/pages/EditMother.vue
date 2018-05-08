<template>
  <div class="page">
    <img src="../assets/editMother/pic_01.jpg" class="page-bg">
    <img src="../assets/editMother/pic_04.png" class="pic-frame center">
    <img ref="mask" src="../assets/editMother/pic_06.png" class="mask center">
    <img ref="motherImg" :src="motherPic" class="motherPic" :style="imgStyle">
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
      zoom: 1,    // 图片缩放比例
      deltaX: 0,  // 图片移动横坐标
      deltaY: 0,  // 图片移动纵坐标
    }),
    computed: {
      imgStyle () {
        const scale = `scale(${this.zoom})`
        const translate = `translate(${this.deltaX}px, ${this.deltaY}px)`

        return {
          transform: `${scale}  ${translate}`
        }
      }
    },
    created () {
      this.pinch = this.pinch.bind(this)
      this.pressMove = this.pressMove.bind(this)
    },
    methods: {
      takeSelf () {
        const {self, canvas, motherImg} = this.$refs
        const ctx = canvas.getContext('2d')
        const screenRatio = window.innerWidth * 0.695 / 549
        const imgRatio = motherImg.width / motherImg.naturalWidth * this.zoom

        ctx.drawImage(
          motherImg,
          (115 * screenRatio - this.deltaX) / imgRatio,
          (120 * screenRatio - this.deltaY) / imgRatio,
          (320 * screenRatio) / imgRatio,
          (400 * screenRatio) / imgRatio,
          0, 0, 320, 400)

        this.saveMotherPic(canvas.toDataURL())

        parseFile(self.files[0], result => {
          this.moveDown()
          this.saveSelfPic(result)
        })
      },
      takeMother () {
        parseFile(this.$refs.mother.files[0], result => {
          this.saveMotherPic(result)
          this.postMotherPic()
        })
      },
      pinch (evt) {
        const ratio = 3  // 倍数，调整此值来改变灵敏度
        this.zoom = 1 + (evt.zoom - 1) / ratio
      },
      pressMove (evt) {
        this.deltaX += evt.deltaX
        this.deltaY += evt.deltaY
      },
    },
    watch: {
      motherPic () {
        try {
          this.zoom = 1
          this.deltaX = 0
          this.deltaY = 0
          afInstance.destroy()
        } catch (e) {}

        afInstance = new AlloyFinger(this.$refs.mask, {
          pinch: this.pinch,
          pressMove: this.pressMove,
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

  .motherPic {
    top: 17.5vw;
    left: 15vw;
    max-width: 69.5vw;
    max-height: 96.7vw;
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
