<template>
  <div id="login">
    <!-- <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset> -->
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
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <!-- <a @click="togglePasswordReset()">Forgot Password</a> -->
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input
              v-model.trim="signupForm.name"
              type="text"
              id="name"
              required
            />
          </div>
          <div>
            <label for="email-signup">Email</label>
            <input
              v-model.trim="signupForm.email"
              type="email"
              id="email-signup"
              required
            />
          </div>
          <div>
            <label for="password-signup">Password</label>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password-signup"
              required
            />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// import PasswordReset from "@/components/PasswordReset";
export default {
  // components: {
  //   PasswordReset
  // },
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        email: "",
        password: ""
      },
      showLoginForm: true,
      showPasswordReset: false
    };
  },
  computed: {
    user () {
      return this.$store.getters.loggedIn
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
      this.$store.dispatch("signUp", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name
      });
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
</style>
