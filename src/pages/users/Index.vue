<template>
  <div>
    <div style="margin-top: 10%"></div>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

      <v-simple-table>
        <thead>
        <tr>
          <th class="primary--text">
            ID
          </th>
          <th class="primary--text">
            Name
          </th>
          <th class="primary--text">
            Email
          </th>
          <th class="primary--text">

          </th>
          <th class="text-right primary--text">

          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(user,index) in users">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td class="text-right">
            <v-btn color="green" dark @click="$router.push(`/users/edit/${user.id}`)">edit</v-btn>
          </td>
          <td class="text-right">
            <v-btn color="red" dark @click="deleteUser(index,user.id)">Delete</v-btn>
          </td>
        </tr>

        </tbody>
      </v-simple-table>


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
  name: 'Users',

  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer,
  },

  data: () => ({
    users: [],
    message: false,
    message_type: "success",
    message_content: "",
  }),
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.axios.get('users').then(response => {
        this.users = response.data.data
      })
    },
    deleteUser(index,id) {
      this.axios.delete(`users/${id}`).then(response => {
        this.message = true
        this.message_type = 'success'
        this.message_content = response.data.message
        this.$delete(this.users, index)
      })
    }
  }
}
</script>
