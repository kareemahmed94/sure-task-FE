<template>
  <v-app>
    <dashboard-core-app-bar v-if="layout_status"/>

    <dashboard-core-drawer v-if="layout_status"/>

    <dashboard-core-view />

  </v-app>
</template>

<script>
import DashboardCoreSettings from '@/components/core/Settings'
import DashboardCoreView from '@/components/core/View'
import DashboardCoreAppBar from "@/components/core/AppBar";
import DashboardCoreDrawer from "@/components/core/Drawer";

export default {
  name: 'DashboardIndex',

  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer,
    DashboardCoreSettings,
    DashboardCoreView
  },
  mounted() {
    if (this.$route.path.split('/')[1] === 'login'
        || this.$route.path.split('/')[1] === 'register' ||
        this.$route.path.split('/')[1] === 'verify' ) {
      this.layout_status = false
    }
  },
  data: () => ({
    expandOnHover: false,
    layout_status: true,
  }),
  watch: {
    '$route.path': function () {
      console.log(this.$route.path.split('/')[1])
      if (this.$route.path.split('/')[1] === 'login' || this.$route.path.split('/')[1] === 'register' ||
          this.$route.path.split('/')[1] === 'verify'  ) {
        this.layout_status = false
      }
    }
  },
}
</script>
