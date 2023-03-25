<template>
  <div class="dashboard">
    <div class="dashboard-sidenav position-fixed">
      <sideBar />
    </div>
    <div class="dashboard-header">
      <Header />
    </div>
    <div class="dashboard-main">
      <slot />
    </div>

    <!-- Alex--The Chatbot  -->
    <div
      v-if="userData"
      class="chatbot d-flex align-items-center justify-content-end cursor-pointer"
    >
      <img
        v-if="!chatBotPopup"
        @click="openChatBotPopup"
        class="chatbot-ale w-100"
        src="@/assets/images/alfred/sleeping-ale-bot.png"
        alt="Ale"
      />

      <img
        v-else
        @click="openChatBotPopup"
        class="chatbot-ale w-100"
        src="@/assets/images/alfred/ale-bot.png"
        alt="Ale"
      />
    </div>

    <!-- chatbot modal  -->
    <chatbot-modal
      @click="openChatBotPopup"
      v-if="chatBotPopup && userData"
      class="position-absolute"
    />
  </div>
</template>

<script>
import sideBar from "./sideBar.vue";
import Header from "./header.vue";
import ChatbotModal from "@/modals/ChatbotModal.vue";

export default {
  name: "DashBoard",
  components: {
    sideBar,
    Header,
    ChatbotModal,
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
    chatBotPopup() {
      return this.$store.state.modals.chatBotPopup;
    },
  },
  methods: {
    openChatBotPopup() {
      if (!this.chatBotPopup) {
        return this.$store.commit("modals/OPEN_CHAT_BOT_POPUP", true);
      } else {
        this.$store.commit("modals/OPEN_CHAT_BOT_POPUP", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layouts/dashboard.scss";
// .dashboard{
//   &-header,&-main{
//     width: 80%;
//   }
// }

.chatbot {
  right: 1em;
  bottom: 2em;
  z-index: 1060;
  position: fixed;
  width: 3.5%;
  &-ale {
    box-shadow: 0px 30px 40px 20px rgb(99 132 227 / 10%);
    background: #fffffffa;
    border: 2px solid #ffffff;
    border-radius: 50%;
    padding: 0.5em;
  }
}
</style>
