<template>
  <AppLayoutWrapper>
    <AppLayoutContainer>
      <div class="container-fluid my-5">
        <div class="card mx-auto shadow-sm p-4" style="max-width: 32rem;">
          <Form
            v-slot="{ isSubmitting }"
            @submit="handleLogin"
            :validation-schema="schema"
            class="needs-validation"
          >
            <div class="d-grid gap-3">
              <h5 class="card-title fw-bolder h2">Log in to your account</h5>
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
                    type="password"
                    class="form-control fs-6"
                    :class="{'is-invalid': !meta.valid && meta.touched}"
                    v-bind="field"
                  >
                </Field>
                <ErrorMessage
                  name="password"
                  class="invalid-feedback"
                />
              </div>
              <AppButton
                class="mt-3"
                type="submit"
                label="Login"
                :disabled="isSubmitting"
                :is-loading="isSubmitting"
              />
              <span>
            Don't have an account? <AppActionLink
                label="Sign up now"
                :href="this.$router.resolve({name: 'Register'}).href"
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
import AppButton from '../components/AppButton.vue'
import AppActionLink from '../components/AppActionLink.vue'
import AppLayoutContainer from '../components/AppLayoutContainer.vue'
import AppLayoutWrapper from '../components/AppLayoutWrapper.vue'

export default {
  name: 'Login',
  components: {
    AppLayoutWrapper,
    AppLayoutContainer,
    AppActionLink,
    AppButton,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required().email().label('Email'),
      password: yup.string().required().min(8).label('Password'),
    })

    return {
      loading: false,
      message: '',
      schema,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile')
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true

      this.$store.dispatch('auth/login', user).then(
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
      ).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style scoped>

</style>
