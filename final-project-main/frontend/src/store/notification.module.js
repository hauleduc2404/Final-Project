export const notification = {
    namespaced: true,
    state: {
        asideShown: false,
        notifications: [],
    },
    getters: {
        // `getters` is localized to this module's getters
        // you can use rootGetters via 4th argument of getters
        shouldShowAside (state) {
            return state.asideShown
        },
        hasNewNotification (state) {
            return state.notifications
                .filter(notification => !notification.readAt).length > 0
        },
    },
    actions: {
        removeMarkNotificationAsRead({commit},id) {
            commit('removeMarkNotificationAsRead', id)
        }
    },
    mutations: {
        removeMarkNotificationAsRead(state, id) {
            const readNotificationIndex = state.notifications.findIndex(notification => notification.id === id)

            if (readNotificationIndex > -1) {
                state.notifications.splice(readNotificationIndex, 1);
            }
        },
        hideAside (state) {
            state.asideShown = false
        },
        showAside (state) {
            state.asideShown = true
        }
    }
}
