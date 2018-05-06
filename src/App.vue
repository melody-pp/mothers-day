<template>
  <div id="app">
    <img src="./assets/home/LOGO.png" class="logo">
    <img src="./assets/home/GO.png" class="go" @click="$store.commit('moveDown')">
    <MainView/>
  </div>
</template>

<script>
  import 'normalize.css'
  import MainView from './pages/MainView'

  export default {
    name: 'App',
    components: {MainView},
    created () {
      this.$store.dispatch('getUser')
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
    top: 2vh;
    right: 0;
    z-index: 2;
    width: 30vw;
    position: absolute;
  }

  .go {
    left: 50%;
    bottom: 7vh;
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
      transform: translateX(-50%) translateY(3vh);
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
