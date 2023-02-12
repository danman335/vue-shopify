import Shopify from './classes/shopify'

export default {
  install(vue, opts) {
    const { storefrontApiToken, shopifyStoreName, storefrontApiVersion } = opts

    const shopify = new Shopify(storefrontApiToken, shopifyStoreName, storefrontApiVersion)
    vue.config.globalProperties.$shopify = shopify
  }
}