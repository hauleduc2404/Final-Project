<template>
    <AppLayoutWrapper>
        <AppLayoutContainer>
            <div class="container-fluid my-5">
                <div
                    class="card mx-auto shadow-sm p-4"
                    style="max-width: 32rem;"
                >
                    <Form
                        v-slot="{ isSubmitting }"
                        @submit="handleRegister"
                        :validation-schema="schema"
                        class="needs-validation"
                    >
                        <div class="d-grid gap-3">
                            <h5 class="card-title fw-bolder h2">Register a new account</h5>
                            <div
                                v-if="message"
                                class="alert alert-danger"
                                role="alert"
                            >
                                <h4 class="alert-heading h5">An error happened!</h4>
                                <p class="m-0 fs-6 fw-light">{{ message }}</p>
                            </div>
                            <div class="col">
                                <label
                                    class="form-label font-monospace"
                                    for="name"
                                >Your name</label>
                                <Field
                                    v-slot="{ meta, field }"
                                    name="name"
                                    type="text"
                                >
                                    <input
                                        placeholder="Enter your name"
                                        title="Enter your name"
                                        class="form-control"
                                        :class="{'is-invalid': !meta.valid && meta.touched}"
                                        v-bind="field"
                                    >
                                </Field>
                                <ErrorMessage
                                    name="username"
                                    class="invalid-feedback"
                                />
                            </div>
                            <div class="col">
                                <label
                                    class="form-label font-monospace"
                                    for="email"
                                >Email</label>
                                <Field
                                    v-slot="{ meta, field }"
                                    name="email"
                                    type="text"
                                >
                                    <input
                                        placeholder="Enter your email address"
                                        title="Enter your username"
                                        class="form-control"
                                        :class="{'is-invalid': !meta.valid && meta.touched}"
                                        v-bind="field"
                                    >
                                </Field>
                                <ErrorMessage
                                    name="email"
                                    class="invalid-feedback"
                                />
                            </div>
                            <div class="col">
                                <label class="form-label font-monospace" for="phone">Phone</label>
                                <Field v-slot="{ meta, field }" name="phone" type="text">
                                    <input
                                        placeholder="Enter your phone number"
                                        title="Enter your phone number"
                                        class="form-control"
                                        :class="{ 'is-invalid': !meta.valid && meta.touched }"
                                        v-bind="field"
                                    />
                                </Field>
                                <ErrorMessage name="phone" class="invalid-feedback" />
                            </div>
                            <div class="col">
                                <label
                                    class="form-label font-monospace"
                                    for="password"
                                >Password</label>
                                <Field
                                    v-slot="{ meta, field }"
                                    name="password"
                                    type="password"
                                    class="form-control"
                                >
                                    <input
                                        placeholder="Enter your password"
                                        title="Enter your password"
                                        class="form-control fs-6"
                                        :class="{'is-invalid': !meta.valid && meta.touched}"
                                        v-bind="field"
                                        type="password"
                                    >
                                </Field>
                                <ErrorMessage
                                    name="password"
                                    class="invalid-feedback"
                                />
                            </div>
                            <div class="col">
                                <label class="form-label font-monospace" for="password2"
                                >Confirm Password</label
                                >
                                <Field
                                    v-slot="{ meta, field }"
                                    name="password2"
                                    type="password2"
                                    class="form-control"
                                >
                                    <input
                                        placeholder="Confirm your password"
                                        title="Confirm your password"
                                        class="form-control fs-6"
                                        :class="{ 'is-invalid': !meta.valid && meta.touched }"
                                        v-bind="field"
                                        type="password"
                                    />
                                </Field>
                                <ErrorMessage name="password2" class="invalid-feedback" />
                            </div>
                            <AppButton
                                class="mt-3"
                                type="submit"
                                label="Sign up"
                                :disabled="isSubmitting"
                                :is-loading="isSubmitting"
                            />
                            <span>
            Already have an account? <AppActionLink
                                label="Log in"
                                :href="this.$router.resolve({name: 'Login'}).href"
                            ></AppActionLink>
          </span>
                        </div>
                    </Form>

                </div>
            </div>
        </AppLayoutContainer>
    </AppLayoutWrapper>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AppActionLink from '../components/AppActionLink.vue'
import AppButton from '../components/AppButton.vue'
import AppLayoutContainer from '../components/AppLayoutContainer.vue'
import AppLayoutWrapper from '../components/AppLayoutWrapper.vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'Register',
    components: {
        AppLayoutWrapper,
        AppLayoutContainer,
        AppButton,
        AppActionLink,
        Form,
        Field,
        ErrorMessage,
    },
    data () {
        const schema = yup.object().shape({
            name: yup
                .string()
                .default('Vu-Quang Le')
                .required()
                .min(3)
                .max(20).label('Name'),
            phone: yup
                .string()
                .default('0987654321')
                .required()
                .matches(/((0)+(\d{9})\b)/g, 'Invalid phone number')
                .label('Phone'),
            email: yup
                .string()
                .required()
                .default('admin@izone.edu.vn')
                .email()
                .max(50).label('Email'),
            password: yup
                .string()
                .required()
                .default('admin123')
                .min(8)
                .max(40).label('Password'),
            password2: yup
                .string()
                .default('admin123')
                .required()
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
        })

        return {
            successful: false,
            loading: false,
            message: '',
            schema,
        }
    },
    computed: {
        loggedIn () {
            return this.$store.state.auth.status.loggedIn
        },
    },
    mounted () {
        if (this.loggedIn) {
            this.$router.push('/profile')
        }
    },
    methods: {
        handleRegister (user) {
            console.log('register user=', user)
            this.message = ''

            this.$store.dispatch('auth/register', user).then(
                (data) => {
                    this.message = data.message
                    ElMessage({
                        message: 'Đăng ký thành công!',
                        type: 'success',
                    })

                    this.$store
                        .dispatch('auth/login', user)
                        .then(
                            () => {
                                this.$router.push('/profile')
                            },
                            (error) => {
                                this.message =
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString()
                            }
                        )
                        .finally(() => {
                            this.loading = false
                        })
                },
                (error) => {
                    if (error.response?.status == 400) {
                        this.message = error.response?.data
                            ?.map((er) => er.message)
                            .join(', ')
                    } else {
                        this.message =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    }
                }
            )
        },
    },
}
</script>

<style scoped>

</style>
