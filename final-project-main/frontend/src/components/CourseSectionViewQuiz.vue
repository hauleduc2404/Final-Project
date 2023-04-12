<template>
    <div class="card mt-3">
        <div class="card-header fw-normal">{{ question.prompt }}</div>
        <div
            class="card-body"
            v-if="isAnswerCorrect !== null"
        >
            <div
                v-if="isAnswerCorrect === true"
                class="text-success"
            >
                <span class="fw-medium">You are correct!</span>
                <div>{{ question.keysExplanation }}</div>
            </div>
            <div
                v-else-if="isAnswerCorrect === false"
                class="text-danger"
            >
                <span class="fw-medium">Sorry. It's not correct.</span>
                <div>{{ question.keysExplanation }}</div>
            </div>

        </div>
        <template v-if="question.type== 0">
            <div class="list-group list-group-flush">
                <div
                    v-for="(option, index)  in question.options"
                    :key="index"
                    class="list-group-item list-group-item-action"
                >
                    <div class="form-check">
                        <input
                            :value="index + 1"
                            v-model="answer"
                            class="form-check-input"
                            type="radio"
                            name="quiz-option"
                            :id="`option-${index}`"
                        >
                        <label
                            class="form-check-label fw-normal"
                            :for="`option-${index}`"
                            :class="{
                                'text-danger': isAnswerCorrect !== null && question.keys.indexOf((index + 1).toString()) < 0  && formattedAnswer.indexOf((index + 1)) >= 0,
                                'text-success': isAnswerCorrect !== null && question.keys.indexOf((index + 1).toString()) >= 0,
                            }"
                        >
                            {{ option}}
                        </label>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="list-group list-group-flush">
                <div
                    v-for="(option, index)  in question.options"
                    :key="index"
                    class="list-group-item list-group-item-action "
                >
                    <div class="form-check">
                        <input
                            :value="index + 1"
                            v-model="answer"
                            class="form-check-input"
                            type="checkbox"
                            name="quiz-option"
                            :id="`option-${index}`"
                        >
                        <label
                            class="form-check-label fw-normal"
                            :for="`option-${index}`"
                            :class="{
                                'text-danger': isAnswerCorrect !== null && question.keys.indexOf((index + 1).toString()) < 0  && formattedAnswer.indexOf((index + 1)) >= 0,
                                'text-success': isAnswerCorrect !== null && question.keys.indexOf((index + 1).toString()) >= 0,
                            }"
                        >
                            {{ option}}
                        </label>
                    </div>
                </div>
            </div>
        </template>
        <!--   Start of Show result   -->
        <!--   End of Show result   -->
        <div class="card-footer fw-normal d-flex align-items-center flex-row justify-content-between">
            <span class="d-block">You selected {{ answer }}</span>
            <AppButton
                @click="onAnswer"
                class="d-block"
                label="Submit"
            ></AppButton>
        </div>
    </div>
</template>

<script>
import AppButton from './AppButton.vue'
import { axiosInstance } from '@/common/api'

export default {
    name: 'CourseSectionViewQuiz',
    components: { AppButton },
    props: {
        question: {
            type: Object,
        }
    },
    data () {
        return {
            isAnswerCorrect: null,
            answer: [],
        }
    },
    computed: {
        formattedAnswer () {
            if (this.answer instanceof Array) return this.answer
            else {
                return [this.answer]
            }
        }
    },
    methods: {
        async onAnswer () {
            await axiosInstance.post(`/questions/${this.question.id}/answer`, {
                userId: this.$store.state['auth'].userInfo.id,
                answer: this.formattedAnswer
            }).then(res => {
                let data = res.data.data
                this.isAnswerCorrect = data.isCorrect
            })
        }
    },
    mounted () {
        console.log('question=', this.question)
    }
}
</script>

<style scoped>

</style>
