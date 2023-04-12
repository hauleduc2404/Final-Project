<template>
    <AppLayoutPopupOverlay
        @close="$emit('close')"
        :is-shown="isShown"
    >
        <template v-slot:heading>
            <span class="fs-4 fw-bold">Review</span>
        </template>
        <template v-slot:default>
            <form class="card border-0 mb-3">
                <div class="my-2 my-lg-4 d-flex flex-row justify-content-center align-items-center text-primary ">
                    <font-awesome-icon
                        class="fs-1"
                        v-for="rate in [1,2,3,4,5]"
                        :key="`rate-${rate}`"
                        @click="review.rating = rate"
                        @mouseenter="hoveredRating = rate"
                        @mouseleave="hoveredRating = 0"
                        :icon="{prefix: rate <= highlightedRating ? 'fa' : 'far', iconName: 'star'}"
                    />
                </div>
                <label
                    for="course-section-comment"
                    class="form-label fw-bold"
                >Title</label>
                <input
                    class="form-control mb-3"
                    type="text"
                    maxlength="255"
                    placeholder="Summarize everything..."
                    v-model="review.title"
                >
                <label
                    for="course-section-comment"
                    class="form-label fw-bold"
                >Review</label>
                <textarea
                    placeholder="What do you think about this course..."
                    style="resize: none; overflow: scroll;"
                    class="form-control"
                    id="course-section-comment"
                    rows="3"
                    maxlength="255"
                    v-model="review.review"
                ></textarea>
            </form>
        </template>
        <template v-slot:footer>
            <div class="d-flex flex-row gap-2 justify-content-end">
                <AppButton
                    label="Send"
                    :is-loading="isSending"
                    @click="onSubmit"
                    class="btn btn-primary"
                    type="submit"
                >
                </AppButton>
                <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click="$emit('close')"
                >Cancel
                </button>
            </div>
        </template>
    </AppLayoutPopupOverlay>
</template>

<script>
import AppLayoutPopupOverlay from '@/components/AppLayoutPopupOverlay.vue'
import CourseService from '@/services/course.service'
import AppButton from '@/components/AppButton.vue'

export default {
    name: 'CourseViewAddReview',
    components: { AppLayoutPopupOverlay, AppButton },
    props: {
        courseId: {
            type: Number,
        },
        isShown: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            isSending: false,
            hoveredRating: 0,
            review: {
                courseId: '',
                userId: Number.parseInt(this.$store.state['auth'].userInfo.id),
                title: '',
                review: '',
                rating: 0,
            }
        }
    },
    computed: {
        highlightedRating () {
            if (this.hoveredRating == 0) return this.review.rating
            return this.hoveredRating
        }
    },
    methods: {
        async onSubmit () {
            this.review.courseId = this.courseId
            this.isSending = true
            await CourseService.createReview(this.review).then((res) => {
                this.$emit('reviewSent', res.data.data)
            }).finally(() => {
                this.isSending = false
                this.$emit('close')
            })
        },
    }
}
</script>

<style scoped>

</style>
