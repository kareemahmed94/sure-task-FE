<template>
  <div>

  </div>
</template>

<script>

import DashboardCoreAppBar from '@/components/core/AppBar'
import DashboardCoreDrawer from '@/components/core/Drawer'

export default {
  name: 'DashboardIndex',

  components: {
    DashboardCoreAppBar,
    DashboardCoreDrawer,
  },

  data: () => ({
    expandOnHover: false,
  }),
}
</script>
