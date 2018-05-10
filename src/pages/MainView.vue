<template>
  <div class="fp-wrapper" :class="{useAnimate}" @transitionend="moveEnd"
       :style="{transform: `translate3d(0,-${pageIndex*winHeight}px,0)`}">
    <Home/>
    <Copywriting/>
    <EditMother/>
    <EditSelf/>
    <PicResult/>
    <PersonalInfo/>
    <Ranking/>
    <Rules/>
    <HomePage/>
  </div>
</template>

<script>
  import Home from './Home'
  import Copywriting from './Copywriting'
  import EditMother from './EditMother'
  import EditSelf from './EditSelf'
  import PicResult from './PicResult'
  import PersonalInfo from './PersonalInfo'
  import Rules from './Rules'
  import Ranking from './Ranking'
  import HomePage from './HomePage'
  import { vuexMixin } from '../components/mixins/index'

  export default {
    name: 'MainView',
    mixins: [vuexMixin],
    components: {
      Home, Copywriting, EditMother,
      EditSelf, PicResult, PersonalInfo,
      Rules, Ranking, HomePage
    },
    mounted () {
      for (const page of document.querySelectorAll('.fp-wrapper>.page')) {
        page.style.height = this.winHeight + 'px'
      }
    }
  }
</script>

<style scoped lang="scss">
  .fp-wrapper {
    &.useAnimate {
      transition: all 700ms ease-out;
    }

    > div {
      position: relative;
    }
  }
</style>
