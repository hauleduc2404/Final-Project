<template>
  <div class="flex-row d-flex align-self-center gap-3">
    <AppUserAvatarCircle></AppUserAvatarCircle>
    <div class="d-grid">
      <span class="fs-6 fw-medium lh-1 d-flex align-self-center">{{ title }}</span>
      <span class="small text-muted lh-1 d-flex align-self-center">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script>
import AppUserAvatarCircle from './AppUserAvatarCircle.vue'

export default {
  name: 'AppUserAvatar',
  components: { AppUserAvatarCircle },
  props: {
    title: {
      type: String,
      default: 'Anonymous user'
    },
    subtitle: {
      type: String,
      default: 'Some time ago'
    }
  }
}
</script>

<style scoped>

</style>
