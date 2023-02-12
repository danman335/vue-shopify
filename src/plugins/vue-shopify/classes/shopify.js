export default class Shopify {
  constructor(storefrontApiKey, shopifyStoreName, storefrontApiVersion = '2023-01') {
    if (!storefrontApiKey || !shopifyStoreName) {
      throw new Error('Unable to create a Shopify connection')
    }

    // Set plugin class variables for us in requests and methods.
    this.storefrontApiKey = storefrontApiKey
    this.shopifyStoreName = shopifyStoreName
    this.storefrontApiVersion = storefrontApiVersion

    // Set the plugin configs, construct the Shopify request URL.
    this.setShopifyRequestUrl()
    this.setRequestConfig()
  }

  /**
   * Builds the request URL from the component parts.
   */
  setShopifyRequestUrl() {
    this.shopifyRequestUrl = `https://${this.shopifyStoreName}.myshopify.com/api/${this.storefrontApiVersion}/graphql.json`
  }

  /**
   * Sets the global fetch request config options.
   */
  setRequestConfig() {
    this.requestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.storefrontApiKey
      }
    }
  }

  /**
   * Makes a test request to the given Shopify store to make sure the connection
   * works.
   * @returns {Promise} - promise containing Storefront API request data.
   */
  async test() {
    const query = `{
        shop {
          id
          name
          primaryDomain {
            host
            url
          }
        }
      }`


    try {
      const response = await fetch(this.shopifyRequestUrl, {
        ...this.requestConfig,
        body: JSON.stringify({ query: query })
      })
      return response.json()
    } catch (error) {
      throw new Error(error)
    }
  }
}