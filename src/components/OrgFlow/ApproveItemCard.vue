<template>
  <div
    class="assigned-task px-2 py-2 d-flex align-items-center justify-content-between"
  >
    <div class="d-flex align-items-center">
      <div class="rounded-full overflow-hidden">
        <img
          class="avatar object-cover"
          :src="`https://source.boringavatars.com/beam/100/${avatarNameGenerator()}`"
          alt=""
        />
      </div>
      <div v-if="task.user" class="mx-75">
        <div class="text">
          {{ task.user.firstName }} {{ task.user.lastName }}
        </div>
        <div>{{ task.user.walletAddress }}</div>
      </div>

      <div v-if="task.xp">
        <div class="text">Assigned XP</div>
        <div>{{ task.xp }}</div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div v-if="!task.isApproved && !isApproved">
        <b-button
          type="submit"
          block
          variant="primary"
          @click="approveTask"
          color="#f2c046"
          class="connect__wallet__btn"
        >
          Approve Task
        </b-button>
      </div>
      <div v-else-if="task.isApproved && isApproved">
        <b-button
          type="submit"
          block
          variant="success"
          color="#f2c046"
          class="connect__wallet__btn"
        >
          Task Approved
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
export default {
  name: "ApproveItemCard",
  data() {
    return {
      isApproved: false,
    };
  },
  components: {
    BButton,
  },
  props: {
    task: {
      require: true,
    },
  },
  computed: {
    avatarNameGenerator() {
      return this.$store.state.user.avatarNameGenerator;
    },
  },
  methods: {
    approveTask() {
      
      const payload = {
        userId: this.task.user._id,
        orgId: this.$route.params.orgId,
        isApproved: this.isApproved,
      };
      this.$store
        .dispatch("user/updateAssignTask", payload)
        .then(() => {
          this.isApproved = true;
          return;
        })
        .catch(() => {
          return;
        });
    },
  },
};
</script>

<style lang="scss">
.assigned-task {
  background: #fff;
}
.text {
  color: #000;
  font-size: 1.25em;
  font-weight: bold;
}

.avatar {
  width: 3em;
  height: 3em;
}
</style>
