<!--eslint-disable-line-->
<template>
  <div>
    <v-app>
      <main>
        <v-container fluid fill-height class="loginOverlay form">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-toolbar class="pt-5 blue darken-4">
                <v-toolbar-items>
                  <v-toolbar-title class="white--text"><h4>Welcome Back</h4></v-toolbar-title>
                </v-toolbar-items>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                    <v-form v-model="valid" ref="loginForm">
                      <v-text-field
                          label="Enter your e-mail address"
                          v-model="form.email"
                          :rules="emailRules"
                          required
                      ></v-text-field>
                      <v-text-field
                          label="Enter your password"
                          v-model="form.password"
                          min="8"
                          :type="'password'"
                          :rules="passwordRules"
                          required
                      ></v-text-field>
                      <v-layout justify-space-between>
                        <v-btn @click="login" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">
                          Login
                        </v-btn>
                        <router-link to="/register">new user ?</router-link>
                        <a href="">Forgot Password</a>
                      </v-layout>
                    </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </main>
    </v-app>
    <v-snackbar
        v-model="message"
        :color="message_type"
        :vertical="true"
    >
      {{ message_content }}
    </v-snackbar>
  </div>
</template>

<script>
//eslint-disable-line
import {AUTH_REQUEST} from "@/store/actions/auth";

export default {
  name: 'Login',
  data() {
    return {
      valid:true,
      form: {
        email: '',
        password: '',
        remember: false,
      },
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
      message: false,
      message_type: "success",
      message_content: "",
      emailRules: [
        (v) => !!v || 'E-mail is required',
      ],
      options: {
        isLoggingIn: true,
        shouldStayLoggedIn: true,
      },
    }
  },
  mounted() {
  },
  methods: {
    errors(res) {
      this.form.errors = Object.fromEntries(res.data.errors.map(item => [item.field, item.msg]));
    },
    login() {
      if (this.$refs.loginForm.validate()) {
        const data = this.form
        this.axios.post('auth/login', data).then(response => {
          if (response.data.status === 200) {
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("is_v", true);
            this.$router.go()
            this.message = true
            this.message_type = 'success'
            this.message_content = response.data.message
          } else {
            this.message = true
            this.message_type = 'error'
            this.message_content = response.data.message
          }
        }).catch(response => {
        })
        return 1
      }
      this.message = true
      this.message_type = 'error'
      this.message_content = 'Please fill the form'
    },
  }
}

</script>

<style scoped>
  .form {
    margin-top: 5%;
  }
</style>
