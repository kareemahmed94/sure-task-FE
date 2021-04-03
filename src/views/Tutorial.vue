<template>
  <div id="prismic-tutorial">
    <h1>Hello world</h1>

  </div>
</template>

<script>
import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'

Vue.use(VueHighlightJS)

export default {
  name: 'Tutorial'
}
</script>

<style>
@import "../assets/css/tutorial/highlight.min.css";
@import "../assets/css/tutorial/tutorial.min.css";
</style>
