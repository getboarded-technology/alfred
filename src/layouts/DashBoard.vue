<template>
  <div class="dashboard">
    <div class="dashboard-sidenav">
      <sideBar />
    </div>
    <div class="dashboard-header">
      <Header />
    </div>
    <div class="dashboard-main">
      <slot />
    </div>
  </div>
</template>

<script>
import sideBar from './sideBar.vue'
import Header from './header.vue'

export default {
  name: 'DashBoard',
  components: {
    sideBar,
    Header,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layouts/dashboard.scss';
</style>
