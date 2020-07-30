<template>
  <div class="container">
    <form class="form" @submit.prevent="submit">
      <h2>LOGIN</h2>
      <input
        v-model="email"
        class="input"
        placeholder="Email"
        autocomplete="email"
      >
      <input
        v-model="password"
        class="input"
        type="password"
        placeholder="Password"
        autocomplete="password"
      >
      <custom-button type="submit" text="Login" />
    </form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import CustomButton from '~/components/CustomButton'

const { mapActions } = createNamespacedHelpers('projects')

export default {
  auth: 'guest',
  components: {
    CustomButton
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email.trim().toLowerCase(),
            password: this.password.trim()
          }
        })
      } catch (e) {
        if (e.response && e.response.data.first_errors) {
          Object.keys(e.response.data.first_errors).forEach((key) => {
            this.showSnackBar({
              id: `_${Math.random().toString(36).substr(2, 9)}`,
              text: e.response.data.first_errors[key],
              type: 'error'
            })
          })
        } else {
          this.showSnackBar({
            id: `_${Math.random().toString(36).substr(2, 9)}`,
            text: 'Something went wrong!',
            type: 'error'
          })
        }
      }
    },
    ...mapActions(['showSnackBar'])
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  margin: 0 auto;
  min-height: 100vh;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.form {
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  min-height: 300px;
}
.input {
  width: 100%;
  background-color: #fff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 16px 8px;
  font-size: 1rem;
  color: #151515;
  &::placeholder {
    color: #cccccc;
  }
}
</style>
