<template>
    <div
        id="course-view-course-info"
        class="h-100 border-end flex-column d-flex me-auto"
        style="max-width: 85vw;"
    >
        <div class="list-group-item sticky-top p-3 pb-0 ">
            <div class="d-flex flex-row">
                <router-link
                    v-if="course.id"
                    :to="{name: 'CourseView', params: {courseId: course.id}}"
                    class="text-reset d-flex align-items-center gap-2 text-decoration-none text-capitalize highlight-on-hover text-muted "
                >
                    <font-awesome-icon
                        size="sm"
                        :icon="{iconName:'chevron-left', prefix:'fa'}"
                    />
                    <span style="line-height: 1em;" class="small">course overview</span>
                </router-link>
                <button
                    @click="$emit('close')"
                    class="highlight-on-hover ms-auto btn btn-close d-block d-sm-none btn-sm"
                >
                </button>
            </div>
            <div class="py-4 mb-0">
                <h2 class="fs-6 fw-medium lh-sm">{{ course.title }}</h2>
                <span
                    class="d-flex flex-row align-items-center text-muted mt-3"
                >
          <font-awesome-icon
              size="sm"
              :icon="{iconName:'layer-group', prefix:'fa'}"
          />
          <small class="lh-1 ms-1">{{ userCourseSections.length }} Sections</small>
        </span>
            </div>

            <!--       <div><small class="d-block font-monospace text-primary fs-6 mb-2">IELTS Listening 3.0 - 4.0</small></div>-->
        </div>
        <div class="overflow-scroll list-group list-group-flush mb-0 list-unstyled h-auto">

            <template
                v-for="(section,index) in userCourseSections"
                :key="section.id"
            >
                    <CourseSectionViewCourseInfoSectionCard
                        :user-section-info="section"
                        :section-info="{...section.courseSection, sort: index + 1}"
                        :is-active="section.id === $route.params.courseSectionId"
                    />
            </template>
        </div>
    </div>
</template>

<script>
import CourseSectionViewCourseInfoSectionCard from './CourseSectionViewCourseInfoSectionCard.vue'

export default {
    name: 'CourseSectionViewCourseInfo',
    components: { CourseSectionViewCourseInfoSectionCard },
    props: {
        course: {
            type: Object,
        },
        userCourseSections: {
            type: Array,
        }
    },
    mounted () {
        console.log('course=', this.course);
    }
}
</script>

<style scoped>
.list-group li:hover {
    cursor: pointer;
}

@media screen and (max-width: 576px) {
    #course-view-course-info {
        border: 0 !important;
    }
}
</style>
