<template>
  <div
    @click="$store.commit('modals/OPEN_ADD_SKILL_POPUP', false)"
    class="py-2 md-pd d-flex align-items-center w-100 h-100 justify-content-center editor__background"
  >
    <section
      @click.stop
      class="w-60 p-2 editor position-relative"
      :class="`light-theme`"
    >
      <div
        @click="$store.commit('modals/OPEN_ADD_SKILL_POPUP', false)"
        class="d-flex position-absolute align-items-center justify-content-center cross-icon cursor-pointer"
        :class="`cross-icon-light`"
      >
        X
      </div>

      <div>
        <label class="Heading">Tagging</label>
        <multiselect
          v-model="value"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name"
          track-by="code"
          :options="options"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
        ></multiselect>
      </div>
    </section>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import allSkills from "@/assets/data/all-skills";
export default {
  name: "EndorsementModal",
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: [],
    };
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal.length > 0) {
          let skills = newVal;
          const payload = {
            updatedDetails: {
              skills: skills,
            },
            id: this.userData._id,
          };
          this.$store
            .dispatch("user/editUserData", payload)
            .then(() => {
              this.$store.commit("user/UPDATE_SKILL_SET", skills);
            })
            .catch(() => {
              return;
            });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    addTag(newTag) {
      console.log("n", newTag);
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
  },
  mounted() {
    console.log(this.userData.skills);
    this.value = this.userData.skills;
    for (let i = 0; i < allSkills.length; i++) {
      let newSkill = {
        name: allSkills[i],
        code: allSkills[i],
        level: 5,
      };
      this.options.push(newSkill);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";

.light-theme {
  background: #fff;

  .text {
    color: #1c1c1e;
  }
}
.Heading {
  font-size: 2em;
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

.editor {
  width: 50%;
  height: 70%;
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
  .editor {
    &__heading {
      &--1 {
        font-size: 1.5em;
      }
    }
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
