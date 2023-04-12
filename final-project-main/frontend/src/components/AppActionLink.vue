<template>
  <a :href="href" class="link-primary hov">
    {{ label }}
  </a>
</template>

<script>
export default {
  name: 'AppActionLink' ,
  props: {
    label: {
      required: true,
      default: 'Link',
      type: String,
    },
    href: {
      required: true,
      default: '/',
      type: String,
    }
  }
}
</script>

<style scoped>

</style>
