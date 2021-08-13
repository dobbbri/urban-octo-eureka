export default {
  target: "server",

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  plugins: [],

  components: true,

  buildModules: ["nuxt-vite", "@nuxtjs/tailwindcss", "@nuxtjs/eslint-module"],

  tailwindcss: {
    viewer: false,
  },

  modules: ["@nuxt/http"],

  serverMiddleware: {
    "/api": "~/api",
  },

  /*
   ** For deployment you might want to edit host and port
   */
  // server: {
  //  port: 8000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  build: {},
};
