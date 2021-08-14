export default function ({ $http, store, $toasted }) {
  $http.onRequest((config) => {
    store.commit('LOADING', true)
    $http.setHeader('Content-Type', 'application/json')
    console.log('Making request to ' + config.url)

    if (store.state.auth.isAuthenticated) {
      $http.setToken(store.state.auth.token, 'Bearer')
      config.headers.set('Authorization', 'Bearer ' + store.state.auth.token)
    }

    return config
  })

  $http.onResponse((response) => {
    store.commit('LOADING', false)

    return response
  })

  $http.onError((error) => {
    try {
      store.commit('LOADING', false)

      let message = 'Erro não obtido!!!'

      if (error.response.data.error) {
        message = error.response.data.error
      } else {
        message = error.message
      }

      $toasted.error(message, { duration: 8000 })
      console.error(error)

      return { success: false }
    } catch (e) {}
  })
}
