module.exports = {
  srcDir: "client",
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Home",
    titleTemplate: "My Nuxt SSR | %s",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#f00" },
  /*
   ** Global CSS
   */
  css: ["~assets/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/RegisterModule"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/router"],
  routerModule: {
    fileName: "router"
  },
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
