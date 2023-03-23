<template>
  <div class="secondary-dashboard">
    <div class="secondary-dashboard-sidenav">
      <sideBar />
    </div>
    <div class="dashboard-main">
      <slot />
    </div>
  </div>
</template>

<script>
import sideBar from './sideBar.vue'

export default {
  name: 'SecondaryDashboard',
  components: {
    sideBar,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layouts/secondary-dashboard.scss';
</style>
