import Vue from "vue";
import Vuex from "vuex";
// import firebase from 'firebase'
// import router from '../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedPanel: [],
        user: null,
        loggedIn: false,
        // loading: false --> Add a loading spinner later for signup/login/loading content/adding content
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
                if (state.loadedPanel[i].id === payload) {
                    state.loadedPanel.splice(i, 1)
                    return
                }
            }
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoggedIn (state, payload) {
            state.loggedIn = payload
        },
        logout (state) {
            state.loggedIn = false
        },
        // setLoadingStatus (state, payload) {
        //     state.loading = payload
        // },
        setErrorStatus (state, payload) {
            state.error = payload
        }
    },
    actions: {
        fetchUser ({commit}, payload) {
            commit("setLoggedIn", payload !== null);
            if (payload) {
                const returningUser = {
                    id: payload.uid,
                }
                commit("setUser", returningUser);
            } else {
            commit("setUser", null);
            }
        },
        // loadContent ({commit}) {
        //     firebase.firestore().collection('users').doc(this.state.user.id).collection('collection').get()
        //     .then((data) => {
        //         const content = data.docs.map(d => {
        //             const docData = d.data()
        //             return {...docData, id: d.id}
        //         })
        //         commit("setContent", content)
        //     })
        //     .catch(err => console.log(err))
        // },
        // addContent ({commit}, payload) {
        //     console.log(this.state.user.id)
        //     const content = {
        //         title: payload.title,
        //         url: payload.url,
        //         category: payload.category,
        //         view: true,
        //         createdOn: new Date()
        //     }
        //     firebase.firestore().collection('users').doc(this.state.user.id).collection('collection').add(content)
        //     .then((data) => {
        //         commit("addContent", {
        //         ...content,
        //         id: data.id
        //     })})
        //     .catch(err => console.log(err))       
        // },
        // removeContent ({commit}, payload) {
        //     firebase.firestore().collection('users').doc(this.state.user.id).collection('collection').doc(payload).delete()
        //     .then(() => {
        //         commit("removeContent", payload)
        //     })
        //     .catch(err => console.log(err))
        // },
        // signUp ({commit}, payload) {
        //     // commit("setLoadingStatus", true)
        //     commit("setErrorStatus", null)
        //     firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        //     .then(user => {
        //         const newUser = {
        //             id: user.user.uid,
        //             name: payload.name,
        //             createdOn: new Date()
        //         }
        //         firebase.firestore().collection('users').doc(user.user.uid).set(newUser)
        //         commit("setUser", newUser)
        //         // commit("setLoadingStatus", false)
        //     })
        //     .catch(err => {
        //         // commit("setLoadingStatus", false)
        //         commit("setErrorStatus", err.message)
        //         console.log(err)})
        // },
        // login ({commit}, payload) {
        //     // commit("setLoadingStatus", true)
        //     commit("setErrorStatus", null)
        //     firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        //     .then(user => {
        //         // commit("setLoadingStatus", false)
        //         const returningUser = {
        //             id: user.user.uid,
        //         }
        //         commit("setUser", returningUser)
        //     })
        //     .catch(err => {
        //         // commit("setLoadingStatus", false)
        //         commit("setErrorStatus", err.message)
        //         console.log(err)})
        // },
        // logout ({commit}) {
        //     firebase.auth().signOut()
        //     .then(() => {
        //         router.push("/login")
        //         commit("logout")
        //      })
        //     .catch(err => console.log(err))
        // }
        // checkUserStatus({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //       firebase.auth().onAuthStateChanged((user) => {
        //         if (user) {
        //           commit('setUser', state.user.uid);
        //           resolve(state.user.uid);
        //         } else {
        //           reject('User is not logged in.');
        //         }
        //       });
        //     });
        //   },
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
        errorMessage (state) {
            return state.error
        }
    }
})