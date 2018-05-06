<template>
  <div class="fp-wrapper"
       @touchstart="touchstart" @touchend="touchend"
       @touchmove="touchmove" @transitionend="setMoving(false)"
       :style="{transform: `translate3d(0,-${pageIndex*100}vh,0)`}">
    <Home/>
    <Copywriting/>
    <EditMother/>
    <EditSelf/>
  </div>
</template>

<script>
  import Home from './Home'
  import Copywriting from './Copywriting'
  import EditMother from './EditMother'
  import EditSelf from './EditSelf'
  import { mapMutations } from 'vuex'

  export default {
    name: 'MainView',
    components: {Home, Copywriting, EditMother, EditSelf},
    computed: {
      pageIndex () {
        return this.$store.state.pageIndex
      }
    },
    data: () => ({
      startY: 0,  // 用来判断用户手势是否触发翻页
    }),
    methods: {
      ...mapMutations(['moveUp', 'moveDown', 'moveTo', 'setMoving']),
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
