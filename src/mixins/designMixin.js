export default {
  data() {
    return {
      isDeviceSmall: false,
      currentTheme: "dark",
      themeColor: "#f2c046",
    };
  },
  computed: {
    windowSize() {
      return this.$store.getters["app/currentBreakPoint"];
    },
  },
  watch: {
    windowSize(newVal) {
      this.checkDeviceSize(newVal);
    },
  },
  mounted() {
    this.checkDeviceSize(this.windowSize);
  },
  methods: {
    checkDeviceSize(val) {
      if (val === "sm" || val === "xs") {
        return (this.isDeviceSmall = true);
      }
    },
    setthemeColor(color) {
      let domStyle = document.documentElement.style;
      domStyle.setProperty("--org-theme-color", color);
      domStyle.setProperty("--org-theme-color--low", color + "1f");
    },
  },
};
