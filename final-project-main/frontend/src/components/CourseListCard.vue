<template>
  <router-link
    class="card highlight-border-on-hover"
    :to="{name: 'CourseView', params: {courseId: course.id }}"
  >
    <article>
      <div class="row g-0 overflow-hidden">
        <div
          class="col-md-3 col-12 hidden-md-and-up overflow-hidden d-flex align-items-center d-none d-md-block  rounded-start"
        >
          <img
            src="https://www.izone.edu.vn/wp-content/uploads/2022/12/Thumbnail-Templates-7.png"
            alt="Thumbnail"
          >
        </div>
        <div class="col-md-9 col-12">
          <div class="card-body h-100 d-flex flex-column p-4">
            <div class="mb-2 d-grid gap-2">
              <small
                v-for="(category, index) in course.categories"
                :key="index"
                class="text-primary text-uppercase fw-medium font-monospace"
              >{{ category.title }}</small>
            </div>
            <h2
              class="card-title fw-medium fs-5 mb-0"
            >{{ course.title }}</h2>
            <p
              class="card-description card-text text-muted fs-6 mt-3 mb-0"
            >{{ course.description }}</p>
            <p class="card-text mt-3 d-flex flex-row justify-content-between">
              <small class="text-muted">Posted {{ humanReadableCreatedAt }}</small>
            </p>
            <!--            <div class="card-text text-muted d-none d-md-block mt-3"><span class="article-link">Xem thêm</span>-->
            <!--              <font-awesome-icon-->
            <!--                class="ms-1 d-inline-block"-->
            <!--                :icon="{iconName: 'arrow-up-right-from-square', prefix: 'fa'}"-->
            <!--              />-->
            <!--            </div>-->
          </div>

        </div>

      </div>

    </article>
  </router-link>
</template>

<script>
import { useTimeAgo } from '@vueuse/core'

export default {
  name: 'CourseListCard',
  props: {
    course: {
      type: Object,
      default: () => ({}),
    }
  },
  computed: {
    href() {
      return ''
    }
  },
  setup(props) {
    let humanReadableCreatedAt = useTimeAgo(props.course.createdAt)
    return { humanReadableCreatedAt }
  }
}
</script>

<style scoped>

.card {
//outline: 1px solid transparent; color: inherit; text-decoration: inherit;
}

.card img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 576px) {
  .card img {
    display: none;

  }
}

.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
