<template>
    <AppLayoutWrapper>
        <AppLayoutContainer>
            <div class="container-fluid my-5">
                <div
                    class="card mx-auto shadow-sm p-4"
                    style="max-width: 32rem;"
                >
                    <Form>
                        <div class="d-grid gap-3">
                            <h5 class="card-title fw-bolder h2">Profile</h5>
                            <div class="col">
                                <label
                                    class="form-label font-monospace"
                                    for="name"
                                >Your name</label>
                                <input
                                    disabled
                                    class="form-control"
                                    v-model="user.name"
                                >
                            </div>
                            <div class="col">
                                <label
                                    class="form-label font-monospace"
                                    for="email"
                                >Email</label>

                                <input
                                    disabled
                                    class="form-control"
                                    v-model="user.email"
                                >
                            </div>
                            <div class="col">
                                <label
                                    class="form-label font-monospace"
                                    for="phone"
                                >Phone</label>

                                <input
                                    disabled
                                    class="form-control"
                                    v-model="user.phone"
                                />

                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </AppLayoutContainer>
    </AppLayoutWrapper>

</template>

<script>
import AppLayoutWrapper from '@/components/AppLayoutWrapper.vue'
import AppLayoutContainer from '@/components/AppLayoutContainer.vue'

export default {
    name: 'Profile',
    components: { AppLayoutContainer, AppLayoutWrapper },
    data () {
        return {
            user: {}
        }
    },
    mounted () {
        this.user = this.$store.state['auth'].userInfo
    }
}
</script>

<style scoped>

</style>
