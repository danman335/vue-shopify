# Vue Shopify

> Please note - this package is in active development, if you note any
> issues or encounter any difficulties please feedback I am always open
> to ways the package can be improved.

## Introduction
Vue Shopify abstracts away the setup of storefront api access from your Vue application. Please note: this package only utilises the storefront API, credentials for access are exposed to the client so it would not be secure or safe to use privileged credentials for admin API access via this package, or similar approach to API access in general.

Each method exposed by Vue Shopify returns a promise, which resolves to the requested Shopify data, or rejects (handle accordingly in your logic - most examples in these docs will use async/await within a try/catch block).

## Installation

NPM

    npm install vue-shopify

Yarn

    yarn add vue-shopify

## Getting Started
Add the plugin to your app like so:

    app.use(vueShopify, {
	 storefrontApiToken: 'your Shopify storefront API access token here',
	 shopifyStoreName: 'ds-devshop'
    })

### Things to note:
- *shopifyStoreName* is the name of your Shopify store, normally the string that precedes .myshopify.com
- *storefrontApiToken* is an access token for storefront API access for your Shopify store.

Once added, your main.js file should look something similar to this:

*main.js*

    import { createApp } from  'vue'
    import  App  from  './App.vue'
    import  vueShopify  from  './plugins/vue-shopify'
    import  './assets/main.css'

	const  app  =  createApp(App)

	app.use(vueShopify, {
		storefrontApiToken: '94e742f3bdd411364a680b2c32ea41d4',
		shopifyStoreName: 'ds-devshop'
	})
	app.mount('#app')

## Usage
Once setup, within any component of your app the package should be accessible at

    this.$shopify

Meaning you can make Shopify Storefront API requests in-component by calling something like:

    async exampleMethod() {
	    try {
		    const  testData  =  await this.$shopify.productById({'productId':7197012951295})
		    console.log({testData})
	    }catch(error){
			throw new Error(error)
		}
    }

## Methods

TBC