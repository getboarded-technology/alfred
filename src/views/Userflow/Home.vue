<template>
  <div class="home">
    <ProfileEdit v-if="isFirstTime" @close="closeFirstTimeModal()" />
    <div class="home-section1">
      <div id="scrollDiv" class="home-company-cont">
        <SmallCard
          :image="require('@/assets/images/company/WellsFargo.png')"
          title="Wells Fargo"
          website="wellsgo.co.in"
        />
        <SmallCard
          :image="require('@/assets/images/company/Crowdblossom.png')"
          title="Crowdblossom"
          website="blossom.org"
        />
        <SmallCard
          :image="require('@/assets/images/company/Cocacola.png')"
          title="Coca Cola"
          website="cocacola.com"
        />
        <SmallCard
          :image="require('@/assets/images/company/Cocacola.png')"
          title="Coca Cola"
          website="cocacola.com"
        />
        <SmallCard
          :image="require('@/assets/images/company/Cocacola.png')"
          title="Coca Cola"
          website="cocacola.com"
        />
        <div class="home-arrow-right" @click="onClickScrollDiv()">
          <feather-icon icon="ChevronRightIcon" class="home-arrow-right-icon" />
        </div>
      </div>

      <div class="home-heading-cont">
        <h1 class="home-heading">Development Charter</h1>
        <div class="home-drop">
          <b-form-select
            id="select"
            v-model="selected"
            :options="options"
            class="rounded-pill"
          />
        </div>
      </div>
      <TaskCard />
      <TaskCard />
      <TaskCard />
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
      selected: "Sort By",
      options: [
        { value: "Sort By", text: "Sort By" },
        { value: "A", text: "Option A" },
        { value: "B", text: "Option B" },
        { value: "C", text: "Option C" },
      ],
    };
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
      const scrollDiv = document.getElementById("scrollDiv");
      scrollDiv.scrollTo({
        left: scrollDiv.scrollLeft + 200,
        behavior: "smooth",
      });
    },
  },
};
</script>
