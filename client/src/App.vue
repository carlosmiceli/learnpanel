<template>
  <div id="app">
    <v-app>
      <v-app-bar v-if="user" id="nav" dense elevation="0" class="light-blue lighten-1" app>
        <v-toolbar-title><router-link to="/" style="cursor: pointer">Learn Panel</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link key="Home" to="/">
          <v-btn plain style="cursor: pointer" :ripple="false">
            <v-icon>mdi-home</v-icon>
             Home
          </v-btn>
        </router-link>
        <router-link key="Archive" to="/archive">
          <v-btn plain style="cursor: pointer" :ripple="false">
            <v-icon>mdi-archive</v-icon>
             Archive
          </v-btn>
        </router-link>
        <router-link key="Settings" to="/settings">
          <v-btn plain style="cursor: pointer" :ripple="false">
            <v-icon>mdi-account-cog</v-icon>
             Settings
          </v-btn>
        </router-link>
        <router-link key="Logout" to="/logout">
          <v-btn plain style="cursor: pointer" :ripple="false" @click="logout()">
            <v-icon>mdi-logout-variant</v-icon>
             Logout
          </v-btn>
        </router-link>
      </v-app-bar>

      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
      
    </v-app>
  </div>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.loggedIn
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
      }
    }
  }
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {

  a {
    font-weight: bold;
    color: white;
    margin-right: 5px;
    text-decoration: none;
  }

  a:visited, a:hover, a:active {
    color: inherit;
  }

  .v-btn {
    color: white
  }

  i {
    margin-right: 3px;
  }

  .v-toolbar__title {
    color: white;
    font-size: 24px;
    font-weight: 00;
  }
}
</style>
