<template>
  <div
    @click="$emit('close-resume-parser-popup')"
    class="py-3 d-flex align-items-center justify-content-center w-100 h-100 resume__parser__background"
  >
    <section
      @click.stop
      class="resume__parser d-flex align-items-center justify-content-center position-relative"
    >
      <!-- animated card  -->
      <b-card v-show="isScanningCard" class="animation__card position-absolute">
        <div>
          <h4 class="animation__title">Screening Resume</h4>
          <div class="position-relative">
            <div class="animation__container">
              <img
                src="@/assets/images/icons/resume-parser/fade_boxes.png"
                class="w-100 animation__container__screen"
              />
            </div>
          </div>
        </div>
      </b-card>
      <!-- json response  -->
      <b-card
        v-if="jsonResponsePopup"
        class="json__response__card position-absolute"
      >
        <div
          @click="$emit('close-resume-parser-popup')"
          class="d-flex position-absolute align-items-center justify-content-center cross__icon cursor-pointer"
          :class="`cross__icon__light`"
        >
          X
        </div>

        <h4 class="json__response__title">Review your Data</h4>
        <div class="json__response__container">
          <pre>
                <vue-json-pretty  :path="'res'" :data="jsonResponse" />
              </pre>
        </div>
        <div
          class="json__response__button d-flex justify-content-between w-100"
        >
          <div
            class="json__response__button__incorrect d-flex align-items-center cursor-pointer"
            @click="wrongResponse()"
          >
            <h5 class="json__response__button__incorrect__text">
              My data isn’t correct
            </h5>
          </div>

          <div
            class="json__response__button__correct d-flex align-items-center cursor-pointer"
            @click="selectFieldToSync()"
          >
            <h5 class="json__response__button__correct__text">
              Continue to sync
            </h5>
          </div>
        </div>
      </b-card>
      <!-- select field to be sync with editor popup -->
      <b-card
        v-show="isSelectFieldCard"
        class="select__file__card position-absolute"
      >
        <div
          @click="$emit('close-resume-parser-popup')"
          class="d-flex position-absolute align-items-center justify-content-center cross__icon cursor-pointer"
          :class="`cross__icon__light`"
        >
          X
        </div>
        <b-row
          class="select__file__card__heading d-flex align-items-center justify-content-between"
        >
          <h4 class="select__file__card__title">
            Select Field you want to sync
          </h4>
          <div class="d-flex align-items-center justify-content-center">
            <h4 class="select__file__card__title">Select All</h4>
            <b-form-checkbox v-model="selectAll" />
          </div>
        </b-row>
        <b-row>
          <b-col
            v-for="(index, v) in selectFields"
            :key="index.key"
            class="px-0"
            md="6"
            cols="12"
          >
            <div
              class="select__file__card__container d-flex align-items-center"
              :class="
                Array.isArray(selectedFields) &&
                selectedFields.includes(index.comparedKey)
                  ? 'select__file__card__container__selected'
                  : ''
              "
            >
              <div class="select__file__card__container__icons">
                <img :src="selectFields[v].src" />
              </div>
              <div
                class="d-flex align-items-center justify-content-between w-100"
              >
                <h5 class="select__file__card__container__title">
                  {{ selectFields[v].title }}
                </h5>
                <b-form-checkbox v-model="selectFields[v].value" />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row
          class="select__file__card__button d-flex align-items-center justify-content-end"
        >
          <div
            class="select__file__card__button__correct d-flex align-items-center cursor-pointer"
            @click="$emit('close-resume-parser-popup'), syncSelectedFieldData()"
          >
            <h4 class="select__file__card__button__text">
              Sync data with editor
            </h4>
          </div>
        </b-row>
      </b-card>
      <!-- wrong response popup -->
      <b-card
        v-show="isWrongJsonPopup"
        class="select__file__card position-absolute"
      >
        <div
          @click="$emit('close-resume-parser-popup')"
          class="d-flex position-absolute align-items-center justify-content-center cross__icon cursor-pointer"
          :class="`cross__icon__light`"
        >
          X
        </div>
        <b-row
          class="select__file__card__heading d-flex align-items-center justify-content-between"
        >
          <h4 class="select__file__card__title">Tell us where we went wrong</h4>
          <div class="d-flex align-items-center justify-content-center">
            <h4 class="select__file__card__title">Select All</h4>
            <b-form-checkbox v-model="selectAll" />
          </div>
        </b-row>
        <b-row>
          <b-col
            v-for="(index, v) in selectFields"
            :key="index.key"
            cols="12"
            md="6"
            class="px-0"
          >
            <div
              class="select__file__card__container d-flex align-items-center"
              :class="
                Array.isArray(selectedFields) &&
                selectedFields.includes(index.comparedKey)
                  ? 'select__file__card__container__selected'
                  : ''
              "
            >
              <div class="select__file__card__container__icons">
                <img :src="selectFields[v].src" />
              </div>
              <div
                class="d-flex align-items-center justify-content-between w-100"
              >
                <h5 class="select__file__card__container__title">
                  {{ selectFields[v].title }}
                </h5>
                <b-form-checkbox v-model="selectFields[v].value" />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row
          class="select__file__card__button d-flex align-items-center justify-content-end pb-0"
        >
          <div
            class="select__file__card__button__correct d-flex align-items-center cursor-pointer"
            @click="$emit('close-resume-parser-popup'), submitFeedback()"
          >
            <h4 class="select__file__card__button__text">Submit feedback</h4>
          </div>
        </b-row>
      </b-card>
    </section>
  </div>
