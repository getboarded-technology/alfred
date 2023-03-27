<template>
  <div
    v-if="verifyPopup"
    @click="$store.commit('modals/OPEN_VERIFY_BOT_POPUP', false)"
    class="py-3 md-pd d-flex align-items-center w-100 h-100 justify-content-end chatbot__modal__container position-absolute"
  >
    <section
      @click.stop
      class="w-60 p-1 chatbot__modal__container__chat position-relative"
      :class="`light-theme`"
    >
      <div
        @click="$store.commit('modals/OPEN_VERIFY_BOT_POPUP', false)"
        class="d-flex position-absolute align-items-center justify-content-center cross-icon cursor-pointer"
        :class="`cross-icon-light`"
      >
        X
      </div>
      <iframe
        class="w-100 h-100"
        :src="`https://gtbrdd.typeform.com/c/UzMUt1QQ#first_name=${encodeURIComponent(
          `${userData.firstName}`
        )}&email=${userData.email}&org=${constants.orgName}&gbuid=${
          userData._id
        }&gborgid=${constants.orgId}&tzn=${encodeURIComponent(
          timeZone
        )}&learningid=${selectedItem.taskId}&learningtitle=${
          selectedItem.task.title
        }`"
        frameBorder="0"
      ></iframe>
    </section>
  </div>
</template>
<script>
import constants from "@/constants";
export default {
  name: "ChatBotModal",
  data() {
    return {
      constants,
      timeZone: "",
      item: {},
    };
  },
  props: {
    selectedItem: {
      type: Object,
    },
  },
  computed: {
    currentTheme() {
      return this.$store.state.user.themeType;
    },
    userData() {
      return this.$store.state.user.user;
    },
    verifyPopup() {
      return this.$store.state.modals.verifyPopup;
    },
  },
  watch: {
    selectedItem: {
      handler(newVal) {
        this.item = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  },
};
</script>
<style lang="scss" scoped>
.light-theme {
  background: #fff;
  .text {
    color: #1c1c1e;
  }
}

.dark-theme {
  background: #121215;
  .text {
    color: #fff;
  }

  .main-text {
    color: #8e8e93;
  }
}

.cross-icon {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  top: 0;
  font-size: 1.5em;
  padding: 0.5em;
  border-radius: 50%;
  height: 2em;
  width: 2em;
  top: -0.5em;
  right: -0.5em;
  transition: all 0.23s ease 0.1s;
  transform: translate(8px, -2px);
  &-dark {
    background: #1c1c1e;
  }

  &-light {
    background: #fffffffa;
  }
  // For hover effect of close btn
  &:hover,
  &:focus,
  &:active {
    opacity: 1;
    outline: none;
    transform: translate(5px, 3px);
    box-shadow: none;
  }
}

.chatbot__modal {
  &__container {
    background: #0000006a;
    backdrop-filter: blur(5px);
    position: fixed !important;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1050;
    &__chat {
      width: 25%;
      height: 75%;
      right: 3.75em;
      top: 3.5em;
      border-radius: 10px;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .chatbot__modal {
    &__container {
      &__chat {
        width: 30%;
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .md-pd {
    padding: 1.5em !important;
  }
  .chatbot__modal {
    &__container {
      &__chat {
        height: 50%;
        right: 0.5em;
        top: 15em;
        width: 50%;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .md-pd {
    padding: 1.5em !important;
  }
  .chatbot__modal {
    &__container {
      &__chat {
        right: 0.5em;
        width: 50%;
        height: 75%;
        top: 1em;
      }
    }
  }
}

@media only screen and (max-width: 660px) {
  .chatbot__modal {
    &__container {
      &__chat {
        width: 95%;
        height: 75%;
        top: 2em;
      }
    }
  }
}
</style>
