<template>
  <header class="header">
    <h1>Q</h1>
    <div class="header-left">
      <span class="header-item">{{ title }}</span>
      <span
        class="header-button header-item"
        @click="logout"
      >
        Logout
      </span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'CustomHeader',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    async logout () {
      try {
        await this.$auth.logout()
        this.$router.push({ path: '/login' })
      } catch (e) {
        console.log('logout error', e.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fafafa;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid rgba(0,0,0,0.5);
  position: fixed;
  z-index: 2;
  top: 0;
  box-shadow: 0 3px 15px rgba(5,13,72,.1);

  &-left {
    display: flex;
  }

  &-item {
    font-size: 1.2rem;
    color: #7b7888;
    margin-right: 16px;
    padding: 16px;
  }

  &-button {
    border: none;
    background-color: transparent;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
