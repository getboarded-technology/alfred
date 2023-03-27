<template>
  <div class="secondary-dashboard">
    <div class="secondary-dashboard-sidenav">
      <orgSideBar />
    </div>
    <div class="dashboard-main d-flex flex-column position-relative">
      <connect-wallet-btn class="mb-1 d-flex justify-content-end" />
      <slot />
    </div>
    <manage-org v-if="modifyOrgPopup" />
  </div>
</template>

<script>
import orgSideBar from "./orgSideBar.vue";
import ConnectWalletBtn from "@/components/ConnectWalletBtn.vue";
import ManageOrg from "@/modals/ManageOrg.vue";

export default {
  name: "SecondaryDashboard",
  components: {
    orgSideBar,
    ConnectWalletBtn,
    ManageOrg,
  },
  computed: {
    modifyOrgPopup() {
      return this.$store.state.modals.modifyOrgPopup;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layouts/secondary-dashboard.scss";
</style>
