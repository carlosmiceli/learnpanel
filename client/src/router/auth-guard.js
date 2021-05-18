import { store } from "../store"

export default (to, from, next) => {
    console.log(document.cookie)
    if (to.path === "/login" && store.getters.loggedIn) {
        next("/")
    }
    else if (store.getters.loggedIn) {
        next()
    } else {
        next("/login")
    }
}