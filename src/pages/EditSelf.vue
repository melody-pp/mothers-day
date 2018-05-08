<template>
  <div class="page">
    <img src="../assets/editSelf/pic_01.jpg" class="page-bg">
    <img src="../assets/editSelf/pic_05.png" class="pic-frame center">
    <img ref="mask" src="../assets/editSelf/pic_06.png" class="mask center">
    <img ref="selfImg" :src="selfPic" class="selfPic">
    <img src="../assets/editSelf/pic_04.png" class="tips center">
    <div class="center genderBox clearfix">
      <label class="fl">
        <input type="radio" name="gender" :value="0" v-model="gender">先生
      </label>
      <label class="fr">
        <input type="radio" name="gender" :value="1" v-model="gender">女士
      </label>
    </div>
    <img src="../assets/editSelf/compoundBtn.png" class="next center" @click="next">
    <img src="../assets/editSelf/pic_03.png" class="reTake center">
    <input class="reTake center" type="file" ref="self" @change="takeSelf">
    <canvas hidden ref="canvas" width="320" height="400"/>

  </div>
</template>

<script>
  import { vuexMixin } from '../components/mixins/index'
  import { parseFile } from '../components/utils'
  /* for  AlloyFinger  start */
  let afInstance
  import AlloyFinger from '../components/AlloyFinger'
  /* for  AlloyFinger   end  */
  export default {
    name: 'EditSelf',
    mixins: [vuexMixin],
    data: () => ({
      zoom: 1,    // 图片缩放比例
      deltaX: 0,  // 图片移动横坐标
      deltaY: 0,  // 图片移动纵坐标
      gender: 0,
    }),
    methods: {
      next () {
        const {selfImg, canvas} = this.$refs
        const ctx = canvas.getContext('2d')
        const screenRatio = window.innerWidth * 0.695 / 549
        const imgRatio = selfImg.width / selfImg.naturalWidth * this.zoom

        ctx.drawImage(
          selfImg,
          (115 * screenRatio - this.deltaX) / imgRatio,
          (120 * screenRatio - this.deltaY) / imgRatio,
          (320 * screenRatio) / imgRatio,
          (400 * screenRatio) / imgRatio,
          0, 0, 320, 400)

        this.saveSelfPic(canvas.toDataURL())

        this.moveDown()
        this.setUserGender(this.gender)
      },
      takeSelf () {
        parseFile(this.$refs.self.files[0], this.saveSelfPic)
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

<style scoped lang="scss">
  .pic-frame {
    top: 15vw;
    width: 75vw;
  }

  .mask {
    top: 17.5vw;
    width: 69.5vw;
    z-index: 10;
  }

  .selfPic {
    top: 17.5vw;
    left: 15vw;
    position: absolute;
    max-width: 69.5vw;
    max-height: 96.7vw;
  }

  .genderBox {
    top: 73%;
    width: 40vw;
    > label {

    }
  }

  .tips {
    top: 119vw;
    width: 65vw;
  }

  .next {
    top: 127vw;
    width: 30vw;
    position: absolute;
    &.male {
      left: 15vw;
    }
    &.female {
      right: 15vw;
    }
  }

  .next {
    top: 140vw;
    width: 36vw;
  }

  .reTake {
    top: 150vw;
    width: 36vw;
  }

  input.reTake {
    height: 12vw;
    opacity: 0;
  }
</style>
