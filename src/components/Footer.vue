<template>
  <div :class="`${currentTheme}-theme`">
  

    <b-row
      class="d-flex justify-content-between mt-50 mt-md-2 footer-secondary padding--x flex-column-reverse flex-md-row"
    >
      <b-col md="6" class="mt-50 mt-md-0">
        <a class="rights link-hover" href="/"
          >© 2023 Alfred. All rights reserved.</a
        ></b-col
      >
      <b-col class="d-flex social-icons" md="5" lg="4" xl="3">
        <b-col
          md="2"
          v-for="(socialHandle, index) in socialHandles"
          :key="index"
        >
          <a target="_blank" :href="socialHandle.link"
            ><img :src="socialHandle.icon" alt=""
          /></a>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, VBToggle } from "bootstrap-vue";
import socialHandles from "@/assets/data/socialHandles.js";
import designMixin from "@/mixins/designMixin.js";
export default {
  name: "Footer",
  mixins: [designMixin],
  components: {
    BCol,
    BRow,
  },
  data() {
    return {
      socialHandles,
    };
  },
  directives: {
    "b-toggle": VBToggle,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.company {
  &-description {
    color: $gray-500;
  }
}
.list {
  cursor: auto;
  font-weight: 600;
  color: $gray-400;
  &-points {
    color: $gray-500;
    font-weight: 600;
  }
}

.rights {
  color: $gray-400;
}
.footer-secondary {
  background: $light-secondary;
  padding-top: 2.5em;
  padding-bottom: 2.5em;
}
.dark-layout {
  .footer-secondary {
    background: $dark-secondary;
  }
}

@media only screen and (max-width: 1400px) {
  .footer-secondary {
    padding-left: 4em;
  }
}

@media only screen and (max-width: 768px) {
  .footer-secondary {
    padding-top: 2em;
    padding-bottom: 2em;
    padding-left: 3em;
  }
}

@media only screen and (max-width: 600px) {
  .list {
    margin-top: 0.25em;
  }
  .footer-secondary {
    padding: 1em;
  }
  .social-icons {
    margin-bottom: 1em;
  }
  .rights {
    padding-left: 1rem;
  }
}
</style>
