<template>
  <AppLayoutWrapper>
    <AppLayoutContainer>
      <div class="d-grid gap-5">
        <div class="pb-3">
          <span class="d-block mb-5 text-primary fs-3 fw-bold text-uppercase">Learn English</span>
          <h1 class="fw-bolder fs-1 mb-2 ">HỌC VIỆN ĐÀO TẠO IELTS</h1>
          <h2 class="fw-medium h4 mb-5">Tận tâm đào tạo từ mất gốc
                                        đến<br><span class="text-primary fw-bold">IELTS 7.0+ sau 1.5 năm</span>
          </h2>
          <router-link :to="{name: 'Register'}">
            <AppButton
              class="btn btn-primary btn-lg fw-medium"
              label="Đăng ký ngay"
            ></AppButton>
          </router-link>
          <div class="d-flex flex-column flex-lg-row gap-2 gap-lg-3 mt-5">
            <div
              v-for="(point, index) in points"
              :key="`${index}`"
              class="point-zoom-on-hover p-3 card col shadow-sm highlight-on-hover highlight-border-on-hover"
            >
              <div class="card-body text-center">
                <p class="fs-3 text-primary mt-1 mb-4"><font-awesome-icon size="lg" :icon="{prefix: 'fa', iconName:point.iconName}"/></p>
                <div class="card-title fw-medium fs-5">{{ point.title }}</div>
                <p class="text-muted fs-6 card-text">{{ point.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="\">
          <h2 class="fw-bold h2 mb-4">Students are viewing</h2>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 g-lg-3">
            <template v-for="(course, index) in courses.slice(0, 8)" :key="index">
              <WelcomeCourseCard :course="course"/>
            </template>
          </div>
        </div>

        <div class="">
          <h2 class="fw-bold h2 mb-4">Popular categories</h2>
          <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-2 g-lg-3">
            <div v-for="(category, index) in categories.slice(0,4)" :key="index" class="col">
              <CategoryListCard :category="category"/>
            </div>
          </div>
        </div>

        <div class="">
          <h2 class="fw-bold h2 mb-4">Student reviews</h2>
          <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-2 g-lg-3">
            <div v-for="(card, index) in [1,2,3,4,5,6]" :key="index" class="col">
              <CourseReviewCard/>
            </div>
          </div>
        </div>
      </div>

    </AppLayoutContainer>
  </AppLayoutWrapper>
</template>

<script>
// @ is an alias to /src
import AppLayoutWrapper from '../components/AppLayoutWrapper.vue'
import AppLayoutContainer from '../components/AppLayoutContainer.vue'
import AppButton from '../components/AppButton.vue'
import WelcomeCourseCard from '../components/WelcomeCourseCard.vue'
import CourseReviewCard from '../components/CourseReviewCard.vue'
import CategoryListCard from '../components/CategoryListCard.vue'
import CourseService from '../services/course.service'
import CategoryService from '../services/category.service'

export default {
  name: 'Home',
  components: {
    CategoryListCard,
    CourseReviewCard,
    WelcomeCourseCard,
    AppButton,
    AppLayoutContainer,
    AppLayoutWrapper,
  },
  data() {
    return {
      courses: [],
      categories: [],
      points: [
        {
          title: 'Chương trình toàn diện',
          description: 'Giáo trình tập trung phát triển toàn diện các kỹ năng và được dạy bởi giảng viên trình độ cao',
          iconName: 'book'
        },
        {
          title: 'Học viên là trung tâm',
          description: 'Tối ưu hoá chương trình cho từng nhu cầu, tập trung phát triển toàn diện các kỹ năng',
          iconName: 'book-open-reader'
        },
        {
          title: 'Cam kết chất lượng',
          description: 'Hệ thống quản lý chất lượng với các bài test mục đích liên tục ôn lại và đào sâu kiến thức',
          iconName: 'award'
        },
      ]
    }
  },
  methods: {
    async hydrateCourses() {
      return CourseService.getAllCourses().then(res => {
        this.courses = res.data
        this.courses.forEach(course => {
          course.categories = course.courseCategories.map(courseCategory => courseCategory.category)
        })
        this.total = res.total
      })
    },
    async hydrateCategories() {
      return CategoryService.getCategories().then(res => {
        this.categories = res.data
      })
    },
  },
  mounted() {
     this.hydrateCourses();
     this.hydrateCategories();
  }
}
</script>

<!--<style scoped>-->
<!--.point-zoom-on-hover {-->
<!--  -webkit-transform-origin: center;-->
<!--  transition: transform  0.3s ease-out;-->
<!--  transition-delay: 0.1s;-->
<!--}-->

<!--.point-zoom-on-hover:first-of-type {-->
<!--  -webkit-transform-origin: left;-->
<!--}-->

<!--.point-zoom-on-hover:last-of-type {-->
<!--  -webkit-transform-origin: right;-->
<!--}-->

<!--.point-zoom-on-hover:hover {-->
<!--  transition-delay: unset;-->
<!--  transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */-->
<!--  z-index: 10000;-->
<!--}-->
<!--</style>-->
