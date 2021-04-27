import { store } from "../store"

export default (to, from, next) => {
    if (to.path === "/login" && store.getters.loggedIn) {
        console.log("1")
        next("/")
    }
    else if (store.getters.loggedIn) {
        next()
    } else {
        next("/login")
    }
}