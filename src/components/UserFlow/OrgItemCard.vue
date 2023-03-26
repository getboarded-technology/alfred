<template>
  <div class="task-card">
    <div class="task-card-top-section">
      <div class="task-card-top-section-img" v-if="feed.xp">
        <img
          src="@/assets/images/company/eth.png"
          style="width: 100%; height: 100%; object-fit: cover"
        />
      </div>
      <div class="task-card-top-section-img" v-else>
        <img
          :src="feed.sourceLogoUrl"
          style="width: 100%; height: 100%; object-fit: cover"
        />
      </div>
      <h2 class="task-card-top-section-heading" v-if="feed.xp">
        Assigned By ETHGlobal
      </h2>
      <h2 class="task-card-top-section-heading" v-else>
        {{ feed.task.source }}
      </h2>
      <h2 class="task-card-top-section-daily" ref="xp" v-if="feed.xp">
        {{ feed.xp }} XP's
      </h2>
      <h2 class="task-card-top-section-daily" ref="xp" v-else>15 XP's</h2>
      <!-- <h2 class="task-card-top-section-date">4 days ago</h2> -->
    </div>

    <div class="task-card-display-picture">
      <img
        @error="randomFeedImage"
        :src="feed.task.imageUrl"
        style="width: 100%; height: 100%; object-fit: cover"
        alt="task1"
      />
    </div>
    <div class="task-card-content">
      <h3 class="task-card-content-heading">
        {{ feed.task.title }}
      </h3>
      <h4 class="task-card-content-description">
        {{ feed.task.description }}
      </h4>
    </div>
    <div class="task-card-activity">
      <div class="task-card-hashTag-cont">
        <h5 class="task-card-hashTag-heading">Being Focus</h5>
        <div
          v-for="(value, index) in ['Productivity', 'Mindfullness', 'Business']"
          :key="index"
          class="task-card-hashTag"
        >
          <h5 class="task-card-hashTag-text">#{{ value }}</h5>
        </div>
      </div>
      <div>
        <div class="task-card-mark">
          <div
            v-for="(value, i) in ['Do', 'Doing', 'Done']"
            :key="i"
            :class="
              taskStatus.toLowerCase() === value.toLowerCase()
                ? 'task-card-mark-text active'
                : 'task-card-mark-text'
            "
            @click="updateStatus(feed, value)"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </div>

    <!-- chatbot modal  -->
    <verify-modal v-if="verifyPopup" class="position-absolute" :selectedItem="selectedItem"/>
  </div>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import VerifyModal from "@/modals/VerifyModal.vue";
// this.$toast({
//   component: ToastificationContent,
//   props: {
//     title: "OTP Validated!",
//     icon: "BellIcon",
//     variant: "success",
//   },
// });
export default {
  name: "TaskCard",
  data() {
    return {
      taskStatus: "do",
      selectedItem: {},
    };
  },
  components: {
    VerifyModal,
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
    verifyPopup() {
      return this.$store.state.modals.verifyPopup;
    },
  },
  props: {
    feed: {
      required: true,
      type: Object,
    },
  },
  watch: {
    feed: {
      handler(newVal) {
        this.taskStatus = newVal.status ? newVal.status : "do";
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateStatus(feed, value) {
      this.taskStatus = value.toLowerCase();
      this.status = feed.status;

      const payload = {
        type: feed.type,
        getboardedId: "625ef69e86d2e700203ab6b2",
        itemId: feed.itemId,
        status: feed.status,
      };

      this.$store
        .dispatch("feed/updateCourseStatus", payload)
        .then((res) => {
          console.log(res);

          if (this.taskStatus === "notInterested") {
            this.queries = !this.queries;
            this.$emit("recommendation", feed.itemId);
          } else if (
            this.taskStatus === "doing" ||
            this.taskStatus === "done"
          ) {
            if (this.taskStatus === "doing") {
              this.$store.commit("feed/ADD_DOING_ITEMS", feed.item);
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "Notification",
                  text: "You have marked this item in your 'doing' activity queue. Make sure to mark it 'done' when you are finished with it.",
                  icon: "BellIcon",
                  variant: "success",
                },
              });
            }
            if (this.taskStatus === "done") {
              this.selectedItem = feed;
              //   const payload = {
              //     id: this.userData._id,
              //     updatedDetails: { xp: this.userData.xp + 15 },
              //   };
              //   this.$store
              //     .dispatch("user/editUserData", payload)
              //     .then((res) => {
              //       console.log(res);
              //     })
              //     .catch(() => {
              //       return;
              //     });

              this.$toast({
                component: ToastificationContent,
                props: {
                  title: "Notification",
                  text: "This item is marked 'done'. Learning is it's own reward...yet, we are working on topping it up with validations and XPs. This transaction may have an applicable claim later.",
                  icon: "BellIcon",
                  variant: "success",
                },
              });
              this.$store.commit("modals/OPEN_VERIFY_BOT_POPUP", true);
            }
            // this.queries = !this.queries;
            this.$emit("recommendation", feed.itemId, true);
          } else if (this.taskStatus === "do") {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: "Notification",
                text: "You have marked your item back to 'do'. Would you like to drop a feedback? This may help us give better recommendations.",
                icon: "BellIcon",
                variant: "success",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.disableLink = false;
        });
    },
    generateRandomXp(min, max) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      const roundedNumber = Math.floor(randomNumber / 10) * 10;
      if (roundedNumber < min) {
        return min;
      } else if (roundedNumber > max) {
        return max;
      } else {
        return roundedNumber;
      }
    },
    randomFeedImage(e) {
      let i = 15; // i = number of given random images
      return (e.target.src = require(`@/assets/images/user-dashboard/blank-feed/${[
        Math.floor(Math.random() * i),
      ]}.png`));
    },
  },
};
</script>
