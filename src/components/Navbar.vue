<template>
  <b-row
    class="padding--x py-2 d-flex justify-content-between align-items-center"
  >
    <b-col
      ><a href="/">
        <img
          class="company-logo"
          :src="require(`@/assets/images/logo/getboarded-${currentTheme}.svg`)"
          alt="Getboarded"
        /> </a
    ></b-col>
    <b-col class="d-flex justify-content-end pr-0">
      <div
        @click="changeTheme"
        class="cursor-pointer d-flex align-items-center justify-content-center mx-1 mx-md-2"
      >
        <!-- <feather-icon
          :color="themeColor"
          :size="isDeviceSmall ? '25' : '35'"
          :icon="`${currentTheme === 'light' ? 'Sun' : 'Moon'}Icon`"
        /> -->
      </div>

      <!-- <div
        class="cursor-pointer custom-btn d-none d-md-flex align-items-center justify-content-center"
      >
        <p class="m-0 custom-btn-text">Connect Wallet</p>
      </div> -->
      <connect-wallet-btn/>
      <div
        class="cursor-pointer d-flex d-md-none align-items-center justify-content-center"
      >
        <feather-icon
          :color="themeColor"
          :size="isDeviceSmall ? '27' : '32'"
          icon="UserIcon"
        />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";
import designMixin from "@/mixins/designMixin.js";
import ConnectWalletBtn from "./ConnectWalletBtn.vue";
export default {
  name: "Navbar",
  mixins: [designMixin],
  components: {
    BCol,
    BRow,
    ConnectWalletBtn
  },
  methods: {
    changeTheme() {
      if (this.currentTheme === "dark") {
        this.$store.commit("user/TOOGLE_THEME", "light");
      } else {
        this.$store.commit("user/TOOGLE_THEME", "dark");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
