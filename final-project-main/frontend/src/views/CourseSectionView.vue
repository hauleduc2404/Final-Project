<template>
    <div class="vh-100 d-flex flex-column">
        <AppNavBar/>
        <AppLayoutSWithTwoSidebar
            class="flex-grow-1"
            style="height: 0"
        >
            <template v-slot:first-sidebar>
                <CourseSectionViewCourseInfo :course="{...course}" :user-course-sections="userCourseSections"/>
            </template>
            <template v-slot:default>
                <!--    Start Of Section Content    -->
                <div
                    style="max-width: 60rem !important;"
                    class="mx-auto"
                >
                    <div v-if="!this.currentSection">
                        <span class="spinner-border"></span>
                    </div>
                    <div
                        v-else
                    >
                        <div class="my-3 my-lg-5 px-3 px-lg-5">
                            <div class="mb-3">
                                <span class="font-monospace h4 fw-bold text-primary">{{
                                        currentSection.type === 1 ? 'Quiz' : 'Lecture'
                                                                                     }}</span>
                            </div>
                            <h1 class="d-block fw-bold h2 mb-4">{{ currentSection.title }}</h1>
                            <div v-if="!this.sectionContent || isLoadingContent">
                                <span class="spinner-border"></span>
                            </div>
                            <template v-else>
                                <CourseSectionViewLecture
                                    :content="displayContent"
                                    v-if=" currentSection.type == 0"
                                />
                                <CourseSectionViewQuiz v-else :question="question"/>
                            </template>

                            <div class="d-flex flex-row g-2 justify-content-between mt-5 ">
                                <router-link v-if="previousSection" :to="{name: 'CourseSectionView', params: {courseSectionId: this.previousSection.id, courseId: this.course.id}}">
                                    <AppButton
                                        color="outline-secondary"
                                        label="Previous section"
                                    />
                                </router-link>
                                <router-link v-if="nextSection" :to="{name: 'CourseSectionView', params: {courseSectionId: this.nextSection.id, courseId: this.course.id}}">
                                    <AppButton
                                        color="outline-secondary"
                                        label="Next section"
                                    />
                                </router-link>
                            </div>
                            <hr>

                            <CourseSectionViewThreads/>
                        </div>
                    </div>
                    <!--    End Of Section Content    -->
                </div>

            </template>
            <template v-slot:second-sidebar>
                <CourseSectionViewTableOfContent :headings="tableOfContent"/>
            </template>
        </AppLayoutSWithTwoSidebar>
        <div
            style="height: var(--primary-nav-height); bottom: 0; z-index: 10"
            class="flex-shrink-0 d-block d-sm-none bg-white border-bottom d-flex align-items-center justify-content-between flex-row gap-3 position-sticky container-fluid text-muted"
        >
            <button
                @click="onShowCourseContent"
                class=" btn small text-muted p-0"
            >
                <font-awesome-icon
                    class="me-2"
                    size="sm"
                    :icon="{prefix: 'fa', iconName: 'bars-staggered' }"
                ></font-awesome-icon>
            </button>
            <button class="btn text-muted p-0">
                <small>Back to top</small>
            </button>
        </div>
        <!--  Start Of Overlay  -->
        <AppLayoutSidebarOverlay
            max-width="100vw"
            :is-shown="showCourseContent"
            @close="showCourseContent = false"
        >
            <CourseSectionViewCourseInfo @close="showCourseContent = false"/>
        </AppLayoutSidebarOverlay>
        <!--  End Of Overlay  -->
    </div>
</template>

<script>
import AppLayoutSWithTwoSidebar from '../components/AppLayoutSWithTwoSidebar.vue'
import CourseSectionViewCourseInfo from '../components/CourseSectionViewCourseInfo.vue'
import CourseSectionViewTableOfContent from '../components/CourseSectionViewTableOfContent.vue'
import AppLayoutSidebarOverlay from '../components/AppLayoutSidebarOverlay.vue'
import CourseSectionViewQuiz from '../components/CourseSectionViewQuiz.vue'
import AppNavBar from '../components/AppNavBar.vue'
import CourseService from '@/services/course.service'
import CourseSectionService from '@/services/courseSection.service'
import CourseSectionViewLecture from '@/components/CourseSectionViewLecture.vue'
import AppButton from '@/components/AppButton.vue'
import CourseSectionViewThreads from '@/components/CourseSectionViewThreads.vue'
import { axiosInstance } from '@/common/api'

