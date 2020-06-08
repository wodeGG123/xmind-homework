<template>
  <div id="app" v-loading="loading">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loading: false
    }
  },
  created() {
    // 由于多次使用到categories,则把它放进store中，只需要请求一次即可
    this.setStoreCategories()
  },
  methods: {
    async setStoreCategories() {
      this.loading = true
      await this.$store.dispatch('categories/setCategories')
      this.loading = false
    }
  }
}
</script>
