<template>
  <div class="example-component"></div>
</template>

<script>
export default {
  methods: {

  },

  async mounted() {
    const testData = await this.$shopify.productById({'productId':7197012951295})
    console.log({testData})
  }
}
</script>

<style>

</style>