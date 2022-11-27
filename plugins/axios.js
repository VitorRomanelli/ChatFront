import https from 'https'

export default function ({ $axios, $toast, store, error: nuxtError }) {
  // Set baseURL (both client and server)
  $axios.setBaseURL(process.env.API_KEY)

  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  $axios.onRequest((config) => {
    const token = store.state.auth.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    store._vm.$nextTick(() => {
      if (store._vm.$nuxt) {
        store._vm.$nuxt.$loading.start()
        return config
      }
    })
  })

  $axios.onResponse((response) => {
    store._vm.$nextTick(() => {
      if (store._vm.$nuxt) {
        store._vm.$nuxt.$loading.finish()
      }
    })

    return response
  })

  $axios.onError((error) => {
    store._vm.$nextTick(() => {
      if (store._vm.$nuxt) {
        store._vm.$nuxt.$loading.finish()
      }
    })

    if (error.response) {
      const code = error.response.data.status
      const message = error.response.data

      if (message && code) {
        $toast.error(message + ' - ' + 'Código: ' + code)
      }

      if (message) {
        $toast.error(message)
      } else {
        $toast.error('Ocorreu um erro!')
      }
    }
  })
}
