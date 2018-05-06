<template>
  <div id="app">
    <img src="./assets/home/LOGO.png" class="logo" v-show="pageIndex!==4">
    <img src="./assets/home/GO.png" class="go" @click="moveDown">
    <MainView/>
  </div>
</template>

<script>
  import { vuexMixin } from './components/mixins'
  import 'normalize.css'
  import MainView from './pages/MainView'

  export default {
    name: 'App',
    components: {MainView},
    mixins: [vuexMixin],
    created () {
      this.getUser()
    }
  }
</script>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .logo {
    top: 5vw;
    right: 0;
    z-index: 2;
    width: 30vw;
    position: absolute;
  }

  .go {
    left: 50%;
    bottom: 15vw;
    z-index: 2;
    width: 12vw;
    position: absolute;
    animation: go 3s infinite;
  }

  @keyframes go {
    0% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(7vw);
    }
    100% {
      transform: translateX(-50%) translateY(0);
    }
  }

  .page-bg {
    width: 100vw;
    height: 100vh;
  }

  .center {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
</style>
