<template>
  <div class="container mx-auto">
    <h1 class="title">nuxt-express</h1>
    <login-card :show-card="show" @closeCard="show = false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },

  mounted() {
    this.$toasted.success('Gravado.', { duration: 2000 })
  }
}
</script>
