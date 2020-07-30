<template>
  <button class="btn" v-bind="$attrs" v-on="$listeners">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: #395378;
  border: 1px solid #395378;
  border-radius: 8px;
  padding: 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
