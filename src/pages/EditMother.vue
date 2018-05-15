<template>
  <div class="page">
    <img src="../assets/editMother/pic_01.jpg" class="page-bg">
    <img src="../assets/editMother/pic_04.png" class="pic-frame center">

    <div ref="mask" class="img-container center">
      <img ref="editImg" :src="motherPic" class="motherPic" :style="imgStyle">
    </div>
    <img src="../assets/editMother/editpic_07.png" class="tipsTxt">

    <img src="../assets/editMother/pic_02.png" class="next center">
    <input class="next center" type="file" ref="self" @change="takeSelf">

    <img src="../assets/editMother/pic_03.png" class="reTake center">
    <input class="reTake center" type="file" ref="mother" @change="takeMother">

    <canvas hidden ref="canvas" width="549" height="764"/>
  </div>
</template>

<script>
  import { parseFile } from '../components/utils'
  import { vuexMixin, editImgMixin } from '../components/mixins/index'

  export default {
    name: 'EditMother',
    mixins: [vuexMixin, editImgMixin],
    methods: {
      takeSelf () {
        const self = this.$refs.self
        parseFile(self.files[0], selfPic => {
          self.value = ''
          this.moveDown()
          this.setState({
            selfPic,
            editedMother: {
              deltaX: this.deltaX,
              deltaY: this.deltaY,
              picData: this.motherPic,
            }
          })
        })
      },
      takeMother () {
        const mother = this.$refs.mother
        parseFile(mother.files[0], motherPic => {
          mother.value = ''
          this.setState({motherPic})
        })
      },
    },
    watch: {
      motherPic () {
        this.initAF()
      }
    }
  }
</script>

<style scoped>
  .pic-frame {
    top: 15vw;
    width: 75vw;
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

  .tipsTxt {
    position: absolute;
    top: 117vw;
    left: 36vw;
    width: 30vw;
  }
</style>
