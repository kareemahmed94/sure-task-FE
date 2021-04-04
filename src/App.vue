<template>
  <v-app>


    <dashboard-core-view />

  </v-app>
</template>

<script>
import DashboardCoreSettings from '@/components/core/Settings'
import DashboardCoreView from '@/components/core/View'

export default {
  name: 'DashboardIndex',

  components: {

    DashboardCoreSettings,
    DashboardCoreView
  },

  data: () => ({
    expandOnHover: false,
  }),
}
</script>
