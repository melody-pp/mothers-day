<template>
  <div class="page">
    <img src="../assets/editMother/pic_01.jpg" class="page-bg">
    <img src="../assets/editMother/pic_04.png" class="pic-frame center">
    <img src="../assets/editMother/pic_06.png" class="mask center">
    <img ref="motherImg" :src="motherPic" class="motherPic" :style="imgStyle">
    <img src="../assets/editMother/pic_01.png" class="tips center">
    <img src="../assets/editMother/pic_02.png" class="next center">
    <input class="next center" type="file" ref="self" @change="takeSelf">
    <img src="../assets/editMother/pic_03.png" class="reTake center">
    <input class="reTake center" type="file" ref="mother" @change="takeMother">
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
      angle: 0,   // 图片旋转角度
      deltaX: 0,  // 图片移动横坐标
      deltaY: 0,  // 图片移动纵坐标
    }),
    computed: {
      imgStyle () {
        const scale = `scale(${this.zoom})`
        const rotate = `rotate(${this.angle}deg)`
        const translate = `translate(${this.deltaX}px, ${this.deltaY}px)`

        return {
          transform: `${scale} ${rotate} ${translate}`
        }
      }
    },
    created () {
      this.pinch = this.pinch.bind(this)
      this.rotate = this.rotate.bind(this)
      this.pressMove = this.pressMove.bind(this)
    },
    methods: {
      takeSelf () {
        parseFile(this.$refs.self.files[0], result => {
          this.moveDown()
          this.saveSelfPic(result)
        })
      },
      takeMother () {
        parseFile(this.$refs.mother.files[0], this.saveMotherPic)
      },
      pinch (evt) {
        this.zoom = evt.zoom
        alert(`缩放：${evt.zoom}`)
      },
      rotate (evt) {
        this.angle = evt.angle
        alert(`旋转：${evt.angle}`)
      },
      pressMove (evt) {
        this.deltaX += evt.deltaX
        this.deltaY += evt.deltaY
      }
    },
    watch: {
      motherPic () {
        try {
          this.zoom = 1
          this.angle = 0
          this.deltaX = 0
          this.deltaY = 0
          afInstance.destroy()
        } catch (e) {}

        afInstance = new AlloyFinger(this.$refs.motherImg, {
          pinch: this.pinch,
          rotate: this.rotate,
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
    z-index: 11;
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
