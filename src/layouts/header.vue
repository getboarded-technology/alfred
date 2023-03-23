<template>
  <div class="header">
    <div>
      <h1 class="header-tittle">
        DashBoard
      </h1>
    </div>
    <div class="header-right">
      <div class="header-theme-icon">
        <feather-icon
          class="header-theme"
          :icon="this.$store.state.appConfig.layout.skin !== 'dark' ? 'SunIcon' : 'MoonIcon'"
          size="23"
          @click="() => toggleSkin()"
        />
      </div>
      <div class="header-noti-icon">
        <feather-icon
          badge="22"
          badge-classes="bg-danger"
          class="header-notification"
          icon="BellIcon"
          size="23"
        />
      </div>
      <div class="header-profile">
        <div class="header-profile-img">
          <img
            key="profile"
            src="@/assets/images/avatars/1.png"
            alt="profile"
            style="width: 100%; height: 100%; object-fit: contain"
          >
        </div>
        <div>
          <h1 class="header-profile-name">
            Hello Again
          </h1>
          <h1 class="header-profile-subTittle">
            hello@Getboarded.com
          </h1>
        </div>
        <feather-icon
          class="header-profile-icon"
          icon="ChevronDownIcon"
          size="20"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      theme: this.$store.state.appConfig.layout.skin,
    }
  },
  methods: {
    toggleSkin() {
      if (this.$store.state.appConfig.layout.skin === 'dark') {
        this.$store.dispatch('appConfig/toggleSkin', 'light')
      } else {
        this.$store.dispatch('appConfig/toggleSkin', 'dark')
      }
      // this.$store.dispatch('appConfig/toggleSkin', 'dark')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layouts/header.scss';
</style>
