<template>
  <div>
    <nuxt />
    <snackbar
      v-for="(snackbar, index) in snackbars"
      :key="snackbar.id"
      :style="{'margin-bottom': `${40 * index}px`}"
      :type="snackbar.type"
      :text="snackbar.text"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Snackbar from '../components/Snackbar'
export default {
  components: { Snackbar },
  computed: {
    ...mapState({
      snackbars: state => state.projects.snackBars
    })
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
