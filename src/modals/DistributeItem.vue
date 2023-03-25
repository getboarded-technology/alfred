<template>
  <div
    @click="$store.commit('modals/OPEN_DISTRIBUTE_LIBRARY_POPUP', false)"
    class="py-2 md-pd d-flex align-items-center w-100 h-100 justify-content-center distributed-item__background"
  >
    <section
      @click.stop
      class="w-60 p-2 distributed-item position-relative"
      :class="`light-theme`"
    >
      <div
        @click="$store.commit('modals/OPEN_DISTRIBUTE_LIBRARY_POPUP', false)"
        class="d-flex position-absolute align-items-center justify-content-center cross-icon cursor-pointer"
        :class="`cross-icon-light`"
      >
        X
      </div>
      <label class="Heading">Create a Learning Assignment </label>
      <div>
        <b-col>
          <b-row class="flex-column mt-1">
            <div class="subheading">Candidate</div>
            <div>
              <multiselect
                v-model="selectedUsers"
                placeholder="Select User"
                label="userId"
                track-by="userId"
                :options="options"
                :multiple="true"
                :option-height="10"
                :custom-label="customLabel"
                :show-labels="false"
              >
                <template slot="singleLabel" slot-scope="props"
                  ><img
                    class="option__image"
                    :src="props.option.img"
                    alt=""
                  /><span class="option__desc"
                    ><span class="option__title">{{
                      props.option.title
                    }}</span></span
                  ></template
                >
                <template slot="option" slot-scope="props"
                  ><b-row class="align-items-center"
                    ><img
                      class="option__image"
                      :src="`https://source.boringavatars.com/beam/100/${avatarNameGenerator()}`"
                      alt=""
                    />
                    <div class="option__desc">
                      <span class="option__title">{{
                        props.option.firstName
                      }}</span
                      ><span class="option__small">{{
                        props.option.lastName
                      }}</span>
                    </div>
                  </b-row>
                </template>
              </multiselect>
            </div>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="flex-column mt-1">
            <div class="subheading">Assign XPs</div>
            <input type="text" value="name" v-model="details.xp" />
          </b-row>
        </b-col>
        <b-col>
          <b-row class="flex-column mt-1">
            <div class="subheading">Validation Link</div>
            <input
              type="text"
              value="name"
              v-model="details.externalValidationLink"
            />
          </b-row>
        </b-col>
        <b-button
          type="submit"
          block
          variant="primary"
          @click="assignItem"
          color="#f2c046"
          class="distribute-btn mt-1"
        >
          Assign Item
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
import { BRow, BCol, BButton } from "bootstrap-vue";
import Multiselect from "vue-multiselect";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  name: "DistributedItemModal",
  data() {
    return {
      details: {},
      value: [],
      options: [],
      selectedUsers: [],
    };
  },
  components: {
    BRow,
    BCol,
    BButton,
    Multiselect,
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
    selectedItem() {
      return this.$store.state.library.selectedItem;
    },
    avatarNameGenerator() {
      return this.$store.state.user.avatarNameGenerator;
    },
  },
  methods: {
    assignItem() {
      for (let i = 0; i < this.selectedUsers.length; i++) {
        const payload = {
          ...this.details,
          ...{ userId: this.selectedUsers[i].userId },
          ...{ task: this.selectedItem },
          ...{ taskId: this.selectedItem.itemId },
          ...{ organizationId: "641ed84742fe9010218b5293" },
        };
        this.$store.dispatch("user/assignTask", payload).then((res) => {
          this.options = res.data.users;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Task assigned successfully.",
              icon: "BellIcon",
              variant: "success",
            },
          });
          this.$store.commit("modals/OPEN_DISTRIBUTE_LIBRARY_POPUP", false);
        });
      }
    },
    customLabel({ firstName, lastName }) {
      return `${firstName} – ${lastName}`;
    },
    getOrgUsers() {
      this.$store.dispatch("user/getOrgData").then((res) => {
        this.options = res.data.users;
      });
    },
  },
  mounted() {
    this.getOrgUsers();
  },
};
</script>
<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";
.option__image {
  width: 10%;
}
.light-theme {
  background: #fff;

  .text {
    color: #1c1c1e;
  }
}
.distribute-btn {
  width: 35%;
  float: right;
}
.heading {
  &-black {
    color: #000;
  }

  &-gray {
    color: #667085;
  }

  &-1 {
    font-size: 1.75em;
    font-weight: 600;
  }

  &-2 {
    font-size: 1.25em;
  }
}

.form-group ::v-deep .custom-control-label {
  font-size: 1.25rem;
}

input {
  border: none;
  background: #ece9e9;
  padding: 0.5em 0.75em;
  font-size: 1.25em;
  border-radius: 8px;

  &:focus {
    border: none;
    outline: none;
  }
}

.subheading {
  color: #000;
  font-size: 1.25em;
  font-weight: 500;
}

.Heading {
  font-size: 1.75em;
  color: #000000;
  font-weight: 600;
}

.cross-icon {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  top: 0;
  font-size: 1.5em;
  padding: 0.5em;
  border-radius: 50%;
  height: 2em;
  width: 2em;
  top: -0.5em;
  right: -0.5em;
  transition: all 0.23s ease 0.1s;
  transform: translate(8px, -2px);
  font-family: "Montserrat", Helvetica, Arial, serif;

  &-light {
    background: #fffffffa;
  }
  // For hover effect of close btn
  &:hover,
  &:focus,
  &:active {
    opacity: 1;
    outline: none;
    transform: translate(5px, 3px);
    box-shadow: none;
  }
}

.distributed-item {
  width: auto;
  border-radius: 10px;

  &__background {
    background: #0000006a;
    backdrop-filter: blur(5px);
    position: fixed !important;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
  }

  &__heading {
    &--1 {
      font-size: 1.75em;
    }
  }
}

@media only screen and (max-width: 991px) {
  .md-pd {
    padding: 1.5em !important;
  }
}

@media only screen and (max-width: 660px) {
  .distributed-item {
    &__heading {
      &--1 {
        font-size: 1.5em;
      }
    }
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
