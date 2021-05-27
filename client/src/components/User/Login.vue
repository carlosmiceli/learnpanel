<template>
  <div id="login">
    <section>
      <div class="col1">
        <img
          src="https://artismedialearning.com/wp-content/uploads/2018/03/ventajas.png"
          alt=""
        />
      </div>
      <div class="col2">
        <app-alert v-if="errorMessage" :message="errorMessage" @dismissed="onDismissed"></app-alert>
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Carlos Learns</h1>
          <div>
            <label for="email-login">Email</label>
            <input
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email-login"
            />
          </div>
          <div>
            <label for="password-login">Password</label>
            <input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password-login"
            />
          </div>
          <v-btn
            class="ma-2"
            :loading="loading"
            :disabled="loading"
            color="info"
            @click="login(), loader='loading4'"
          >
            Login
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <div class="extras">
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form class="create-account" v-else @submit.prevent>
          <h1>Get Started</h1>
            <label for="name">Name</label>
            <input
              v-model.trim="signupForm.name"
              type="text"
              id="name"
              required
            />
            <label for="email-signup">Email</label>
            <input
              v-model.trim="signupForm.email"
              type="email"
              id="email-signup"
              required
            />
            <label for="password-signup">Password</label>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password-signup"
              required
            />
            <label for="password-signup">Repeat Password</label>
            <input
              v-model.trim="signupForm.repeatPassword"
              type="password"
              placeholder="Write password again"
              id="repeat-password-signup"
              required
            />
          <v-btn
            class="ma-2"
            :loading="loading"
            :disabled="loading"
            color="info"
            @click="signup(), loader='loading4'"
          >
            Signup
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
      showLoginForm: true
    };
  },
  computed: {
    user () {
      return this.$store.getters.loggedIn
    },
    loading () {
      return this.$store.getters.loading
    },
    errorMessage () {
        return this.$store.getters.errorMessage
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/")
      }
    },
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password
      });
    },
    signup() {
      if (this.signupForm.password.length < 6) {
        alert("Password not long enough")
        return
      }

      if (this.signupForm.password === this.signupForm.repeatPassword) {
        this.$store.dispatch("signUp", {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name
        });
      }
      else {
        alert("Password doesn't match")
      }
    },
    onDismissed() {
      this.$store.dispatch("setErrorStatus", false)
    }
  }
};
</script>

<style lang="scss">
#login {
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

section {
  max-width: none;
  width: 100%;
  display: flex;
  margin: auto 0;
}

.col1 {
  padding: 0;
}

.col2 {
  padding: 0;
}

img {
  max-width: 100%;
}

.create-account {
  display: flex;
  flex-direction: column;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
