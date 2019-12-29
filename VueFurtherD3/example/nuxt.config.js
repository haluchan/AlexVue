module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  mode: 'universal',
  srcDir: 'client',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/style.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/directive'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/router'
  ],
  routerModule: {
    fileName: 'router'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    localStorage: false,
    strategies: {
      facebook: {
        client_id: '824423721345552',
        authorization_endpoint: 'https://facebook.com/v5.0/dialog/oauth',
        userinfo_endpoint: '/auth/user',
        scope: ['public_profile', 'email']
      }
    },
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {}
  }
}
