<template>
  <div>
    {{user.id}}
    {{user.name}}
  </div>
</template>

<script>
  export default {
    name: 'MainView',
    computed: {
      user () {
        return this.$store.state.user
      }
    }
  }
</script>

<style scoped>

</style>
