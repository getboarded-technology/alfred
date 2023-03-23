<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-row class="pr-1">
          <div class="heading-1 heading-black">Basic Information</div>
          <div class="heading-2 heading-gray mt-50">
            Enter the information below to claim your profile. You can change it
            anytime you want.
          </div>
        </b-row>
        <b-row class="flex-column mt-1 pr-1">
          <div class="subheading">Email</div>
          <input type="text" value="email" v-model="userData.email" />
        </b-row> </b-col
      ><b-col></b-col>
    </b-row>

    <b-row class="justify-content-between">
      <b-col md="6" class="">
        <b-row class="flex-column mt-1 pr-1">
          <div class="subheading">Date of Birth</div>
          <input
            type="date"
            placeholder="01-01-2000"
            value="dob"
            v-model="userData.dob"
            :max="maxDate"
          />
        </b-row>
      </b-col>
      <b-col md="6" class="pl-1">
        <b-row class="flex-column mt-1 pl-1">
          <div class="subheading">First name</div>
          <input type="text" value="name" v-model="userData.firstName" />
        </b-row>
      </b-col>
    </b-row>

    <b-row class="justify-content-between">
      <b-col md="6" class="">
        <b-row class="flex-column mt-1 pr-1 h-100">
          <div class="subheading">Career Objective</div>
          <input
            type="text"
            class="h-75"
            value="career-objective"
            v-model="userData.CareerObjective"
          />
        </b-row>
      </b-col>
      <b-col md="6" class="pl-1">
        <b-row class="flex-column mt-1 pl-1">
          <div class="subheading">Last name</div>
          <input type="text" value="last-name" v-model="userData.lastName" />
        </b-row>

        <b-row class="flex-column mt-1 pl-1">
          <div class="subheading">Sex</div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              v-model="userData.gender"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radio-inline"
            ></b-form-radio-group>
          </b-form-group>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="justify-content-between">
      <b-col md="6" class="">
        <b-row class="flex-column mt-1 pr-1">
          <div class="subheading">About</div>
          <input
            type="text"
            class="about"
            value="last-name"
            v-model="userData.about"
          />
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol, BFormGroup, BFormRadioGroup } from "bootstrap-vue";
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
      userData: {},
      maxDate: "",
    };
  },
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormRadioGroup,
  },
  watch: {
    userData: {
      handler(newVal) {
        console.log(newVal);
      },
      deep: true,
    },
  },
  methods: {
    getTodayDate() {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return (this.maxDate = [year, month, day].join("-"));
    },
  },
  mounted() {
    this.getTodayDate();
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

textarea,
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

.about {
  height: 7em;
}

.subheading {
  color: #344054;
  font-size: 1.5em;
}
</style>
