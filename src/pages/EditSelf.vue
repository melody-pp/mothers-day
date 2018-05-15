<template>
  <div class="page">
    <img src="../assets/editSelf/pic_01.jpg" class="page-bg">
    <img src="../assets/editSelf/pic_05.png" class="pic-frame center">
    <div ref="mask" class="img-container center">
      <img ref="editImg" :src="selfPic" class="selfPic" :style="imgStyle">
    </div>
    <!--<img src="../assets/editSelf/pic_04.png" class="tips center">-->
    <!-- zzh -->
    <!-- <img src="../assets/editSelf/compoundBtn.png" class="next center" @click="next"> -->
    <div class="next center" @click="next"></div>
    <img src="../assets/editSelf/pic_03.png" class="reTake center">
    <input class="reTake center" type="file" ref="self" @change="takeSelf">
    <canvas hidden ref="canvas" width="549" height="764"/>
    <img src="../assets/editMother/editpic_07.png" class="tipsTxt">
  </div>
</template>

<script>
  import { parseFile } from '../components/utils'
  import { vuexMixin, editImgMixin } from '../components/mixins/index'

  export default {
    name: 'EditSelf',
    mixins: [vuexMixin, editImgMixin],
    methods: {
      next () {
        // this.moveDown()
        this.setState({
          editedSelf: {
            deltaX: this.deltaX,
            deltaY: this.deltaY,
            picData: this.selfPic,
          }
        })

        this.postPic()
      },
      takeSelf () {
        const self = this.$refs.self
        parseFile(self.files[0], selfPic => {
          self.value = ''
          this.setState({selfPic})
        })
      },
    },
    watch: {
      selfPic () {
        this.initAF()
      },
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

  .img-container {
    top: 17.5vw;
    width: 69.5vw;
    height: 96.7vw;
    overflow: hidden;
  }

  .selfPic {
    position: absolute;
  }

  .genderBox {
    top: 130vw;
    width: 40vw;
    > label {
    }
  }

  .tips {
    top: 119vw;
    width: 65vw;
  }

  // zzh
  .next {
    top: 127vw;
    width: 45vw;
    height: 11.85vw;
    position: absolute;
    &.male {
      left: 15vw;
    }
    &.female {
      right: 15vw;
    }
    background: url(../assets/editSelf/compoundBtn.png) no-repeat center;
    background-size: contain;
  }

  .reTake {
    top: 140vw;
    width: 36vw;
  }

  input.reTake {
    height: 12vw;
    opacity: 0;
  }

  .tipsTxt {
    position: absolute;
    top: 117vw;
    left: 36vw;
    width: 30vw;
  }
</style>
