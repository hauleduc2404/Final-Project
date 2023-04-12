<template>
  <div class="ps-4 pe-3 py-3 d-flex flex-row gap-3 justify-content-between">
    <div class="d-grid gap-1 flex-grow-1">
      <slot></slot>
    </div>
    <div @click="$emit('close')" class="lh-1 text-muted highlight-on-hover"><font-awesome-icon class="mb-2 ms-2" :icon="{prefix: 'fa', iconName: 'xmark'}"/></div>
  </div>
</template>

<script>
export default {
  name: 'AppNotificationSidebarCard'
}
</script>

<style scoped>

</style>
