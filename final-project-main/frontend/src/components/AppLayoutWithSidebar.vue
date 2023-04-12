<template>
  <AppNavBar/>
  <div class="container-lg my-4 my-lg-5">
    <div class="d-flex flex-xl-row flex-column gap-xl-0 gap-5">
      <div class="col-xl-9 col-12 pe-xl-5">
        <slot></slot>
      </div>
      <aside
        id="sidebar"
        class="col-xl-3 col-12"
      >
        <slot name="sidebar"></slot>
      </aside>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>

import AppFooter from './AppFooter.vue'
import AppNavBar from './AppNavBar.vue'

export default {
  name: 'AppLayoutWithSidebar',
  components: { AppNavBar, AppFooter },
}
</script>

<style scoped>
#sidebar {
  height: fit-content;
  position: sticky;
  top: calc(var(--top-nav-height) + 3rem);
}
</style>
