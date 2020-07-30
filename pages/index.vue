<template>
  <div class="container">
    <custom-header title="Projects" />
    <div class="content">
      <project
        v-for="project in projects"
        :key="project.id"
        :is-active="project.is_active"
        :logo-url="project.logo_url"
        :name="project.name"
        :project-id="project.id"
        :spent-time-week="project.spent_time_week"
        :spent-time-month="project.spent_time_month"
        :spent-time-all="project.spent_time_all"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import CustomHeader from '~/components/CustomHeader'
import Project from '~/components/Project'

const { mapState } = createNamespacedHelpers('projects')

export default {
  middleware: 'authenticated',
  components: {
    CustomHeader,
    Project
  },
  async fetch ({ store, $axios }) {
    try {
      const { data } = await $axios.get('/projects-manage/index')
      store.commit('projects/setProjects', data.projects)
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
  computed: {
    ...mapState({
      projects: state => state.projects
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  padding-top: 64px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;

  overflow-y: scroll;
}
.content {
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  flex-direction: column;
  justify-content:  flex-start;
  align-items: center;
  padding: 0 16px;
  margin: 0;
}
</style>
