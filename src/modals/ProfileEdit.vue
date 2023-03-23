<template>
  <modal-structure>
    <div class="profile-ready">
      <div class="profile-ready-img">
        <img
          src="@/assets/images/common/profileReady/Successful.png"
          style="width: 100%; height: 100%; object-fit: contain"
        >
      </div>
      <h1 class="profile-ready-heading">
        Your profiles is ready
      </h1>
      <p class="profile-ready-desc">
        Next, explore free and organizational apps, and add your skill level
        configurations to activate your personal development charter.
      </p>
      <div class="profile-ready-bttn">
        <b-button
          variant="primary"
          class="profile-ready-btn"
          @click="closeModal"
        >
          Let’s Start
        </b-button>
      </div>
    </div>
  </modal-structure>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import ModalStructure from './ModalStructure.vue'

export default {
  name: 'Modal',
  components: {
    ModalStructure,
    BButton,
  },
  props: {
    openWrongDataModel: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>
