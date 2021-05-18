import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from "../router";

Vue.use(Vuex)

const API_URL = 'http://localhost:3000/';

axios.defaults.withCredentials = true

export const store = new Vuex.Store({
    state: {
        loadedPanel: [],
        user: null,
        loggedIn: false,
        loading: false,
        error: null // naming error instead of authError to have error state as a reusable state property
    },
    mutations: {
        setContent (state, payload) {
            state.loadedPanel = payload
        },
        addContent (state, payload) {
            state.loadedPanel.push(payload)
        },
        removeContent (state, payload) {
            for (let i = 0; i < state.loadedPanel.length; i++) {
                if (state.loadedPanel[i]._id === payload) {
                    state.loadedPanel.splice(i, 1)
                    return
                }
            }
        },
        setUser (state, payload) {
            state.user = payload
            state.loggedIn = true
        },
        logout (state) {
            state.loggedIn = false
        },
        setLoadingStatus (state, payload) {
            state.loading = payload
        },
        setErrorStatus (state, payload) {
            state.error = payload
        }
    },
    actions: {
        //CONTENT
        loadContent ({commit}) {
            const user = this.state.user._id
            return axios.get(API_URL + "content", {params: {user}})
            .then((data) => {
                commit("setContent", data.data)
            })
            .catch(err => console.log(err))
        },
        addContent ({commit}, payload) {
            const content = {
                user: this.state.user._id,
                title: payload.title,
                url: payload.url,
                category: payload.category,
                createdOn: new Date()
            }
            return axios.post(API_URL + "content", content)
            .then(res => {
                console.log(res.data.data)
                commit("addContent", res.data.data)})
            .catch(err => console.log(err))       
        },
        removeContent ({commit}, payload) {
            const user = this.state.user._id
            return axios.delete(API_URL + "content", {params: {user, content: payload}})
            .then(() => {
                commit("removeContent", payload)
            })
            .catch(err => console.log(err))
        },

        // USER
        signUp ({commit}, payload) {
            commit("setLoadingStatus", true)
            commit("setErrorStatus", null)
            return axios.post(API_URL + "signup", payload)
            .then((data) => {
                commit("setUser", data.data.data)
                commit("setLoadingStatus", false)
            })
            .catch(err => {
                commit("setLoadingStatus", false)
                commit("setErrorStatus", err.message)
                console.log(err)})
        },
        login ({commit}, payload) {
            commit("setLoadingStatus", true)
            commit("setErrorStatus", null)
            axios.post(API_URL + "login", payload)
            .then(data => {
                console.log(data)
                commit("setLoadingStatus", false)
                commit("setUser", data.data.user)
            })
            .catch(err => {
                commit("setLoadingStatus", false)
                commit("setErrorStatus", err.message)
                console.log(err)})
        },
        logout ({commit}) {
            axios.delete(API_URL + "logout")
            .then(() => {
                commit("logout")
                router.push("/login")
             })
            .catch(err => console.log(err))
        },
    },
    getters: {
        loadedPanel (state) {
            return state.loadedPanel.sort((contentA, contentB) => {
                return contentA.lastOpened > contentB.lastOpened
            })
        },
        loadedContent (state) {
            return (contentId) => {
                return state.loadedPanel.find((content) => {
                    return contentId === content.id
                })
            }
        },
        user (state) {
            return state.user
        },
        loggedIn (state) {
            return state.loggedIn
        },
        loading (state) {
            return state.loading
        },
        errorMessage (state) {
            return state.error
        }
    }
})