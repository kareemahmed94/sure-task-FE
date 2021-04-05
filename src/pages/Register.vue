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
                  <v-toolbar-title class="white--text"><h4>Registration</h4></v-toolbar-title>
                </v-toolbar-items>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                    <v-form v-model="valid" ref="registrationForm">
                      <v-text-field
                          label="Enter your Name"
                          v-model="form.name"
                          :rules="nameRules"
                          required
                      ></v-text-field>
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
                        <v-btn @click="register" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">
                          Register
                        </v-btn>
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
        name: '',
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
      nameRules: [
        (v) => !!v || 'Name is required',
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
    register() {
      if (this.$refs.registrationForm.validate()) {
        const data = this.form
        this.axios.post('register', data).then(response => {
          if (response.data.status === 200) {
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("email", this.form.email);
            this.$router.push('verify')
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
    },
  }
}

</script>

<style scoped>
.form {
  margin-top: 5%;
}
</style>
