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
                v-if="isHydrated"
                :limit="this.query.limit"
                :offset="this.query.offset"
                :total="this.total"
            ></AppPagination>
        </template>
        <template v-slot:sidebar>
        </template>
    </AppLayoutWithSidebar>
</template>

<script>
import AppPagination from '@/components/AppPagination.vue'
import AppLayoutWithSidebar from '@/components/AppLayoutWithSidebar.vue'
import CourseListCard from '@/components/CourseListCard.vue'
import CourseService from '@/services/course.service'

export default {
    name: 'UserCourseList',
    components: { AppPagination, AppLayoutWithSidebar, CourseListCard },
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
            return CourseService.getAllCourses(this.query).then(res => {
                this.courses = res.data
                this.courses.forEach(course => {
                    course.categories = course.courseCategories.map(courseCategory => courseCategory.category)
                })
                this.total = res.total
            })
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
