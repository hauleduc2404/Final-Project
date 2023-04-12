<template>
    <AppLayoutWithSidebar>
        <section class="d-grid gap-5">
            <div>
                <span></span>
                <h1 class="fw-bold mb-0 h2">{{ course.title }}</h1>
            </div>
            <article>
                <h2 class="h3 mb-4 fw-bold text-primary font-monospace">Description</h2>
                <p>{{ course.description }}</p>
            </article>
            <article>
                <h2 class="h3 fw-bold text-primary font-monospace mb-4">Course Content</h2>
                <div
                    class="accordion"
                    id="course-sections-accordion"
                >
                    <template
                        v-for="(section, index) in courseSections"
                        :key="index"
                    >
                        <div class="accordion-item">
                            <h2
                                class="accordion-header"
                                :id="`section-title-${index}`"
                            >
                                <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    :data-bs-target="`#collapse-${index}`"
                                    :aria-controls="`collapse-${index}`"
                                    :aria-expanded="false"
                                >
                                    <div class="d-flex flex-column flex-lg-row gap-lg-3 gap-2">
                                        <strong
                                            class="fw-medium"
                                        >{{ `Section ${index + 1}` }}</strong>
                                        <p class="mb-0 d-block">{{ section.title }}</p>
                                    </div>

                                </button>
                            </h2>
                            <div
                                :id="`collapse-${index}`"
                                class="accordion-collapse collapse"
                                :aria-labelledby="`section-title-${index}`"
                                data-bs-parent="#course-sections-accordion"
                            >
                                <div class="accordion-body">
                                    {{ section.summarization }}
                                </div>
                            </div>
                        </div>
                    </template>

                </div>
            </article>
            <div>
                <h2 class="h3 fw-bold text-primary font-monospace mb-4">Users Reviews</h2>
                <button
                    v-if="!userCourseReview.id"
                    @click="onShowAddReview"
                    class="btn btn-outline-secondary w-100 mb-4 btn-lg"
                    type="button"
                >
                    <font-awesome-icon
                        size="sm"
                        :icon="{prefix: 'far', iconName: 'pen-to-square'}"
                    />
                    <span class="ms-2 small">Let others hear what you think!</span>
                </button>
                <CourseReviewCard
                    v-else
                    class="mb-5 border-primary"
                    :review="userCourseReview"
                />
                <div
                    class="gap-2"
                    id="course-review-list"
                >
                    <CourseReviewCard
                        v-for="(review, index) in courseReviews"
                        :key="`review-${index}`"
                        :review="review"
                    />
                </div>
            </div>
        </section>
        <template v-slot:sidebar>
            <CourseViewSidebar/>
        </template>
    </AppLayoutWithSidebar>
    <CourseViewAddReview
        :is-shown="showAddReview"
        @close="showAddReview = false"
        @review-sent="onReviewSent($event, review)"
        :course-id="Number.parseInt(this.courseId)"
    />
</template>

<script>
import CourseReviewCard from '../components/CourseReviewCard.vue'
import AppLayoutWithSidebar from '../components/AppLayoutWithSidebar.vue'
import CourseService from '../services/course.service'
import CourseViewSidebar from '../components/CourseViewSidebar.vue'
import CourseViewAddReview from '@/components/CourseViewAddReview.vue'
import UserService from '@/services/user.service'

export default {
    name: 'CourseView',
    components: { CourseViewAddReview, CourseViewSidebar, AppLayoutWithSidebar, CourseReviewCard },
    data () {
        return {
            userCourseReview: {},
            courseId: '',
            showAddReview: false,
            course: {},
            courseSections: []
        }
    },
    methods: {
        onReviewSent(review) {
           this.userCourseReview = review
        },
        onShowAddReview () {
            this.showAddReview = true
        },
    },
    computed: {
        courseReviews () {
            if (this.course.courseReviews)
                return this.course.courseReviews.filter(review => review.id != this.userCourseReview.id)
            else return []
        }
    },
    async beforeMount() {
        this.courseId = this.$route.params.courseId
        await CourseService.getCourse(this.courseId).then(res => this.course = res.data.data)
        CourseService.getAllSectionsOfCourse(this.courseId).then(res => this.courseSections = res.data.data)
        UserService.getUserCourseReview(this.$store.state['auth'].userInfo.id, this.courseId)
            .then(res => {
                console.log('review=', res.data.data)
                this.userCourseReview = res.data.data
                this.userCourseReview.username = this.userCourseReview.user.name
            })
            .catch(() => this.userCourseReview = {})
    },
}
</script>

<style scoped>
#course-review-list {
    display: grid;
    grid-template-columns: auto;
}
</style>
