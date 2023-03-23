<template>
  <div class="p-2 d-flex account-container justify-content-between">
    <div class="left-container">
      <b-col class="p-0 m-0">
        <b-card class="py-0">
          <div>
            <img
              class="account__type__container__logo md:w-4/5"
              :src="
                theme === 'dark'
                  ? require('@/assets/images/dark/logo/Getboarded_Logo.png')
                  : require('@/assets/images/light/logo/Getboarded_Logo.png')
              "
              alt="Banked"
            />
          </div>

          <div class="account__type__container__content">
            <h3 class="text-black font-bold text-4xl">
              Lastly, enter basic details and claim your profile.
            </h3>
            <p class="my-2 text-lg font-medium">
              Join hundreds of other teams, communities and causes.
            </p>
          </div>

          <img
            class="rocket__img"
            src="@/assets/images/pages/account-type/user-profile.svg"
            alt=""
          />
        </b-card>
      </b-col>
    </div>

    <b-card class="content__detail p-2 position-relative m-0">
      <ConnectWalletButton class="wallet__btn" />
      <resume-parser v-if="pageName === 'parse-resume'" />
      <user-details v-if="pageName === 'user-details'" />

      <b-button
        type="submit"
        block
        variant="primary"
        @click="showWallets"
        color="#f2c046"
        class="claim-profile"
      >
        Claim Profile
      </b-button>
    </b-card>
  </div>
</template>

<script>
import { BCol, BCard, BButton } from "bootstrap-vue";
import personal from "@/assets/images/pages/account-type/personal.png";
import organization from "@/assets/images/pages/account-type/organization.png";
import ConnectWalletButton from "@/components/ConnectWalletBtn.vue";
import ResumeParser from "@/components/UserFlow/ResumeParser.vue";
import UserDetails from "@/components/UserFlow/UserDetails.vue";

export default {
  name: "UserProfile",
  components: {
    ConnectWalletButton,
    ResumeParser,
    UserDetails,
    // BRow,
    BCol,
    BCard,
    BButton,
  },
  data() {
    return {
      accontTypes: [
        {
          routeTo: "/user/yield-farm",
          type: "personal",
          about: "I want to create a personal profile",
          imgSrc: personal,
        },
        {
          routeTo: "/organization/name",
          type: "organization",
          about: "I want to create an Organization",
          imgSrc: organization,
        },
      ],
      theme: "light",
      pageName: "",
    };
  },
  watch: {
    $route: {
      handler(newVal) {
        this.pageName = newVal.name;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.pageName = this.$route.name;
  },
};
</script>

<style lang="scss" scoped>
.claim-profile {
  background: linear-gradient(90deg, #f8be17 0%, #ffce42 101.56%) !important;
  width: 17.5%;
  color: #000;
  padding: 0.5em 0.75em;
  font-size: 1.25em;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  right: 0;
  position: absolute;
  bottom: 0em;
}
.account-container {
  height: 100vh;
}
.account__type {
  &__container {
    &__content {
      margin-top: 3.25em;
    }
  }
}
.row,
.col,
.col-md-6 {
  margin: 0;
  padding: 0;
}

.card ::v-deep .card-body {
  width: 100%;
}

.font {
  &-semibold {
    font-weight: 600;
    color: #000;
  }
  &-bold {
    font-weight: 700;
  }
}
.capitalize {
  text-transform: capitalize;
}

.left-container {
  width: 25%;
}
.text {
  &-4xl {
    font-size: 2.25em;
  }
  &-lg {
    font-size: 1.25em;
  }
  &-black {
    color: #000;
  }
}

.content__detail {
  background: #ffffff;
  width: 72.5%;
  h2 {
    width: 70%;
  }
  &__box {
    margin-top: 2em;
    width: 50%;
    background-color: #fff;
    box-shadow: 0px 6px 24px rgba(67, 21, 21, 0.05);
    width: 80%;
    &:hover {
      border-radius: 10px;
      border: 2px solid #f7dd59;
      transform: scale(1.05);
      transition: transform 0.5s;
    }
    &__account__img {
      box-shadow: 0px 20px 20px rgba(241, 172, 61, 0.2);
    }
  }
}
.rocket__img {
  //   margin: -2.5em;
  //   width: 25rem;
  //   border-radius: 16px;
}

.wallet__btn {
  position: absolute;
  right: 0;
  top: 0;
}

@media only screen and (max-width: 991px) {
  .content__detail {
    padding: 2.5rem;
    &__box {
      width: 80%;
    }
  }
}
</style>

<style scoped>
.b-col >>> .b-card--content {
  padding: 2em !important;
  overflow: hidden;
}
</style>
