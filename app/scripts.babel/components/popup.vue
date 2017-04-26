<template>
  <div>
    <h3>Options</h3>
    <mrf-option v-bind:config="config"></mrf-option>
    <h3>Link</h3>
    <mrf-link></mrf-link>
  </div>
</template>
<script>
import config from './../config.js'
export default {
  data() {
    return {
      config
    }
  }
}
</script>
<style scoped>
  div {
    width: 300px;
  }
</style>
