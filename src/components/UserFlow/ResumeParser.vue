<template>
  <div>
    <div class="text__container">
      <div class="text-1">
        Upload your resume and identify what personality it shows...
      </div>
      <div class="text-2">
        Check what you are showing to the world. A clever AI algorithm reads the
        behaviours shown in your resume and on research-based competency model
        presents you the personality trait that your resume mirrors.
      </div>
    </div>

    <!-- Resume Parser  -->
    <div class="parser__container common__container__shadow">
      <div class="parser__container__parsed" v-if="isParsedSuccessful">
        <div class="flex-column d-flex align-items-center">
          <img
            class="parser__container__parsed__resume-img"
            :src="require(`@/assets/images/parser/file-text.svg`)"
            alt="file-icon"
          />
          <div class="d-flex align-items-center">
            <p class="parser__container__parsed__subheading m-0">
              Resume parsed successfully !
            </p>
            <div
              class="parser__container__parsed__cross d-flex align-items-center justify-content-center cursor-pointer"
              @click="removeResume"
            >
              <img
                class="parser__container__parsed__cross__icon"
                :src="require(`@/assets/images/parser/cross.svg`)"
                alt="cross-icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="parser__container__content" v-else>
        <div class="flex-column d-flex align-items-center">
          <img
            class="parser__container__content-resume-img"
            :src="require(`@/assets/images/parser/parser.svg`)"
            alt=""
          />
          <div class="ml-lg-2">
            <h3 class="parser__container__content__subheading">
              Select resume to
              <span>upload</span>
            </h3>
            <div class="parser__container__content__subheading--2">
              Or drag and drop, pdf or docx file
            </div>
          </div>
        </div>
        <input
          type="file"
          name="resume"
          accept=".doc,.docx,.pdf"
          id="file"
          ref="file"
          class="h-100 w-100"
          @change="selectFieldPopup()"
          @drag="selectFieldPopup()"
          @drop="selectFieldPopup()"
        />
      </div>
    </div>
    <div
      class="d-flex align-items-center justify-content-center"
      @click="$router.push('/user-profile/details')"
    >
      <div class="skip">Skip, I will start fresh</div>
    </div>
    <resume-parser-modal
      @close-resume-parser-popup="resumeParserPopup = !resumeParserPopup"
      v-if="resumeParserPopup"
      class="position-absolute resume-parser"
    />
  </div>
</template>

<script>
import ResumeParserModal from "@/modals/ResumeParserModal.vue";
export default {
  components: {
    ResumeParserModal,
  },
  data() {
    return {
      editorPopup: false,
      resumeParserPopup: false,
      isParsedSuccessful: false,
    };
  },

  methods: {
    selectFieldPopup() {
      let file = this.$refs.file.files[0];
      if (file.size <= 5242880) {
        this.$store.commit("resumeParser/SET_PARSE_RESUME", file);
        this.resumeParserPopup = true;
      } else {
        let notificationDetail = {
          message: this.messages.resumeParser.text,
          variant: "danger",
        };
        this.showToast(notificationDetail);
        this.$refs.file.value = null;
      }
    },
    removeResume() {
      this.$store.commit("resumeParser/SET_IS_PARSED_SUCCESSFUL", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.text__container {
  .text {
    &-1 {
      font-size: 1.75em;
      color: #000000;
      font-weight: 600;
    }
    &-2 {
      font-size: 1.35em;
    }
  }
}
.parser {
  &__container {
    margin-top: 2.5em;
    background: #fdf9f2;
    border-radius: 0.5em;
    padding: 3em;
    &__parsed {
      border: 2px solid #00be96;
      border-radius: 6px;
      padding: 2em 4em;
      &__subheading {
        color: #101828;
        font-weight: 600;
        font-size: 1.75em;
      }
      &__cross {
        background: #f2c046;
        position: relative;
        margin-left: 1em;
        padding: 1em;
        border-radius: 50%;
        width: 3.5em;
        height: 3.5em;
        &__icon {
          position: absolute;
        }
      }
    }
    &__content {
      border: 2px dashed #f2c046;
      border-radius: 0.5em;
      padding: 3.5em 2em;
      position: relative;
      cursor: pointer;
      input[type="file"] {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
      }
      &__subheading {
        color: #101828;
        font-weight: 600;
        font-size: 1.75em;
        span {
          color: #f2c046;
          text-decoration: underline;
        }
        &--2 {
          font-size: 1.25em;
          color: #667085;
        }
      }
    }
  }
}
.skip {
  padding: 0.5em 0.75em;
  margin-top: 1.25em;
  border: 2px solid #d0d5dd;
  color: #667085;
  font-size: 1.25em;
  border-radius: 5px;
  cursor: pointer;
}
</style>
