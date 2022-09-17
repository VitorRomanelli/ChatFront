require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  animejs: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Chat.io',
    title: 'Chat.io',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/bubble-chat.png' }],
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
    css: false,

    beforeEnter(el) {
      this.$anime.set(el, {
        opacity: 0,
      })
    },

    enter(el, done) {
      this.$anime({
        targets: el,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutSine',
        complete: done,
      })
    },

    leave(el, done) {
      this.$anime({
        targets: el,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutSine',
        complete: done,
      })
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css:  ['~/styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-the-mask.js',
    '~/plugins/storage',
    '~/plugins/axios',
    '~/plugins/v-emoji-picker',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',

    '@nuxtjs/moment',

    'nuxt-animejs',

    [
      '@nuxtjs/dotenv',
      { filename: `.env.${process.env.NODE_ENV}`, systemvars: true },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-toastification/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  },

  toast: {
    transition: 'Vue-Toastification__fade',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: '#3ba68b',
          primary2: '#2196f3',
          secondary: '#256cae',
          terciary: '#4e426d',
          background: '#f5f7fb',
          sysgrey: '#ccc',
          syswhite: '#fff',
          success: '#388E3C',
          info: '#0277BD',
          warning: '#fca43e',
          error: '#B71C1C',
        },
        dark: {
          primary: '#3ba68b',
          secondary: '#256cae',
          terciary: '#4e426d',
          background: '#f5f7fb',
          syswhite: '#fff',
          success: '#388E3C',
          info: '#0277BD',
          warning: '#fca43e',
          error: '#B71C1C',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
