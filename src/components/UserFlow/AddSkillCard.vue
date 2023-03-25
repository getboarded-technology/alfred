<template>
  <div class="add-skill">
    <div class="add-skill-profile">
      <div class="add-skill-profile-img">
        <img
          :src="`https://source.boringavatars.com/beam/100/${avatarNameGenerator()}`"
          alt="plus"
          style="width: 100%; height: 100%; object-fit: contain"
        />
      </div>
      <div class="add-skill-profile-detail">
        <h1 class="add-skill-profile-name">
          {{ userData.firstName }}{{ userData.lastName }}
        </h1>
        <h1 class="add-skill-profile-email">{{ userData.email }}</h1>
      </div>
      <!-- <div class="add-skill-profile-arrow">
        <feather-icon
          icon="ChevronRightIcon"
          class="add-skill-profile-arrow-icon"
        />
      </div> -->
    </div>
    <div
      class="d-flex flex-wrap"
      v-if="userData && userData.skills && userData.skills.length > 0"
    >
      <b-badge
        pill
        variant="primary"
        class="m-50 p-75"
        v-for="skill in userData.skills"
        :key="skill.code"
        >{{ skill.name }}</b-badge
      >
      <feather-icon
        @click="$store.commit('modals/OPEN_ADD_SKILL_POPUP', !addSkillPopup)"
        icon="PlusCircleIcon"
        class="add-skill-profile-arrow-icon add-skill-profile-plus-icon"
      />
    </div>
    <div class="add-skill-bottom" v-else>
      <div class="add-skill-search-icon">
        <img
          src="@/assets/images/common/dashboard/user/search.png"
          alt="plus"
          style="width: 100%; height: 100%; object-fit: contain"
        />
      </div>
      <h1
        class="add-skill-skill-text"
        @click="$store.commit('modals/OPEN_ADD_SKILL_POPUP', !addSkillPopup)"
      >
        Add your Skill
      </h1>
      <h1 class="add-skill-desc-text">
        Next, setup your visibility and start inviting your Admin Team
      </h1>
    </div>

    <add-skill-modal-vue class="position-absolute" v-if="addSkillPopup" />
  </div>
</template>

<script>
import AddSkillModalVue from "@/modals/AddSkillModal.vue";
import { BBadge } from "bootstrap-vue";
export default {
  components: {
    AddSkillModalVue,
    BBadge,
  },
  computed: {
    addSkillPopup() {
      return this.$store.state.modals.addSkillPopup;
    },
    userData() {
      return this.$store.state.user.user;
    },
    avatarNameGenerator() {
      return this.$store.state.user.avatarNameGenerator;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-skill-skill-text {
  cursor: pointer;
}
</style>
