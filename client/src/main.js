import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import { store } from './store'
import Alert from './components/Reusable/Alert.vue'

Vue.config.productionTip = false

Vue.component('app-alert', Alert)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
