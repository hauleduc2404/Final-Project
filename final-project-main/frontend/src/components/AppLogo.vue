<template>
  <a
    :href="this.$router.resolve({ name: 'Welcome'}).href"
    target=""
    class="d-flex align-items-center"
  >
      <picture class="logo">
          <source
              srcset="../../public/img/icons/android-chrome-192x192.png"
              media="(max-width: 768px)"
          >
          <img
              src="../../public/img/logo.png"
              alt="Learn English"
              style="height: calc(var(--primary-nav-height) - 0.5rem); width: auto"
          ></picture>
  </a>
</template>

<script>
export default {
  name: 'AppLogo'
}
</script>

<style scoped>
       img {
         display: inline-block;
         height: 1.75rem;
       }
</style>