export default {
    name: 'CourseSectionView',
    components: {
        CourseSectionViewThreads,
        AppButton,
        CourseSectionViewLecture,
        AppNavBar,
        CourseSectionViewQuiz,
        AppLayoutSidebarOverlay,
        CourseSectionViewTableOfContent,
        CourseSectionViewCourseInfo,
        AppLayoutSWithTwoSidebar
    },
    data () {
        return {
            displayContent: '',
            question: '',
            isLoadingContent: false,
            course: {},
            courseSections: [],
            userCourseSections: [],
            sectionContent: null,
            showCourseContent: false,
        }
    },
    methods: {
        onShowCourseContent () {
            this.showCourseContent = true
        },
        getUserCourseSections() {
              return axiosInstance.get(`users/${this.$store.state['auth'].userInfo.id}/courses/${this.$route.params.courseId}/course-sections`).then(
                  res => this.userCourseSections = res.data.data
              )
        },
    },
    watch: {
        async $route () {
            this.isLoadingContent = true
            await CourseSectionService.getSection(this.$route.params.courseSectionId).then(res => {
                this.sectionContent = res.data.data
                if (this.sectionContent.type === 0) {
                    this.displayContent = this.sectionContent.lecture.content
                    const regex = /<(h[2-4])>((?:(?!<h\d+\b).)+?)<\/\1>/g
                    let match = [...this.sectionContent.lecture.content.matchAll(regex)]
                    match.forEach(item => {
                        let heading = {
                            element: item[0],
                            type: item[1],
                            title: item[2],
                            slug: item[2].toLowerCase()
                                .trim()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/[\s_-]+/g, '-')
                                .replace(/^-+|-+$/g, ''),
                        }

                        this.displayContent = this.displayContent.replace(heading.element, `<${heading.type} id="${heading.slug}">${heading.title}</${heading.type}>`)

                        return heading
                    })
                } else {
                    this.question = this.sectionContent.question
                }
            }).finally(() => {
                this.isLoadingContent = false
            })
        }
    },
    computed: {
        tableOfContent () {
            if (!this.sectionContent) return []
            if (this.sectionContent.type == 0) {

                const regex = /<(h[2-4])>((?:(?!<h\d+\b).)+?)<\/\1>/g
                return [...this.sectionContent.lecture.content.matchAll(regex)].map(item => {
                    let heading = {
                        element: item[0],
                        type: item[1],
                        title: item[2],
                        slug: item[2].toLowerCase()
                            .trim()
                            .replace(/[^\w\s-]/g, '')
                            .replace(/[\s_-]+/g, '-')
                            .replace(/^-+|-+$/g, ''),
                    }

                    //this.sectionContent.lecture.content.replace(heading.element, `<${heading.type} href="#${heading.slug}">${heading.title}</${heading.type}>`)

                    return heading
                })
            } else {
                return []
            }
        },
        currentSection () {
            let currentSectionId = this.$route.params.courseSectionId
            return this.courseSections.find(section => section.id == currentSectionId)
        },
        nextSection () {
            let currentSectionId = this.$route.params.courseSectionId
            let nextSectionIndex = this.courseSections.findIndex(section => section.id == currentSectionId) + 1
            return nextSectionIndex >= this.courseSections.length ? null : this.courseSections[nextSectionIndex]
        },
        previousSection () {
            let currentSectionId = this.$route.params.courseSectionId
            let previousSectionIndex = this.courseSections.findIndex(section => section.id == currentSectionId) - 1
            return previousSectionIndex < 0 ? null : this.courseSections[previousSectionIndex]
        },
    },
    created () {
    },
    async beforeMount () {
        let courseId = this.$route.params.courseId
        await Promise.all([
            CourseService.getCourse(courseId).then(res => {
                console.log('res=',res.data)
                this.course = res.data.data
            }),
            CourseService.getAllSectionsOfCourse(courseId).then(res => this.courseSections = res.data.data),
            this.getUserCourseSections(),
        ])
        await CourseSectionService.getSection(this.$route.params.courseSectionId).then(res => {
            this.sectionContent = res.data.data
            if (this.sectionContent.type === 0) {
                this.displayContent = this.sectionContent.lecture.content
                const regex = /<(h[2-4])>((?:(?!<h\d+\b).)+?)<\/\1>/g
                let match = [...this.sectionContent.lecture.content.matchAll(regex)]
                match.forEach(item => {
                    let heading = {
                        element: item[0],
                        type: item[1],
                        title: item[2],
                        slug: item[2].toLowerCase()
                            .trim()
                            .replace(/[^\w\s-]/g, '')
                            .replace(/[\s_-]+/g, '-')
                            .replace(/^-+|-+$/g, ''),
                    }

                    this.displayContent = this.displayContent.replace(heading.element, `<${heading.type} class="scroll-heading" id="${heading.slug}">${heading.title}</${heading.type}>`)

                    return heading
                })
            } else {
                this.question = this.sectionContent.question
            }
        })
    }
}
</script>

<style scoped>
#menu-bar {
    height: var(--hat-nav-height);
}
</style>
