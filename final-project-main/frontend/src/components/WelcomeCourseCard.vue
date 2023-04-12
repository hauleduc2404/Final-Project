<template>
  <div class="col zoom-on-hover">
    <div class="card highlight-on-hover h-100">
      <div class="overflow-hidden">
        <img
          style="object-fit: cover; aspect-ratio: 2/1"
          class="card-img-top w-100 h-100 "
          alt="Course Cover"
          src="https://images.unsplash.com/photo-1536093058105-e4d1e0c5e525?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHBlb3BsZSUyMGdyb3VwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        >
      </div>
      <div class="card-body d-flex flex-column flex-grow-1">
        <h5 class="fs-6 fw-medium">{{ course.title }}</h5>
        <p class="masked card-text text-muted">{{ course.description}}</p>
        <router-link class="ms-auto mt-auto" :to="{name: 'CourseView', params: {courseId: course.id}}">
          <button class="btn btn-outline-primary ">Đăng ký</button>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'WelcomeCourseCard',
  props: {
    course: {
      type: Object,
    }
  }
}
</script>

<style scoped>
.zoom-on-hover img {
  transition: transform  0.4s ease-out;
}
.zoom-on-hover:hover img {
    transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.masked {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
