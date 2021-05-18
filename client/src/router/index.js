import Vue from 'vue'
import VueRouter from 'vue-router'
import Panel from '../components/Panel/Panel.vue'
import Login from '../components/User/Login.vue'
import Settings from '../components/User/Settings.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Panel',
      component: Panel,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: AuthGuard
      // route level code-splitting
      // this generates a separate chunk (Settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "Settings" */ '../components/User/Settings.vue')
    },
    {
      path: '/admin',
      name: 'admin',
    },
    {
      path: '/logout',
      name: 'Logout',
    },
  ],
  mode: 'history'
})