<template>
  <button
    class="btn btn-block"
    :class="[`btn-${color}`]"
  >
    <span class="">{{ this.label }}</span>
    <span
      v-if="isLoading"
      class="spinner-border spinner-border-sm ms-2"
    ></span>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    label: {
      type: String,
      default: 'Button',
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>

</style>
