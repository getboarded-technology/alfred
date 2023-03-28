<template>
  <div class="organization-dashboard">
    <CompanyInfoCard class="my-2" :orgDetails="orgDetails" :orgUsers="orgUsers" />

    <ApproveItemCard
      v-show="assignedTasks && assignedTasks.length > 0"
      v-for="(task, index) in assignedTasks"
      :key="index"
      :task="task"
    />

  </div>
</template>
<script>
import CompanyInfoCard from "@/components/OrgFlow/CompanyInfoCard.vue";
import ApproveItemCard from "@/components/OrgFlow/ApproveItemCard.vue";
export default {
  name: "OrganizationDashboard",
  components: {
    CompanyInfoCard,
    ApproveItemCard,
  },
  data() {
    return {
      orgDetails: {},
      orgUsers: [],
      assignedTasks: [],
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
    getOrgAssignedTask() {
      this.$store
        .dispatch("org/getOrgAssignedTask", {
          orgId: this.$route.params.orgId,
        })
        .then((res) => {
          this.assignedTasks = res;
        })
        .catch((err) => {
          return err;
        });
    },
  },
  mounted() {
    this.getOrgDetails();
    this.getOrgAssignedTask();
  },
};
</script>
