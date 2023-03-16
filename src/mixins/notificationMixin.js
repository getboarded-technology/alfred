import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { config } from "@/configurations";

export default {
  components: {
    ToastificationContent,
  },
  computed: {
    messages() {
      return config.messagingConfig.messages;
    },
  },
  methods: {
    showToast(detail) {
      let timeout = detail.message.includes("Login to interact with the app.")
        ? 1500
        : 15000;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: detail.title ? detail.title : "Notification",
            icon: "BellIcon",
            text: detail.message,
            variant: detail.variant,
          },
        },
        {
          position: "bottom-right",
          timeout,
        }
      );
    },
    blockBodyScroll(val) {
      return val === true
        ? (document.body.className += " overflow-hidden")
        : document.body.classList.remove("overflow-hidden");
    },
    anchorHashCheck() {
      let elementId = this.$route.hash.replace("#", "");
      // let path = this.$route.fullPath.split("#")[0];

      const loadElement = setInterval(function () {
        if (elementId) {
          let elementPosition = document
            .getElementById(elementId)
            .getBoundingClientRect().top;
          elementId = "";
          let headerOffset = 10;
          let offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(loadElement);
        // history.pushState({}, null, path);
      }, 3000);
    },
  },
};
