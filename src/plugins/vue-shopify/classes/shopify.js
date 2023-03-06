import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import productByHandle from '../graphql/queries/productByHandle.gql'
import productById from '../graphql/queries/product.gql'

export default class Shopify {
  constructor(
    storefrontApiKey,
    shopifyStoreName,
    storefrontApiVersion = '2023-01',
    country = 'GB',
    language = 'EN'
  ) {
    if (!storefrontApiKey || !shopifyStoreName) {
      throw new Error('Unable to create a Shopify connection')
    }

    // Set plugin class variables for us in requests and methods.
    this.storefrontApiKey = storefrontApiKey
    this.shopifyStoreName = shopifyStoreName
    this.storefrontApiVersion = storefrontApiVersion
    this.country = country.toUpperCase()
    this.language = language.toUpperCase()

    // Set the plugin configs, construct the Shopify request URL.
    this.setShopifyRequestUrl()
    this.createShopifyClient()
  }

  createShopifyClient() {
    const cache = new InMemoryCache()

    this.shopifyClient = new ApolloClient({
      uri: this.shopifyRequestUrl,
      cache,
      headers: {
        'X-Shopify-Storefront-Access-Token': this.storefrontApiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Builds the request URL from the component parts.
   */
  setShopifyRequestUrl() {
    this.shopifyRequestUrl = `https://${this.shopifyStoreName}.myshopify.com/api/${this.storefrontApiVersion}/graphql.json`
  }

  /**
   * Fetches a product using its product ID.
   * @param {String} productId - ID of the product to be fetched.
   * @param {String} country - ISO-2 country code to localise the data to.
   * @param {String} language - Language code to standardise data to.
   * @returns {Promise} - promise containing Storefront API request data.
   */
  async productById({
    productId,
    country = this.country,
    language = this.language
  }) {
    return this.shopifyClient.query({
      query: productById,
      variables: {
        country,
        language,
        id: `gid://shopify/Product/${productId}`
      }
    })
  }

  /**
   * Fetches a product using its handle.
   * @param {String} productId - ID of the product to be fetched.
   * @param {String} country - ISO-2 country code to localise the data to.
   * @param {String} language - Language code to standardise data to.
   * @returns {Promise} - promise containing Storefront API request data.
   */
  async productByHandle({
    productHandle,
    country = this.country,
    language = this.language
  }) {
    return this.shopifyClient.query({
      query: productByHandle,
      variables: {
        country,
        language,
        handle: productHandle
      }
    })
  }
}