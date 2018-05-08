<template>
  <div class="fp-wrapper" :class="{useAnimate}"
       @touchmove="touchmove" @transitionend="moveEnd"
       :style="{transform: `translate3d(0,-${pageIndex*100}vh,0)`}">
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
    methods: {
      touchmove (event) {
        event.preventDefault()
      },
    }
  }
</script>

<style scoped lang="scss">
  .fp-wrapper {
    &.useAnimate {
      transition: all 700ms ease-out;
    }

    > div {
      height: 100vh;
      position: relative;
    }
  }
</style>
