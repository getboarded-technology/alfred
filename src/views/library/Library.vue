<template>
  <div :class="`light-theme`">
    <!-- Org heading  -->
    <b-row class="padding--x org-bg" :style="orgBg">
      <b-col class="d-flex align-items-center">
        <b-row class="py-2">
          <b-col sm="6" md="8">
            <h3 class="org-heading heading">ETH Global</h3>
            <p class="org-subheading subheading">
              Hackathons teach new skills, strengthen developer communities, and
              push the limits of new technologies. At ETHGlobal, we're
              leveraging our years of experience to foster a world-class
              ecosystem of Ethereum developers and entrepreneurs.
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- <div class="my-3 mt-md-8 mb-md-1 padding--x">
      <b-row class="justify-content-between">
        <b-col md="3" xl="2">
          <div
            class="cursor-pointer custom-btn d-flex align-items-center custom-border-btn mb-1 mb-md-0"
          >
            <b-form-checkbox v-model="selectCourse" value="true" />
            <p class="m-0 custom-btn-text custom-border-btn-text">
              Select Cousre
            </p>
          </div></b-col
        >

        <b-col md="9">
          <b-row class="justify-content-end">
            <b-col md="4" lg="3">
              <b-form-group>
                <v-select
                  v-model="selected"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="option"
                  :class="
                    windowSize === 'lg' || windowSize === 'xl'
                      ? 'select-size-lg'
                      : ''
                  "
                  placeholder="Filter By"
                /> </b-form-group
            ></b-col>
            <b-col class="pl-0 px-md-1 pr-lg-0" md="5" lg="3">
              <b-form-group>
                <v-select
                  v-model="selected"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="title"
                  :options="option"
                  :class="
                    windowSize === 'lg' || windowSize === 'xl'
                      ? 'select-size-lg'
                      : ''
                  "
                  placeholder="User Segments"
                /> </b-form-group></b-col
            ><b-col class="pr-0" sm="6" md="2">
              <div
                class="cursor-pointer custom-btn d-flex align-items-center justify-content-center"
              >
                <p class="m-0 custom-btn-text">Distribute</p>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div> -->
    <!-- Org courses  -->
    <b-row class="padding--x-uni">
      <b-col
        v-for="(item, i) in libraryItems"
        :key="i"
        md="6"
        lg="4"
        class="px-md-2 mb-2 my-md-2"
      >
        <courses :item="item.data" class="h-100" /> </b-col
    ></b-row>

    <!-- suggestions  -->
    <b-row class="padding--x py-2 my-2 my-md-6 org-bg" :style="suggestionBg">
      <b-col md="6" lg="7" xl="8" class="d-flex align-items-center">
        <div>
          <h3 class="suggestion-heading heading">My Suggestions</h3>
          <p class="suggestion-subheading subheading">
            Got something interesting to share with everyone? add it to training
            library
          </p>
        </div>
      </b-col>
      <b-col md="6" lg="5" xl="4">
        <b-row class="d-flex justify-content-end w-full"
          ><b-col
            sm="6"
            md="4"
            class="cursor-pointer custom-btn btn-white d-flex align-items-center justify-content-center mr-md-1 mr-lg-2"
          >
            <p class="m-0 custom-btn-text btn-white-text">Learn More</p>
          </b-col>
          <b-col
            sm="6"
            md="7"
            class="cursor-pointer custom-btn d-flex mt-1 mt-md-0 align-items-center justify-content-center"
          >
            <p class="m-0 custom-btn-text">360 Training’s Curated</p>
          </b-col></b-row
        >
      </b-col>
    </b-row>

    <distribute-item v-if="distributeItemPopup" />
  </div>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";
import Courses from "@/components/Courses.vue";
import designMixin from "@/mixins/designMixin.js";
import DistributeItem from "@/modals/DistributeItem.vue";
export default {
  name: "Library",
  mixins: [designMixin],
  components: {
    BCol,
    BRow,
    Courses,
    DistributeItem,
  },
  data() {
    return {
      option: [
        { title: "Square" },
        { title: "Rectangle" },
        { title: "Rombo" },
        { title: "Romboid" },
      ],
      selected: "",
      selectCourse: false,
      currentTheme: "light",
      libraryItems: [],
    };
  },
  computed: {
    orgBg() {
      return {
        background: `linear-gradient(${this.themeColor + "BF"}, ${
          this.themeColor + "BF"
        }), url(${require(`@/assets/images/gala-bg.png`)})`,
      };
    },
    suggestionBg() {
      return {
        background: `${this.themeColor}1a`,
      };
    },
    distributeItemPopup() {
      return this.$store.state.modals.distributeItemPopup;
    },
  },
  methods: {
    getLibraryItems() {
      this.$store
        .dispatch("library/getLibraryItems")
        .then((res) => {
          this.libraryItems = res.data;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    },
  },
  mounted() {
    this.getLibraryItems();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.org {
  &-bg {
    height: 25em;
    display: flex;
    align-items: center;
  }

  &-heading {
    font-weight: 600;
    color: $light-primary;
  }

  &-subheading {
    color: $light-primary;
  }
}

.v-list .v-list-item--link:before {
  background-color: red !important;
}

.suggestion {
  &-heading {
    font-weight: 600;
    color: $dark-primary;
  }

  &-subheading {
    color: $gray-500;
  }
}

.padding--x-uni {
  padding-right: 3em;
  padding-left: 4em;
}
.btn-white {
  background: $light-primary;
  border: 2px solid $gray-300;

  &-text {
    color: $dark-primary;
  }
}

@media only screen and (max-width: 991px) {
  .org-bg {
    height: 17.5em;
    background-size: cover !important;
    background-repeat: no-repeat !important;
  }

  .padding--x-uni {
    padding-left: 1em;
    padding-right: 1em;
  }
}

@media only screen and (max-width: 600px) {
  .org-bg {
    height: auto;
  }

  .padding--x-uni {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
}
</style>
