<template>
  <div class="d-flex gap-3 gap-lg-5 flex-column">
    <section class="">
      <h2 class="h4 fw-medium text-capitalize mb-3">Khoá học mới</h2>
      <ul class="list-unstyled d-flex flex-column flex-md-row flex-xl-column gap-2">
        <li
          v-for="(course, index) in latestCourses.slice(0, 3)"
          :key="index"
        >
          <CourseListSidebarCard :course="course"></CourseListSidebarCard>
        </li>
      </ul>
    </section>
    <section class="">
      <h2 class="h4 fw-medium text-capitalize mb-3">Nổi bật</h2>
      <ul class="list-unstyled d-flex flex-column flex-md-row flex-xl-column gap-2">
        <li
          v-for="(course, index) in popularCourses.slice(0, 3)"
          :key="index"
        >
          <CourseListSidebarCard :course="course"></CourseListSidebarCard>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import CourseListSidebarCard from './CourseListSidebarCard.vue'

export default {
  name: 'CourseListSidebar',
  components: { CourseListSidebarCard },
  props: {
    popularCourses: {
      type: Array
    },
    latestCourses: {
      type: Array
    },
  },
}
</script>

<style scoped>

</style>
