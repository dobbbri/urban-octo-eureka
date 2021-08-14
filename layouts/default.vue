<template>
  <div
    class="
      relative
      min-h-screen
      text-gray-900
      font-sans
      antialiased
      leading-normal
      tracking-normal
      font-normal
      bg-white
    "
  >
    <Nuxt />
    name: {{ user.name }} logged: {{ isLoggedIn }}
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    }
  }
}
</script>
