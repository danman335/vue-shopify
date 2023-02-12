<template>
  <div class="example-component"></div>
</template>

<script>
export default {
  methods: {

  },

  async mounted() {
    const testData = await this.$shopify.test()
    console.log({testData})
  }
}
</script>

<style>

</style>