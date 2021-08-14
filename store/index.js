export const state = () => ({
  isLoading: false
})

export const mutations = {
  LOADING: (state, value) => (state.isLoading = value)
}
