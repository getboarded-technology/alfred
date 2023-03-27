<template>
  <div class="organization-dashboard">
    <CompanyInfoCard :orgDetails="orgDetails" :orgUsers="orgUsers" />
    <!-- <CreateBoardCard /> -->
  </div>
</template>
<script>
import CompanyInfoCard from "@/components/OrgFlow/CompanyInfoCard.vue";
export default {
  name: "OrganizationDashboard",
  components: {
    CompanyInfoCard,
  },
  data() {
    return {
      orgDetails: {},
      orgUsers: [],
    };
  },
  methods: {
    getOrgDetails() {
      this.$store
        .dispatch("org/getOrgData", {
          orgId: this.$route.params.orgId,
        })
        .then((res) => {
          this.orgDetails = res.orgDetails;
          this.orgUsers = res.user;
        })
        .catch((err) => {
          return err;
        });
    },
  },
  mounted() {
    this.getOrgDetails();
  },
};
</script>
