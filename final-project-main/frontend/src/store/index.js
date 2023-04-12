import { createStore } from 'vuex'
import { auth } from './auth.module'
import { notification } from './notification.module'
import { courseSection } from '@/store/courseSection.module'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        notification,
        courseSection,
    },
})
