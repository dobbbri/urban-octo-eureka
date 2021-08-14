export const state = () => ({
  isLoggedIn: false,
  user: {},
  token: null
})

export const mutations = {
  user(state, user) {
    state.isLoggedIn = !!user
    state.user = user || {}
  },
  token(state, token) {
    state.token = token || null
  }
}
