<template>
  <AppNavBar v-if="showHeader"/>
  <slot/>
  <AppFooter v-if="showFooter"/>
</template>

<script>
import AppNavBar from './AppNavBar.vue'
import AppFooter from './AppFooter.vue'

export default {
  name: 'AppLayoutWrapper',
  components: { AppFooter, AppNavBar },
  props: {
    showFooter: {
      default: true,
      type:Boolean,
    },
    showHeader: {
      default: true,
      type:Boolean,
    },
  }
}
</script>

<style scoped>

</style>
