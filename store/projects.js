export const state = () => ({
  projects: [],
  snackBars: []
})

export const actions = {
  showSnackBar ({ commit }, error) {
    commit('addSnackBar', error)
    setTimeout(() => {
      commit('removeSnackBar', error.id)
    }, 3000)
  }
}

export const mutations = {
  setProjects (state, projects = []) {
    state.projects = projects
  },
  addSnackBar (state, snackBar) {
    state.snackBars.push(snackBar)
  },
  removeSnackBar (state, id) {
    state.snackBars.splice(state.snackBars.findIndex(error => error.id === id), 1)
  }
}
