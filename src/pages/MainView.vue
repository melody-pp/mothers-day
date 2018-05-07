<template>
  <div class="fp-wrapper"
       @transitionend="setMoving(false)"
       :style="{transform: `translate3d(0,-${pageIndex*100}vh,0)`}">
    <Home/>
    <Copywriting/>
    <EditMother/>
    <EditSelf/>
    <PicResult/>
    <PersonalInfo/>
  </div>
</template>

<script>
  import Home from './Home'
  import Copywriting from './Copywriting'
  import EditMother from './EditMother'
  import EditSelf from './EditSelf'
  import PicResult from './PicResult'
  import PersonalInfo from './PersonalInfo'
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'MainView',
    mixins: [vuexMixin],
    components: {
      Home, Copywriting, EditMother,
      EditSelf, PicResult, PersonalInfo
    },
    data: () => ({
      startY: 0,  // 用来判断用户手势是否触发翻页
    }),
    methods: {
      touchstart (event) {
        this.startY = event.changedTouches[0].pageY
      },
      touchmove (event) {
        event.preventDefault()
      },
      touchend (event) {
        const endY = event.changedTouches[0].pageY
        if (endY - this.startY < -5) {
          this.moveDown()
        }
        if (endY - this.startY > 5) {
          this.moveUp()
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .fp-wrapper {
    transition: all 700ms ease-out;

    > div {
      height: 100vh;
      position: relative;
    }
  }
</style>
