<template>
  <div class="page">
    <img src="../assets/editMother/pic_01.jpg" class="page-bg">
    <img src="../assets/editMother/pic_04.png" class="pic-frame center">
    <div ref="mask" class="img-container center">
      <img ref="motherImg" :src="motherPic" class="motherPic" :style="imgStyle">
    </div>
    <!--<img src="../assets/editMother/pic_01.png" class="tips center">-->
    <img src="../assets/editMother/pic_02.png" class="next center">
    <input class="next center" type="file" ref="self" @change="takeSelf">
    <img src="../assets/editMother/pic_03.png" class="reTake center">
    <input class="reTake center" type="file" ref="mother" @change="takeMother">
    <canvas hidden ref="canvas" width="549" height="764"/>
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
          -this.deltaX,
          -this.deltaY,
          549 * screenRatio,
          764 * screenRatio,
          0, 0, 549, 764)

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
        console.log(evt);
        if(this.deltaX > 0){
          this.deltaX = 0;
        }
       // alert(this.width + "    " + this.height);
        // if(this.deltaX + this.width < 789){
        //   this.deltaX = 789 - this.width;
        // }


        if(this.deltaY > 0){
          this.deltaY = 0;
        }
        // if(this.deltaY+this.height < 764){
        //   this.deltaY = 764 - this.height;
        // }
      }
      // pressUp (evt) {
      //   alert('test')
      //   this.deltaX += evt.deltaX
      //   this.deltaY += evt.deltaY
      //   if(this.deltaX > 0){
      //     this.deltaX = 0;
      //   }
      //
      //   if(this.deltaX + 549 < 789){
      //     this.deltaX = 789 - 549;
      //   }
      //
      //
      //   if(this.deltaY > 0){
      //     this.deltaY = 0;
      //   }
      //   // if(this.deltaY+764 < 864){
      //   //   this.deltaY = 864 - 764;
      //   // }
      // },
    },
    watch: {
      motherPic () {
        try {
          afInstance.destroy()
        } catch (e) {}

        afInstance = new AlloyFinger(this.$refs.mask, {
          pressMove: this.pressMove.bind(this)
         // pressUp: this.pressUp.bind(this)
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
