<template>
    <nav
        id="nav"
        class="bg-white"
    >
        <div
            id="primary-nav"
            class="container-lg flex-row align-items-center gap-4 d-flex flex-row"
        >
            <AppLogo></AppLogo>
            <div
                v-if="isAuthUser"
                id="nav-bar-items"
                class="d-lg-flex flex-row gap-3 d-none"
            >
                <router-link :to="{name: 'Welcome'}">Home</router-link>
                <router-link :to="{name: 'CourseList'}">Course</router-link>
                <router-link :to="{name: 'CategoryList'}">Category</router-link>
            </div>
            <div
                v-if="isAuthUser"
                class="ms-auto d-flex flex-row gap-3"
            >
                <AppNotificationButton></AppNotificationButton>
<!--                <div-->
<!--                    @click="logout"-->
<!--                    class="rounded-circle bg-dark d-flex justify-content-center align-items-center"-->
<!--                    title="Logout"-->
<!--                    style="height: 2.5rem; width:2.5rem; cursor: pointer;"-->
<!--                >-->
<!--                    <font-awesome-icon-->
<!--                        icon="arrow-right-from-bracket"-->
<!--                        inverse-->
<!--                    />-->
<!--                </div>-->

            </div>
            <div
                v-else
                id="nav-bar-buttons"
                class="gap-2 flex-row ms-auto d-flex"
            >
                <AppButton
                    @click="this.$router.push({ name: 'Login'})"
                    class="fw-medium btn-sm"
                    color="outline-primary"
                    label="Login"
                ></AppButton>
                <AppButton
                    @click="this.$router.push({ name: 'Register'})"
                    class="fw-medium"
                    :class="{'btn-sm': isMobileScreen}"
                    label="Sign up"
                ></AppButton>
            </div>
        </div>
    </nav>

</template>

<script>
import AppLogo from './AppLogo.vue'
import AppButton from './AppButton.vue'
import AppNotificationButton from './AppNotificationButton.vue'
import { useStore } from 'vuex'
import { useMediaQuery } from '@vueuse/core'

export default {
    name: 'AppNavBar',
    components: { AppNotificationButton, AppButton, AppLogo },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
            this.$router.go('/')
            // window.location.href = '/'
        }

    },
    setup() {
        const store = useStore()
        const isMobileScreen = useMediaQuery('(max-width: 576px)')
        let isAuthUser = store.state.auth.status.loggedIn

        return { isAuthUser,isMobileScreen }
    }
}
</script>

<style>
#hat-nav {
    height: var(--hat-nav-height);
    font-size: 0.75rem;
    line-height: 0.75rem;

}

#hat-nav a {
    color: inherit;
    text-decoration-line: none;
}


#hat-nav svg {
    height: 0.75rem;
    display: inline-block;
    margin-right: 0.25rem;
}

#primary-nav {
    height: var(--primary-nav-height);
}

#nav {

    background-color: rgb(249, 250, 254);
    border-bottom: 1px solid rgb(227, 232, 244);
    box-shadow: rgba(0, 12, 43, 0.05) 0 4px 8px;
    height: var(--top-nav-height);
    position: sticky;
    top: 0;
    z-index: 8000;

}

#primary-nav a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
}

#primary-nav a.router-link-exact-active {
    color: var(--bs-primary);
}
</style>
