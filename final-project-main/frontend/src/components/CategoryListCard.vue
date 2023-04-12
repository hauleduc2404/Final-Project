<template>
  <router-link class="h-100 text-reset d-block text-decoration-none" :to="{name: 'CategoryView', params: { categoryId: category.id } }">
    <article class="card highlight-border-on-hover h-100">
      <div class="card-body">
        <h2 class="card-title mb-2 fw-medium fs-5">{{ category.title }}</h2>
        <p class="card-text text-muted"
        >{{ category.description }}</p>
      </div>
    </article>
  </router-link>
</template>

<script>
export default {
  name: 'CategoryListCard',
  computed: {

  },
  props: {
    category: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>
