<template>
  <div class="position-relative">
    <div class="course" :class="`light-theme`">
      <div class="mb-1 course__img__container">
        <img
          class="w-100 h-100"
          :src="item.imageUrl"
          alt=""
          @error="randomFeedImage"
        />
      </div>
      <b-col class="p-0 course__content">
        <h6 class="mt-75 my-md-1 course__content__use"></h6>
        <h2 class="course__content__title">{{ item.title }}</h2>
        <p class="mb-1 course__content__desc sub">
          {{ item.description }}
        </p>
        <b-row class="course__content__tags">
          <div class="pill pill-listening" md="2">
            #{{ item.format }}
          </div></b-row
        >
      </b-col>
    </div>
    <b-button
      type="submit"
      block
      variant="primary"
      @click="distributeItem(item)"
      color="#f2c046"
      class="distribute-btn position-absolute"
    >
      Distribute Item
    </b-button>
  </div>
</template>
<script>
import { BRow, BCol } from "bootstrap-vue";
import { BButton } from "bootstrap-vue";
import designMixin from "@/mixins/designMixin.js";

export default {
  name: "Courses",
  mixins: [designMixin],
  components: {
    BRow,
    BCol,
    BButton,
  },
  data() {
    return {
      themeColor: "#2E90FA",
      currentTheme: "dark",
    };
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  methods: {
    randomFeedImage(e) {
      let i = 15; // i = number of given random images
      return (e.target.src = require(`@/assets/images/user-dashboard/blank-feed/${[
        Math.floor(Math.random() * i),
      ]}.png`));
    },
    distributeItem(item) {
      this.$store.commit("modals/OPEN_DISTRIBUTE_LIBRARY_POPUP", true);
      this.$store.commit("library/SELECT_ITEM", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.course {
  &__img__container {
    height: 15em;
    border-radius: 5px;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }
  .sub {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.distribute-btn {
  width: 32%;
  right: 0;
  bottom: 0;
}
@media only screen and (max-width: 600px) {
  .course {
    &__content {
      &__title {
        font-size: 1.25em;
      }
    }

    &__img__container {
      height: 10em;
    }
  }
}
</style>
