<template>
    <div>
        <div class="position-relative">
            <button
                @click="onClicked"
                title="Open notifications"
                type="button"
                class="rounded-circle bg-dark d-flex justify-content-center align-items-center overflow-hidden"
                style="all: unset; height: 2.5rem; width:2.5rem; cursor: pointer;"
            >
                <img
                    class="rounded-circle"
                    style="height: 2.5rem; width:2.5rem;"
                    :src="`https://ui-avatars.com/api/?name=${username}&amp;color=FFFFFF&amp;background=111827`"
                />
            </button>
            <span
                v-if="hasNewNotification"
                class="d-block position-absolute top-0 ms-auto rounded-circle badge bg-primary p-0 fw-normal start-100"
                style="width: 0.75rem; height: 0.75rem; transform: translateX(-100%)"
            ></span>
        </div>
        <AppNotificationSidebar></AppNotificationSidebar>
    </div>

</template>

<script>

import AppNotificationSidebar from './AppNotificationSidebar.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'AppNotificationButton',
    components: { AppNotificationSidebar },
    methods: {
        onClicked () {
            this.$store.commit('notification/showAside')
        }
    },
    computed: {
        ...mapGetters({
            username: 'auth/getUsername',
            hasNewNotification: 'notification/hasNewNotification',
        })
    }
}
</script>

<style scoped>
button:hover {

}
</style>