</template>

<script>
import { BRow, BCard, BCol, BFormCheckbox } from "bootstrap-vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import notificationMixin from "@/mixins/notificationMixin.js";
export default {
  name: "ResumeParserModal",
  mixins: [notificationMixin],
  components: {
    BCard,
    BRow,
    BFormCheckbox,
    BCol,
    VueJsonPretty,
  },
  data() {
    return {
      isScanningCard: true,
      jsonResponsePopup: false,
      jsonResponse: {},
      wrongJsonResponse: false,
      isSelectFieldCard: false,
      isWrongJsonPopup: false,
      selectFields: [
        {
          title: "Personal Details",
          value: "False",
          src: require("@/assets/images/icons/about.svg"),
          key: "personal_details",
          comparedKey: "personal_details",
        },
        {
          title: "Skills",
          value: "False",
          src: require("@/assets/images/icons/skills.svg"),
          key: "skills",
          comparedKey: "skills",
        },
        {
          title: "Project",
          value: "False",
          src: require("@/assets/images/icons/projects.svg"),
          key: "projects",
          comparedKey: "projects",
        },
        {
          title: "Education",
          value: "False",
          src: require("@/assets/images/icons/educational-qualifications.svg"),
          key: "educational_details",
          comparedKey: "education_details",
        },
        {
          title: "Experience",
          value: "False",
          src: require("@/assets/images/icons/career-history.svg"),
          key: "work_experience",
          comparedKey: "work_details",
        },
        {
          title: "Languages",
          value: "False",
          src: require("@/assets/images/icons/Languages.svg"),
          key: "languages",
          comparedKey: "languages",
        },
        {
          title: "Certificates",
          value: "False",
          src: require("@/assets/images/icons/Certificates.svg"),
          key: "certificates",
          comparedKey: "certifications",
        },
        {
          title: "Interests",
          value: "False",
          src: require("@/assets/images/icons/Interests.svg"),
          key: "interests",
          comparedKey: "interests",
        },
      ],
      selectedFields: ["predicted_competency", "predicted_characteristics"],
      selectAll: false,
      fName: null,
      fData: new FormData(),
      fPersonalityData: new FormData(),
    };
  },
  computed: {
    currentTheme() {
      return this.$store.state.user.themeType;
    },
    resumeFile() {
      return this.$store.state.resumeParser.resume;
    },
    userData() {
      return this.$store.state.user.user;
    },
  },
  mounted() {
    if (this.resumeFile) {
      this.parseResume();
    }
  },
  watch: {
    selectAll(newVal) {
      let falseVal = [];
      this.selectFields.forEach((field) => {
        if (newVal === true) {
          field.value = true;
        } else {
          if (field.value !== false) {
            falseVal.push(field);
            if (falseVal.length === 8) {
              falseVal.forEach((field) => {
                field.value = false;
              });
            }
          }
        }
      });
    },
    selectFields: {
      handler(newVal) {
        let trueField = [];
        for (let i = 0; i < newVal.length; i++) {
          if (newVal[i].value === true) {
            trueField.push(newVal[i]);
          }
        }
        if (trueField.length === 8) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
        this.selectedFields = trueField;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    parseResume() {
      this.fName = this.resumeFile.name;
      this.fData.set("file", this.resumeFile);
      this.fPersonalityData.append("file", this.resumeFile);
      this.fData.append("mail_invite", "False");
      this.finalResponse = {};

      this.isScanningCard = true;
      this.$store
        .dispatch("resumeParser/parseResume", this.fData)
        .then((res) => {
          this.finalResponse = {
            ...this.finalResponse,
            ...res,
          };
          this.getPersonality();
        })
        .catch(() => {});
    },
    getPersonality() {
      this.$store
        .dispatch("resumeParser/getPersonality", this.fPersonalityData)
        .then((res) => {
          if (res.length) {
            res.forEach((item) => {
              this.finalResponse = { ...this.finalResponse, ...item };
            });

            this.jsonResponse = this.finalResponse;
            this.isScanningCard = false;
            this.jsonResponsePopup = true;
          }
        })
        .catch(() => {});
    },
    wrongResponse() {
      this.jsonResponsePopup = false;
      this.isWrongJsonPopup = true;
    },
    selectFieldToSync() {
      this.jsonResponsePopup = false;
      this.isSelectFieldCard = true;
      const payload = {
        id: this.userData._id,
        updatedDetails: this.finalResponse,
      };
      this.$store
        .dispatch("user/editUserData", payload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    },
    syncSelectedFieldData() {
      let myObj = {};
      for (let i = 0; i < this.selectFields.length; i++) {
        let keyStatus = Object.prototype.hasOwnProperty.call(
          this.jsonResponse,
          this.selectedFields[i]?.comparedKey
        );

        if (keyStatus === true) {
          myObj[this.selectedFields[i]?.comparedKey] =
            this.jsonResponse[this.selectedFields[i]?.comparedKey];
        }
      }
      const payload = {
        id: this.userData._id,
        syncData: myObj,
      };
      this.$store.dispatch("resumeParser/syncEditor", payload).then((res) => {
        if (res) {
          this.$store.commit("resumeParser/SET_IS_PARSED_SUCCESSFUL", true);
          this.isSelectFieldCard = false;
        }
      });
    },
    submitFeedback() {
      let wrongFieldsArr = [];
      for (let i = 0; i < this.selectedFields.length; i++) {
        wrongFieldsArr.push(this.selectedFields[i]?.comparedKey);
      }
      const payload = {
        fileName: this.jsonResponse.resume_file.fileName,
        wrongFields: wrongFieldsArr,
      };
      this.$store
        .dispatch("resumeParser/submitFeedback", payload)
        .then((res) => {
          if (res) {
            this.$store.commit("resumeParser/SET_PARSE_RESUME", "");
            this.isWrongJsonPopup = false;
            let notificationDetail = {
              message: this.messages.submitFeedback.text,
              variant: "success",
            };
            this.showToast(notificationDetail);
          }
        });
    },
  },
  created() {
    this.jsonResponse = "";
    this.selectFields.forEach((e) => {
      this.fData.append(e.key, "True");
    });
    this.fData.append("file", "");
  },
};
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";

.resume__parser {
  width: 35%;
  height: 100%;

  &__background {
    background: #0000006a;
    position: fixed !important;
    backdrop-filter: blur(5px);
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
  }

  .animation {
    &__card {
      width: 80%;
    }

    &__title {
      font-weight: 600;
      text-align: center;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      color: #101828;
    }

    &__container {
      display: block;
      overflow: auto;
      box-sizing: border-box;

      &__screen {
        height: 35em;
      }

      &::after {
        content: "";
        animation: scanline 5s linear infinite;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        border-radius: 1em;
        cursor: text;
        background-image: linear-gradient(
          180deg,
          rgba(173, 255, 226, 0) 0%,
          rgba(173, 255, 226, 0.5) 100%
        );
      }
    }
  }

  @keyframes scanline {
    0%,
    100% {
      background-position: 0 0;
    }

    50% {
      background-position: 0 35em;
    }
  }

  .cross__icon {
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

    &__dark {
      background: #1c1c1e;
    }

    &__light {
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

  .card ::v-deep .card-body {
    width: 100%;
  }

  .json__response {
    &__card {
      width: 95%;
    }

    &__title {
      font-weight: 600;
      text-align: center;
      margin-bottom: 1rem;
      font-size: 1.4rem;
      color: #101828;
    }

    &__container {
      height: 30em !important;
      overflow: scroll;

      pre {
        background-color: #1b1b1b;
        color: #727374;
      }
    }

    &__button {
      padding-top: 1em;

      &__incorrect {
        border-radius: 8px;
        padding: 1em;
        border: 1px solid rgba(179, 186, 196, 0.5);

        &__text {
          color: #101828;
          font-weight: 600;
          margin-bottom: 0;
        }
      }

      &__correct {
        border-radius: 8px;
        padding: 1em;
        background: #00be96;

        &__text {
          margin-bottom: 0;
          font-weight: 600;
          color: #ffffff;
        }
      }
    }
  }

  .select__file__card {
    &__heading {
      padding: 0.5rem;
      padding-right: 0;
    }

    &__title {
      font-weight: 600;
      font-size: 1.4rem;
      margin-bottom: 0;
      color: #101828;
    }

    &__container {
      border: 2px solid #ebedf0;
      border-radius: 5px;
      margin: 0.5em;

      &__selected {
        background: rgba(242, 194, 68, 0.05);
        border-color: #f2c244;
      }

      &__icons {
        margin: 5px;
        width: 35px;
        height: 35px;

        img {
          width: 28px;
          height: 35px;
        }
      }

      &__title {
        font-weight: 600;
        margin-bottom: 0;
        font-size: 1rem;
        color: #101828;
      }
    }

    &__button {
      padding: 0.5rem;

      &__correct {
        border-radius: 8px;
        padding: 1em 2em;
        background: #00be96;
      }

      &__deactivate {
        opacity: 0.5;
        cursor: not-allowed !important;
      }

      &__text {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 0;
        color: #ffffff;
      }
    }
  }
}

.custom-checkbox.custom-control {
  margin-left: 0.5em;
}

@media (min-width: 1025px) and (max-width: 1280px) {
  .resume__parser {
    width: 40%;

    .animation {
      &__container {
        &__screen {
          height: 30em;
        }
      }
    }

    .select__file__card {
      &-heading {
        padding: 0.5em 0;
      }

      &__title {
        font-size: 1.2rem;
      }

      &__container {
        margin: 0.2em;

        &__title {
          font-size: 0.85rem;
        }
      }

      &__button {
        padding-right: 0;
      }
    }
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .resume__parser {
    width: 60%;

    .select__file__card {
      &-heading {
        padding: 0.5em 0;
      }

      &__title {
        font-size: 1.2rem;
      }

      &__container {
        margin: 0.2em;

        &__title {
          font-size: 0.85rem;
        }
      }

      &__button {
        padding-right: 0;
      }
    }
  }
}

@media (min-width: 481px) and (max-width: 767px) {
  .resume__parser {
    width: 80%;

    .animation {
      &__container {
        &__screen {
          height: 25em;
        }
      }
    }

    .json__response {
      &__button {
        &__incorrect {
          margin-right: 2em;

          &__text {
            font-size: 0.9em;
          }
        }

        &__correct {
          margin-left: 2em;

          &__text {
            font-size: 0.9em;
          }
        }
      }
    }

    .select__file__card {
      &__heading {
        padding: 1rem 0;
      }

      &__title {
        font-size: 1.1rem;
      }

      &__container {
        margin: 0.2em 0;

        &__title {
          font-size: 0.75em;
        }
      }

      &__button {
        padding-right: 0;
      }
    }
  }
}

@media (max-width: 480px) {
  .resume__parser {
    width: 90%;

    .json__response {
      &__button {
        &__incorrect {
          margin-right: 0.2em;

          &__text {
            font-size: 0.8em;
          }
        }

        &__correct {
          margin-left: 0.2em;

          &__text {
            font-size: 0.8em;
          }
        }
      }
    }

    .select__file__card {
      &__heading {
        padding: 0.5rem 0;
      }

      &__title {
        font-size: 0.9rem;
        font-weight: 900;
      }

      &__container {
        margin: 0.2em 0;

        &__title {
          font-size: 0.75em;
        }
      }

      &__button {
        padding-right: 0;

        &__text {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
