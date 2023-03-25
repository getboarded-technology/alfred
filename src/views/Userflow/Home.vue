<template>
  <div class="home">
    <ProfileEdit v-if="isFirstTime" @close="closeFirstTimeModal()" />
    <div class="home-section1">
      <div id="scrollDiv" class="home-company-cont">
        <SmallCard
          :image="require('@/assets/images/company/eth.png')"
          title="ETH Global"
          website="https://ethglobal.com/"
        />
        <!-- <div class="home-arrow-right cursor-pointer" @click="onClickScrollDiv">
          <feather-icon icon="ChevronRightIcon" class="home-arrow-right-icon" />
        </div> -->
      </div>

      <div class="home-heading-cont">
        <h1 class="home-heading">Development Charter</h1>
        <div class="home-drop">
          <b-form-select
            id="select"
            v-model="recommendationsType"
            :options="options"
            class="rounded-pill"
          />
        </div>
      </div>
      <div v-if="isSkeletonVisible">
        <div v-for="index in 5" :key="index" class="skeleton" />
      </div>

      <TaskCard
        v-else
        v-for="(feed, index) in feedData"
        :key="index"
        :feed="feed"
      />
    </div>
    <div class="home-section2">
      <AddSkillCard />
      <WalletCard />
    </div>
  </div>
</template>

<script>
import SmallCard from "@/components/UserFlow/SmallCard.vue";
import TaskCard from "@/components/UserFlow/TaskCard.vue";
import AddSkillCard from "@/components/UserFlow/AddSkillCard.vue";
import WalletCard from "@/components/UserFlow/WalletCard.vue";
import ProfileEdit from "@/modals/ProfileEdit.vue";
import { BFormSelect } from "bootstrap-vue";

export default {
  components: {
    SmallCard,
    TaskCard,
    BFormSelect,
    AddSkillCard,
    WalletCard,
    ProfileEdit,
  },
  data() {
    return {
      isFirstTime: false,
      recommendationsType: "",
      options: [
        { value: "", text: "Suggested" },
        { value: "doing", text: "Queued Items" },
        { value: "done", text: "Completed Items" },
      ],
      feedData: [],
      filteredFeedData: [],
      mixedFeedData: [],
      doneItemsData: [],
      doingItemsData: [],
      isSkeletonVisible: true,
    };
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
  },
  watch: {
    userData: {
      handler(newVal) {
        if (newVal && newVal.skills && newVal.skills.length > 0) {
          this.userRecommendations();
        }
        newVal ? this.assignedItem() : "";
      },
      immediate: true,
      deep: true,
    },
    recommendationsType(newVal) {
      if (newVal) {
        if (newVal === "done") {
          return this.fetchDoneItems();
        } else if (newVal === "doing") {
          return this.fetchDoingItems();
        } else {
          const filteredFeedData = this.mixedFeedData.filter((object) => {
            return object.type === newVal;
          });
          return (this.feedData = filteredFeedData);
        }
      } else {
        this.feedData = this.mixedFeedData;
      }
    },
  },
  mounted() {
    const isFirstTime = localStorage.getItem("isFirstTime");
    if (isFirstTime === null) {
      this.isFirstTime = true;
      localStorage.setItem("isFirstTime", "false");
    }
  },
  methods: {
    closeFirstTimeModal() {
      this.isFirstTime = false;
    },
    onClickScrollDiv() {
      console.log("jjj");
      const scrollDiv = document.getElementById("scrollDiv");
      scrollDiv.scrollTo({
        left: scrollDiv.scrollLeft + 200,
        behavior: "smooth",
      });
    },
    userRecommendations() {
      if (
        !this.feedData ||
        !this.feedData.length ||
        this.feedData.length !== 0
      ) {
        this.$store
          .dispatch("feed/fetchUserFeed", {
            getboardedId: "625ef69e86d2e700203ab6b2",
          })
          .then((res) => {
            this.mixedFeedData = res.recommendations;
            this.feedData = this.mixedFeedData;
            this.isSkeletonVisible = false;
          })
          .catch(() => {
            this.mixedFeedData = [];
            this.isSkeletonVisible = false;
            // console.log(err);
          });
      }
    },
    fetchDoneItems() {
      this.$store
        .dispatch("feed/doneItems", "625ef69e86d2e700203ab6b2")
        .then((res) => {
          if (res === "") {
            this.doneItemsData = [];
          } else {
            this.doneItemsData = res;
          }

          this.feedData = this.doneItemsData;
          this.isSkeletonVisible = false;
        })
        .catch(() => {
          this.doneItemsData = [];
          this.isSkeletonVisible = false;
        });
    },
    fetchDoingItems() {
      this.$store
        .dispatch("feed/doingItems", "625ef69e86d2e700203ab6b2")
        .then((res) => {
          if (res === "") {
            this.doingItemsData = [];
          } else {
            this.doingItemsData = res;
          }

          this.feedData = this.doingItemsData;
          this.isSkeletonVisible = false;
        })
        .catch(() => {
          this.doingItemsData = [];
          this.isSkeletonVisible = false;
        });
    },
    assignedItem() {
      {
        this.$store
          .dispatch("user/getAssignTask", {
            userId: this.userData._id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch(() => {
            this.mixedFeedData = [];
            this.isSkeletonVisible = false;
            // console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton {
  position: relative;
  margin: 2em 0;
  padding: 7em 0;
  border-radius: 10px;
  background: rgba(128, 128, 128);
  animation: flicker-light 1s infinite alternate;
}
@keyframes flicker-light {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
