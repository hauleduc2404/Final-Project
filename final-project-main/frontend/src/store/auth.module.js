import AuthService from '../services/auth.service'
import CommonFn from '../common/commonFunction'

const accessToken = JSON.parse(CommonFn.getLocalStorage('accessToken'));
const userInfo = JSON.parse(CommonFn.getLocalStorage('userInfo'));
const initialState = accessToken
    ? { status: { loggedIn: true }, accessToken, userInfo }
    : { status: { loggedIn: false }, accessToken: null, userInfo: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login ({ commit }, user) {
            return AuthService.login(user).then(
                data => {
                    commit('loginSuccess', data)
                    return Promise.resolve(user)
                },
                error => {
                    commit('loginFailure')
                    return Promise.reject(error)
                }
            )
        },
        logout ({ commit }) {
            AuthService.logout()
            commit('logout')
        },
        register ({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess')
                    return Promise.resolve(response.data)
                },
                error => {
                    commit('registerFailure')
                    return Promise.reject(error)
                }
            )
        }
    },
    getters: {
        getUsername(state) {
            return state.userInfo?.name
        }
    },
    mutations: {
        loginSuccess (state, data) {
            state.status.loggedIn = true
            state.accessToken = data.accessToken
            state.userInfo = data.userInfo
            console.log('logged in userInfo=', data)
        },
        loginFailure (state) {
            state.status.loggedIn = false
            state.user = null
            state.username = null
        },
        logout (state) {
            state.status.loggedIn = false
            state.user = null
            state.username = null
        },
        registerSuccess (state) {
            state.status.loggedIn = false
        },
        registerFailure (state) {
            state.status.loggedIn = false
        }
    }
}
