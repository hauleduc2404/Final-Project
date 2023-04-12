<template>
    <Transition name="fade">
        <div
            v-if="isShown"
            id="notification-layer"
            class="position-fixed start-0 top-0 vh-100 w-100 d-flex justify-content-end"
            style="z-index: 9000"
        >
            <div
                id="sidebar"
                class="d-flex flex-row"
                ref="notificationSidebarList"
            >
                <div
                    id="menu-list"
                    class="bg-white h-100"
                    style="z-index: 9001"
                >
                    <div
                        class="list-group list-group-flush h-100"
                    >
                        <div class="border-bottom ps-4 pe-3 py-3 d-flex flex-row gap-3 justify-content-between ">
                            <div
                                class="d-grid gap-1 flex-grow-1"
                            >
                                <span class="d-block fs-4 fw-medium">Menu</span>
                            </div>
                            <button
                                class="btn btn-close btn-sm d-block d-sm-none"
                                @click="onCloseSidebar"
                            ></button>
                        </div>
                        <div class="overflow-scroll border-top-0">
                            <div
                                @click="onSelectSidebar(item.routeName)"
                                class="d-block px-4 pt-3 pb-1 highlight-on-hover "
                                v-for="(item, index) in menuItems"
                                :key="index"
                            >
                                <span class="text-capitalize fs-5 fw-medium font-monospace">{{ item.title }}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div
                    id="notification-list"
                    class="bg-white h-100 d-none d-sm-block"
                    style="z-index: 9001"
                >
                    <div
                        class="list-group list-group-flush h-100"
                    >
                        <div class="ps-4 pe-3 py-3 d-flex flex-row gap-3 justify-content-between border-start">
                            <div
                                v-if="notifications.length > 0"
                                class="d-grid gap-1 flex-grow-1"
                            >
                                <span class="d-block fs-4 fw-medium">Notifications</span>
                            </div>
                            <div
                                v-else
                                class="w-100 d-flex flex-column gap-1 align-items-center justify-content-center"
                            >
                                <div class="fw-medium fs-5 mt-4">No notifications here</div>
                                <div class="text-muted small">Please check again later</div>
                            </div>
                            <button
                                class="btn btn-close btn-sm"
                                @click="onCloseSidebar"
                            ></button>
                        </div>
                        <TransitionGroup name="list" tag="div" class="h-100 overflow-scroll border-top-0 border border-1 border-start-1">
                            <AppNotificationSidebarCard
                                v-for="(notification, index) in notifications"
                                @close="onCloseNotification(notification.id)"
                                :key="`notification-${notification.id}`"
                                class="list-group-item border-0"
                                :class="{'border-top-0' : index === 0, 'border-bottom-0': index === notifications.length -1}"
                            >
                                <span class="d-block fw-medium">{{ notification.title }}</span>
                                <span class="d-block font-m text-muted small mb-2">{{
                                        useTimeAgo(new Date(notification.createdAt))
                                                                                   }}</span>
                                <span class="d-block text-muted">{{ notification.message }}</span>
                            </AppNotificationSidebarCard>
                        </TransitionGroup>
                        <div v-if="notifications.length > 0" class="mt-auto d-flex flex-row gap-3 pe-3  justify-content-around border-start">
                            <div class="small text-muted py-3 highlight-on-hover">Mark all as read</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { onClickOutside, useTimeAgo } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AppNotificationSidebarCard from './AppNotificationSidebarCard.vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'AppNotificationSidebar',
    methods: { useTimeAgo },
    data () {
        return {}
    },
    components: { AppNotificationSidebarCard },
    props: {
        title: String
    },
    setup () {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()

        const onCloseSidebar = () => {
            store.commit('notification/hideAside')
        }
        const onSelectSidebar = (routeName) => {
            router.push({name: routeName})
            store.commit('notification/hideAside')
        }

        let isShown = computed(() => {
            return store.state.notification.asideShown
        })
        const notificationSidebarList = ref(null)

        onClickOutside(notificationSidebarList, (event) => {
            console.log('closed', notificationSidebarList, event)
            onCloseSidebar()
        })

        watch(route, async () => {
            store.commit('notification/hideAside')
        })

        let onCloseNotification = (notificationId) => {
            console.log('notificationId=', notificationId)
            store.dispatch('notification/removeMarkNotificationAsRead', notificationId)
        }

        return {
            notifications: computed(() => store.state.notification.notifications),
            isShown, notificationSidebarList,
            onCloseNotification,
            onCloseSidebar,
            onSelectSidebar,
            menuItems: computed(() => [
                { title: 'Profile', routeName: 'Profile' },
                { title: 'Courses', routeName: 'CourseList'},
                { title: 'Categories', routeName: 'CategoryList'},
                // { title: 'Reviews', routeName: ''},
                { title: 'Logout', routeName: 'Logout'},
            ]),
        }
    },
}
</script>

<style scoped>

.list-enter-active,
.list-leave-active {
    transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

#notification-list {
    max-width: 85vw;
    width: 24rem;
    height: 100vh;
}

#menu-list {
    max-width: 85vw;
    width: 12rem;
}

@media screen and (max-width: 576px) {
    #menu-list {
        width: 85vw;
    }
}

#notification-layer {
    background-color: rgba(0, 0, 0, .5);
}

/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active #sidebar,
.fade-leave-active #sidebar {
    transition: all 0.2s ease-in-out;

}

.fade-enter-from #sidebar,
.fade-leave-to #sidebar {
    transform: translateX(100%);
}

.fade-enter-active #sidebar {
    transition-delay: 0.05s;
}
</style>
