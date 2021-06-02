import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import router from "../router";

Vue.use(Vuex)

const API_URL = 'https://learn-panel-api.herokuapp.com/';

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
        updateNote (state, payload) {
            let updatedNote = state.loadedPanel.find(c => c._id === payload.id)
            updatedNote.notes = payload.note
        },
        previousCard (state) {
            let oldCard = state.loadedPanel.pop()
            state.loadedPanel.unshift(oldCard)
        },
        nextCard (state) {
            let oldCard = state.loadedPanel.shift()
            state.loadedPanel.push(oldCard)
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
            return axios.get(API_URL + "content")
            .then((data) => {
                commit("setContent", data.data)
            })
            .catch(err => console.log(err))
        },
        addContent ({commit}, payload) {
            let url = {
                url: payload.url
            }
            return axios.post(API_URL + "content/scrape", url)
            .then(res => {
                const content = {
                    title: payload.title,
                    url: payload.url,
                    image: res.data.img,
                    text: res.data.text,
                    videoId: res.data.videoId,
                    category: payload.category,
                    createdOn: new Date()
                }
                return axios.post(API_URL + "content", content)
            })
            .then(res => {
                commit("addContent", res.data.data)})
            .catch(err => console.log(err))       
        },
        removeContent ({commit}, payload) {
            return axios.delete(API_URL + "content", {params: {content: payload}})
            .then(() => {
                commit("removeContent", payload)
            })
            .catch(err => console.log(err))
        },
        updateNote ({commit}, payload) {
            axios.put(API_URL + "content/note", payload)
            .then(res => {
                if (res.data === true) {
                    commit("updateNote", payload)
                }
            })
        },
        previousCard ({commit}) {
            axios.put(API_URL + "content/previous")
            .then(res => {
                if (res.data === true) {
                    commit("previousCard")
                }
            })
        },
        nextCard({commit}) {
            axios.put(API_URL + "content/next")
            .then(res => {
                if (res.data === true) {
                    commit("nextCard")
                }
            })
        },

        // USER
        checklogin({commit}) {
            return axios.get(API_URL + "checklogin")
            .then(res => {
                if (res.status === 200) {
                    commit("setUser", res.data)
                }
                else router.push("/login")
            })
            .catch(err => {
                console.log(err)
            })
        },
        signUp ({commit}, payload) {
            commit("setLoadingStatus", true)
            commit("setErrorStatus", null)
            return axios.post(API_URL + "signup", payload)
            .then((data) => {
                commit("setUser", data.user)
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
                commit("setLoadingStatus", false)
                commit("setUser", data.user)
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
        mainNoteId (state) {
            return state.loadedPanel[0]._id
        },
        errorMessage (state) {
            return state.error
        }
    }
})