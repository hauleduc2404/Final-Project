<template>
    <section>
        <div class="card">
            <img
                style="aspect-ratio: 1/1; object-fit: cover; object-position: center"
                alt="course cover"
                class="card-img-top"
                src="https://www.izone.edu.vn/wp-content/uploads/2022/12/Thumbnail-Templates-7.png"
            >
            <div class="card-body d-grid">
                <router-link
                    class="text-decoration-none d-grid"
                    :to="{name: 'CourseSectionView', params: { courseSectionId: 1}}"
                >
                    <button
                        @click.prevent="onRegisterUserCourse"
                        class="btn btn-outline-primary d-block"
                    >Start learning now
                    </button>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import courseService from '../services/course.service'

export default {
    name: 'CourseViewSidebar',
    methods: {
        async onRegisterUserCourse () {
            if (this.$store.state['auth'].status.loggedIn) {
                await courseService.registerUserToCourse(this.$store.state['auth'].userInfo.id, this.$route.params.courseId).then((response) => {
                    const course = response.data.data.course
                    this.$router.push({ name: 'CourseSectionView', params: { courseSectionId: course.courseSections[0].id, courseId: course.id } })
                })
            } else {
                this.$router.push({ name: 'Register' })
            }

        }
    }
}
</script>

<style scoped>

</style>
