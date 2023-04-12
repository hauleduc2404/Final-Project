<template>
  <router-link class="card border-0 text-reset text-decoration-none" :to="{name: 'CourseView', params: {courseId: course.id }}">
    <article>
      <div class="row g-0 overflow-hidden">
        <div
          class="col-3 hidden-md-and-up overflow-hidden d-flex align-items-center"
        >
          <img
            class="img-fluid rounded"
            src="https://www.izone.edu.vn/wp-content/uploads/2022/12/Thumbnail-Templates-7.png"
            alt="Thumbnail"
          >
        </div>
        <div class="col-9 d-flex align-items-center">
          <div class="card-body p-0 px-3 p-xl-3">
          <span class="mb-2 card-text "
          >{{ course.title }}</span>
          </div>
        </div>
      </div>
    </article>
  </router-link>

</template>

<script>
export default {
  name: 'CourseListSidebarCard',
  props: {
    course: {
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>
