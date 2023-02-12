import { createApp } from 'vue'
import App from './App.vue'
import vueShopify from './plugins/vue-shopify'

import './assets/main.css'

const app = createApp(App)

app.use(vueShopify, {
  storefrontApiToken: '94e742f3bdd411364a680b2c32ea41d4',
  shopifyStoreName: 'ds-devshop'
})

app.mount('#app')
