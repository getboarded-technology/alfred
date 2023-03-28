<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-row class="pr-1">
          <div class="heading-1 heading-black">Organization Information</div>
          <div class="heading-2 heading-gray mt-50">
            Enter the basic information below to create your organization. You
            can change it anytime you want.
          </div>
        </b-row>
        <b-row class="flex-column mt-1 pr-1">
          <div class="subheading">Organization name</div>
          <input type="email" value="email" v-model="orgData.name" />
        </b-row> </b-col
      ><b-col></b-col>
    </b-row>

    <b-row class="justify-content-between">
      <b-col md="6" class="">
        <b-row class="flex-column mt-1 pr-1">
          <div class="subheading">Organization Website</div>
          <input type="text" value="website" v-model="orgData.website" />
        </b-row>
      </b-col>
      <b-col md="6" class="pl-1">
        <b-row class="flex-column mt-1 pl-1">
          <div class="subheading">Organization Email</div>
          <input type="text" value="name" v-model="orgData.email" />
        </b-row>
      </b-col>
    </b-row>

    <b-row class="justify-content-between">
      <b-col md="6" class="">
        <b-row class="flex-column mt-1 pr-1">
          <div class="subheading">About Organization</div>
          <textarea
            type="text"
            class="about"
            value="about"
            v-model="orgData.about"
          />
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";
// import { BRow, BCol, BFormGroup, BFormRadioGroup } from "bootstrap-vue";
// import moment from "moment";

export default {
  name: "UserDetails",
  data() {
    return {
      selected: "",
      options: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
        { text: "Others", value: "others" },
        { text: "Prefer not to say", value: "third" },
      ],
    };
  },
  components: {
    BRow,
    BCol,
    // BFormGroup,
    // BFormRadioGroup,
  },
  computed: {
    orgData() {
      return this.$store.state.org.org;
    },
  },
  watch: {
    orgData: {
      handler(newVal) {
        console.log(newVal);
        let { website, name, about, email } = newVal;
        this.$store.commit("org/SET_ORG_DETAILS", {
          orgDetails: newVal,
        });
        if (!(website && name && about && email)) {
          return;
        }
        this.$emit("claimProfile", true);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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

input,
textarea {
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

.about {
  height: 7em;
}

.subheading {
  color: #344054;
  font-size: 1.5em;
}
</style>
