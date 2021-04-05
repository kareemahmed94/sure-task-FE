<template>
  <div>
    <div style="margin-top: 10%"></div>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

      <v-card v-if="user">
        <v-card-text class="pt-4">
          <div>
            <v-form v-model="valid" ref="updateForm">
              <v-text-field
                  label="Enter your name"
                  v-model="user.name"
                  :rules="nameRules"
                  required
              ></v-text-field>
              <v-text-field
                  label="Enter your e-mail address"
                  v-model="user.email"
                  :rules="emailRules"
                  required
              ></v-text-field>
              <v-text-field
                  label="Enter your password"
                  v-model="user.password"
                  min="8"
                  :type="'password'"
                  required
              ></v-text-field>
              <v-layout justify-space-between>
                <v-btn @click="updateUser" :class="'blue darken-4 white--text'">
                  Update
                </v-btn>
              </v-layout>
            </v-form>
          </div>
        </v-card-text>
      </v-card>


    </v-container>
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

import DashboardCoreAppBar from '@/components/core/AppBar'
import DashboardCoreDrawer from '@/components/core/Drawer'

export default {
  name: 'EditUsers',

  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer,
  },

  data: () => ({
    user: {},
    valid: false,
    message: false,
    message_type: "success",
    message_content: "",
    nameRules: [
      (v) => !!v || 'Name is required',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
  }),
  created() {
    this.getUser()
  },
  methods: {
    getUser(){
      this.axios.get(`users/${this.$route.params.id}`).then(response => {
        this.user = response.data.data
      })
    },
    updateUser() {
      if (this.$refs.updateForm.validate()) {
        this.axios.patch(`users/update/${this.$route.params.id}` , this.user)
            .then(response => {
          this.message = true
          this.message_type = 'success'
          this.message_content = response.data.message
          this.$router.push('/users')
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
