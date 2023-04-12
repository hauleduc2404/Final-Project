<template>
  <AppLayoutWithSidebar>
    <template v-slot:default>
      <section class="flex-column d-flex ">
        <h1 class="text-capitalize mb-4 fw-bold">khoá học</h1>
        <ul class="list-unstyled d-flex flex-column gap-2 gap-lg-3">
          <li
            v-for="(course, index) in courses"
            :key="index"
          >
            <CourseListCard :course="course"/>
          </li>
        </ul>
      </section>
      <AppPagination
        @toPaginationPage="onToPaginationPage"
        v-if="this.total != 0 && isHydrated"
        :limit="this.query.limit"
        :offset="this.query.offset"
        :total="this.total"
      ></AppPagination>
    </template>
    <template v-slot:sidebar>
      <CourseListSidebar v-if="isHydrated" :popular-courses="popularCourses" :latest-courses="lastedCourses"/>
    </template>
  </AppLayoutWithSidebar>
</template>

<script>
import CourseListCard from '../components/CourseListCard.vue'
import CourseListSidebar from '../components/CourseListSidebar.vue'
import AppLayoutWithSidebar from '../components/AppLayoutWithSidebar.vue'
import AppPagination from '../components/AppPagination.vue'
import CourseService from '../services/course.service'
import CategoryService from '../services/category.service'

export default {
  name: 'CourseList',
  components: { AppPagination, AppLayoutWithSidebar, CourseListSidebar, CourseListCard },
  data() {
    return {
      isHydrated: false,
      query: {
        limit: 10,
        offset: 0,
        categoryId: undefined,
      },
      total: 0,
      courses: [],
      popularCourses: [],
      lastedCourses: [],
    }
  },
  methods: {
    async onToPaginationPage(query) {
      Object.assign(this.query, query)
      await this.hydrateCourses()
      console.log(query)
      document.getElementById('app').scrollIntoView();
    },
    async hydrateCourses() {
      let res;
      if (this.$route.params.categoryId) {
        res = await CategoryService.getCoursesByCategory(this.$route.params.categoryId)
      } else {
        res = await CourseService.getAllCourses(this.query)
      }
      if (res) {
        this.courses = res.data
        // this.courses.forEach(course => {
        //   course.categories = course.courseCategories.map(courseCategory => courseCategory.category)
        // })
        this.total = res.total ? res.total : 0
      }
      
    },
    async hydrateState() {
      await Promise.all([
        this.hydrateCourses(),
        CourseService.getPopularCourses().then(res => this.popularCourses = res.data),
        CourseService.getLatestCourses().then(res => this.lastedCourses = res.data),
      ]).catch(() => this.$router.replace({name: 'NotFound'}))
      this.isHydrated = true
    }
  },
  async mounted() {
    this.query.offset = this.$route.query.offset ? this.$route.query.offset : 0
    this.query.categoryId = this.$route.query.offset ? this.$route.query.categoryId : undefined
    await this.hydrateState()
  }
}
</script>

<style scoped>

</style>
