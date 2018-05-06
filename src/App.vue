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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
