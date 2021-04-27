import Vue from 'vue'
import App from './App.vue'
// import firebase from 'firebase/app'
import vuetify from './plugins/vuetify';
import router from './router'
import { store } from './store'
import Alert from './components/Reusable/Alert.vue'

Vue.config.productionTip = false

Vue.component('app-alert', Alert)

// const configOptions = {
//   apiKey: "AIzaSyDS7ZF46GFwHjgtmN2eV98fHQ_llFVe9BQ",
//   authDomain: "carlos-learns.firebaseapp.com",
//   projectId: "carlos-learns",
//   storageBucket: "carlos-learns.appspot.com",
//   messagingSenderId: "816814994238",
//   appId: "1:816814994238:web:2df532e302c5bff678b26f",
//   measurementId: "G-XMG241W0VQ"
// };

// firebase.initializeApp(configOptions);

// firebase.auth().onAuthStateChanged(user => {
//   store.dispatch("fetchUser", user)
// });

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
