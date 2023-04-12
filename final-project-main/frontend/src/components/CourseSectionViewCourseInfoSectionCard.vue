<template>
    <div
        class="d-flex flex-row list-group-item list-group-item-action border-bottom-0 rounded-0"
        :class="{'bg-light' : isActive}"

    >
        <div>
            <input
                class="form-check-input me-3 flex-grow-1"
                :disabled="sectionInfo.type == 1"
                type="checkbox"
                v-model="isCompleted"
                @change="onCompleteCheckChange"
            >
        </div>
        <router-link
            class="text-reset text-decoration-none"
            :to="{name: 'CourseSectionView', params: {courseId: $route.params.courseId,  courseSectionId: sectionInfo.id}}"
        >
            <div>
                <p
                    class="small mb-0 fw-medium"
                    :class="{'text-primary' : isActive}"
                >{{ sectionInfo.title }}</p>
                <div class=" d-flex flex-row gap-3 ">
                    <small> {{ `Section ${sectionInfo.sort}` }}</small>
                    <span class="d-inline-flex flex-row align-items-center">
          <template v-if="sectionInfo.type == 0">
             <font-awesome-icon
                 size="sm"
                 :icon="{iconName:'book', prefix:'fa'}"
             />
            <small class="lh-1 ms-1">Lecture</small>
          </template>
          <template v-else>
            <font-awesome-icon
                size="sm"
                :icon="{iconName:'question-circle', prefix:'far'}"
            />
            <small class="lh-1 ms-1">Quiz</small>
          </template>
        </span>
                </div>
            </div>
        </router-link>

    </div>
</template>

<script>
import { axiosInstance } from '@/common/api'

export default {
    name: 'CourseSectionViewCourseInfoSectionCard',
    props: {
        isActive: {
            type: Boolean,
            default: true,
        },
        sectionInfo: {
            type: Object,
            default: () => ({
                sort: '1',
                type: 'quiz',
                title: 'The Beginning of The Beginning of The Beginning of The End',
            }),
        },
        userSectionInfo: {
            type: Object
        }
    },
    data () {
        return {
            isCompleted: false,
        }
    },
    computed: {
        currentSectionId() {
            return this.$route.params.courseSectionId;
        }
    },
    methods: {
        async onCompleteCheckChange () {
            await axiosInstance.post(`users/${this.$store.state['auth'].userInfo.id}/courses/${this.sectionInfo.courseId}/course-sections`, {
                userCourseSectionId: this.userSectionInfo.id,
                isCompleted: this.isCompleted
            }).catch(() => {
                this.isCompleted = this.userSectionInfo.isCompleted
            })
        }
    },
    mounted () {
        this.isCompleted = this.userSectionInfo.isCompleted
    }
}
</script>

<style scoped>

</style>
