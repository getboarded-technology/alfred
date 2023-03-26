<template>
  <div class="sideBar-mainContainer">
    <div
      id="sideBar"
      class="sideBar"
    >
      <div
        class="sideBar-logo"
        @click="toggleSideBar"
      >
        <img
          src="@/assets/images/logo/alfred.svg"
          alt="Getboarded Logo"
          style="width: 100%; height: 100%; object-fit: contain"
        >
      </div>
      <div class="sideBar-nav">
        <router-link
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          class="sideBar-nav-title"
        >
          <div class="sideBar-nav-logo">
            <component :is="route.icon" />
          </div>
        </router-link>
      </div>
    </div>
    <div
      id="menuIcon"
      class="sideBar-menu-icon"
    >
      <feather-icon
        icon="MenuIcon"
        size="20"
        @click="toggleSideBar"
      />
    </div>
    <div class="sideBar-toggleMenu">
      <div
        id="sideDrawer"
        class="sideDrawer"
      >
        <div class="sideDrawer-topContainer">
          <div class="sideDrawer-logo">
            <img
              src="@/assets/images/logo/alfred.svg"
              alt="Getboarded Logo"
              style="width: 100%; height: 100%; object-fit: contain"
            >
          </div>
          <div
            class="sideDrawer-toggleMenu-icon"
            @click="toggleSideBar"
          >
            <feather-icon
              icon="XIcon"
              size="25"
              style="width: 100 %; height: 100%; object-fit: fill"
            />
          </div>
        </div>
        <!-- Routes For Side Drawer -->
        <div class="sideDrawer-routes-container">
          <router-link
            v-for="route in routes"
            :key="route.name"
            :to="route.path"
            class="sideDrawer-nav-title"
          >
            <div class="sideDrawer-nav-title-icon">
              <component :is="route.icon" />
            </div>
            <div class="sideDrawer-nav-title-text">
              {{ route.name }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import category from '@/assets/images/svg/sidebar/category.vue'
import rocket from '@/assets/images/svg/sidebar/rocket.vue'
import chat from '@/assets/images/svg/sidebar/chat.vue'
import heart from '@/assets/images/svg/sidebar/heart.vue'
import mace from '@/assets/images/svg/sidebar/mace.vue'
import bank from '@/assets/images/svg/sidebar/bank.vue'
import settings from '@/assets/images/svg/sidebar/settings.vue'
import briefcase from '@/assets/images/svg/sidebar/briefcase.vue'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  name: 'SideBar',
  components: {
    category,
    rocket,
    chat,
    heart,
    mace,
    bank,
    settings,
    briefcase,
    FeatherIcon,
  },
  data() {
    return {
      sideBar: true,
      isExpanded: false,
      routes: [
        {
          name: 'Home',
          icon: 'category',
          path: '/',
        },
        // {
        //   name: 'Board',
        //   icon: 'rocket',
        //   path: '/board',
        // },
        // {
        //   name: 'Mace',
        //   icon: 'mace',
        //   path: '/mace',
        // },
        // {
        //   name: 'Heart',
        //   icon: 'heart',
        //   path: '/heart',
        // },
        // {
        //   name: 'Chat',
        //   icon: 'chat',
        //   path: '/chat',
        // },
        // {
        //   name: 'Bank',
        //   icon: 'bank',
        //   path: '/bank',
        // },
        {
          name: 'Settings',
          icon: 'settings',
          path: '/settings',
        },
        // {
        //   name: 'Briefcase',
        //   icon: 'briefcase',
        //   path: '/briefcase',
        // },
      ],
    }
  },
  methods: {
    toggleSideBar() {
      console.log('toggleSideBar')
      const drawer = document.getElementById('sideDrawer')
      const menuIcon = document.getElementById('menuIcon')
      //  check if display is none
      if (drawer.style.display === 'none') {
        menuIcon.style.display = 'none'
        drawer.style.display = 'block '
      } else {
        menuIcon.style.display = 'flex'
        drawer.style.display = 'none'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layouts/sideBar.scss';
.sidebar{
  height: 90vh;
}
</style>
