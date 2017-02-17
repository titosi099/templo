<template>
  <div id="app">
    <Members></Members>
  </div>
</template>

<script>
  import Members from './app/Members.vue'
  export default {
    name: 'app',
    components: {
      Members
    }
  }
</script>

<style>
  body {
    margin-top: 50px
  }
</style>
