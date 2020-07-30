<template>
  <div class="container">
    <custom-header :title="`Project: ${project.name}`" />
    <div class="sub-header">
      <nuxt-link class="sub-header__back" type="button" to="/">
        Back
      </nuxt-link>
    </div>
    <div v-if="project" class="card">
      <form class="card__form" @submit.prevent="updateProject">
        <span class="name">Name</span>
        <input v-model="name" class="input">
        <custom-button type="submit" text="ok" />
      </form>
    </div>
    <p v-if="error" class="error__text">Error</p>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

import getErrorMessage from '../../utils/GetErrorMessage'
import CustomHeader from '~/components/CustomHeader'
import CustomButton from '~/components/CustomButton'

const { mapActions } = createNamespacedHelpers('projects')

export default {
  middleware: 'authenticated',
  components: {
    CustomHeader,
    CustomButton
  },
  async asyncData ({ params, $axios }) {
    try {
      const { data } = await $axios.get(`/projects-manage/${params.id}`)
      return {
        project: data.project,
        name: data.project.name,
        error: false
      }
    } catch (e) {
      return {
        error: true
      }
    }
  },
  methods: {
    async updateProject () {
      try {
        const { params } = this.$route
        const formData = new FormData()
        formData.append('name', this.name)
        const {
          data: res
        } = await this.$axios.post(
          `/projects-manage/update?id=${params.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        this.project = res.project
        this.showSnackBar({
          id: `_${Math.random().toString(36).substr(2, 9)}`,
          text: 'Project has been updated!',
          type: 'success'
        })
      } catch (err) {
        this.showSnackBar({
          id: `_${Math.random().toString(36).substr(2, 9)}`,
          text: getErrorMessage(err),
          type: 'error'
        })
      }
    },
    ...mapActions(['showSnackBar'])
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
}
.sub-header {
  background-color: #c1c8d2;
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  & .sub-header__back {
    background-color: #cecece;
    color: #151515;
    text-transform: uppercase;
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #bebfbf;
    font-weight: bold;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }
}
.card {
  padding: 64px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #0002;
  border-radius: 4px;
  margin: 16px;
  box-shadow: 0 3px 15px rgba(5,13,72,.1);

  & .card__form {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 16px;

    @media screen and (max-width: 576px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      justify-content: center;
      align-items: center;
      grid-gap: 32px;
    }
  }

  @media screen and (max-width: 576px) {
    padding: 8px;
  }

  &-placeholder {
     @media screen and (max-width: 576px) {
       display: none;
    }
  }
}
.name {
  font-size: 1.5rem;
  font-weight: 500;
  margin-right: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.edit {
  margin-bottom: 32px;
}
.input {
  min-width: 320px;
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
.error__text {
  color: red;
  font-size: 2rem;
}
</style>
