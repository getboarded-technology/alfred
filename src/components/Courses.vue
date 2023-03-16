<template>
  <div>
    <div class="course" :class="`${currentTheme}-theme`">
      <div class="mb-1 course__img__container">
        <img class="w-100 h-100" src="@/assets/images/gala-bg.png" alt="" />
      </div>
      <b-col class="p-0 course__content">
        <h6 class="mt-75 my-md-1 course__content__use">
          Seizes development opportunities
        </h6>
        <h2 class="course__content__title">El pensamiento de diseño</h2>
        <p class="mb-1 course__content__desc sub">
          ¿Quieres resolver problemas complejos de forma creativa? Haz el curso
          Design thinking y adopta una nueva
        </p>
        <b-row class="course__content__tags">
          <div class="pill pill-listening" md="2">#Listening</div></b-row
        >
      </b-col>
    </div>
  </div>
</template>
<script>
import { BRow,BCol } from "bootstrap-vue";
import designMixin from "@/mixins/designMixin.js";
export default {
  name: "Courses",
  mixins: [designMixin],
  components: {
    BRow,
    BCol
  },
  data() {
    return {
      themeColor: "#2E90FA",
      currentTheme: "dark",
    };
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
