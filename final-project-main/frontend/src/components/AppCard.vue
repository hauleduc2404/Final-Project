<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
<!--      <h5 v-if="title" class="card-title">{{ this.title }}</h5>-->
<!--      <p class="card-text" v-if="title">{{ this.text }}</p>-->
<!--      <a href="#" class="btn btn-primary">Go somewhere</a>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    }
  }}
</script>

<style scoped>

</style>
