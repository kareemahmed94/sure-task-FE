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
                    <v-form v-model="valid" ref="form">
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
                          :append-icon-cb="() => (e1 = !e1)"
                          :type="e1 ? 'password' : 'text'"
                          :rules="passwordRules"
                          counter
                          required
                      ></v-text-field>
                      <v-layout justify-space-between>
                        <v-btn @click="login" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">
                          Login
                        </v-btn>
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
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: 'admin@example.com',
        password: 'admin',
        remember: false,
      },
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
      message: false,
      message_type: "success",
      message_content: "",
      email: '',
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
    console.log(this.$auth.redirect());
  },
  methods: {
    errors(res) {
      this.form.errors = Object.fromEntries(res.data.errors.map(item => [item.field, item.msg]));
    },
    login() {
      this.$auth
          .login({
            body: this.form.body,
            data: this.form.body,
            remember: this.form.remember,
          })
          .then((res) => {
            if (res.data.status === 200) {
              this.$router.push({name: 'home'});
            } else {
              this.message_type = "error"
              this.message_content = res.data.message
              this.message = true
            }
          }, (res) => {
            this.errors(
                res.response || // Axios
                res             // VueResource
            );
          })
    },
  }
}

</script>

<style scoped>
  .form {
    margin-top: 5%;
  }
</style>