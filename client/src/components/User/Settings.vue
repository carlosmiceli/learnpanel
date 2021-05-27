<template>
    <div class="settings">
        <h1>Change Password</h1>
        <form id="changePasswordForm">
            <label for="old-password">Current Password</label>
            <input
              v-model.trim="changePasswordForm.oldPassword"
              type="password"
              placeholder="Write your current password"
              id="old-password"
              required
            />
            <label for="change-password">Password</label>
            <input
              v-model.trim="changePasswordForm.newPassword"
              type="password"
              placeholder="min 6 characters"
              id="change-password"
              required
            />
            <label for="repeat-change-password">Repeat Password</label>
            <input
              v-model.trim="changePasswordForm.repeatPassword"
              type="password"
              placeholder="Write password again"
              id="repeat-change-password"
              required
            />
          <v-btn
            class="ma-2"
            color="info"
            @click="changePassword()"
          >
            Submit
          </v-btn>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            changePasswordForm: {
                oldPassword: "",
                newPassword: "",
                repeatPassword: "",
            },
        }
    },
    methods: {
        changePassword () {
            if (this.changePasswordForm.newPassword.length < 6) {
                alert("Password not long enough")
                return
            }

            if (this.changePasswordForm.newPassword === this.changePasswordForm.repeatPassword) {
                return axios.put('http://localhost:3000/change-pw', {
                    oldPassword: this.changePasswordForm.oldPassword, 
                    newPassword: this.changePasswordForm.newPassword
                })
                .then(res => {
                    console.log(res)
                    alert(res.data)
                    this.$router.push("/")
                })
                .catch(err => console.log(err))
            }
            else alert("Password doesn't match")
        }
    }
}
</script>

<style>

.settings {
    display: flex;
    flex-direction: column;
    width: 20%;
    margin: 0 auto;
}

input {
    text-align: center;
}

</style>