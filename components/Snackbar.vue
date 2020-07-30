<template>
  <div class="info" :class="{ 'info--error': type === 'error', 'info--success': type === 'success' }">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    type: {
      type: String,
      required: false,
      default: null
    },
    text: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  position: fixed;
  bottom: 16px;
  right: 16px;
  padding: 8px 16px;
  background-color: blue;
  color: #ffffff;
  border-radius: 8px;
  font-weight: bold;

  &--error {
    background-color: red;
  }
  &--success {
    background-color: green;
  }
}
</style>
