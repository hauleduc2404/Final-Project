<template>
  <AppLayoutWithSidebar>
    <template v-slot:default>
      <h1 class="text-capitalize mb-4 fw-bold">chuyên mục</h1>
      <ul class="list-unstyled gap-2 gap-lg-3">
        <li v-for="(category, index) in categories" :key="`category-${index}`" >
          <CategoryListCard :category="category"></CategoryListCard>
        </li>
      </ul>
<!--      <AppPagination class="" :current-page="1" :total="0"></AppPagination>-->
    </template>
    <template v-slot:sidebar></template>
  </AppLayoutWithSidebar>
</template>

<script>
import AppLayoutWithSidebar from '../components/AppLayoutWithSidebar.vue'
import CategoryListCard from '../components/CategoryListCard.vue'
import CategoryService from '../services/category.service'

export default {
  name: 'CategoryList',
  components: { CategoryListCard, AppLayoutWithSidebar },
  data() {
    return {
      categories: [],
    }
  },
  async mounted() {
    this.categories = await CategoryService.getCategories()
      .then(res => this.categories = res.data);
    console.log('this.categories=', this.categories)
  }
}
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
