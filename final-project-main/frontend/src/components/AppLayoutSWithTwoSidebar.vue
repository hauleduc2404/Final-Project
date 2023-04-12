<template>
  <div
    id="two-sidebar-layout-content"
    class="d-flex flex-row"
  >
    <aside id="first-sidebar" class="d-none d-md-block">
      <slot name="first-sidebar"></slot>
    </aside>
    <div id="main-content" class="flex-grow-1 overflow-scroll" >
      <slot></slot>
    </div>
    <aside id="second-sidebar" class="d-none d-xl-block">
      <slot name="second-sidebar"></slot>
    </aside>
  </div>
</template>

<script>

export default {
  name: 'AppLayoutSWithTwoSidebar',
  components: { }
}
</script>

<style scoped>

#main-content {
  max-height: 100%;

}


#first-sidebar {
    width: 24rem !important;
  max-width: 24rem;
}
#second-sidebar {
    width: 18rem !important;
  max-width: 18rem;
}

</style>
