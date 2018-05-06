<template>
  <div id="app">
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
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
