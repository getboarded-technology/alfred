<template>
  <div class="p-2 d-flex account-container">
    <div class="w-1/4">
      <b-col class="p-0">
        <b-card>
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
              Alfred<br />
              to the future way of work!
            </h3>
            <p class="my-4 text-lg font-medium">
              Create communities, causes and other opportunities.
            </p>
          </div>

          <img
            class="rocket__img"
            src="@/assets/images/pages/account-type/rocket.svg"
            alt=""
          />
        </b-card>
      </b-col>
    </div>

    <div class="content__detail">
      <h2 class="font-semibold">
        How would you like to primarily use the platform?
      </h2>
      <div
        v-for="(accontType, index) in accontTypes"
        class="content__detail__box py-2 px-1"
        @click="setFlow(accontType)"
        :key="index"
      >
        <div class="d-flex align-items-center">
          <div class="content__detail__box__account__img">
            <img :src="accontType.imgSrc" alt="" />
          </div>

          <div class="mx-1">
            <h3 class="font-semibold capitalize">{{ accontType.type }}</h3>
            <p class="my-50 font-medium" style="color: #798ba0">
              {{ accontType.about }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <ConnectWalletButton class="wallet__btn" />
  </div>
</template>

<script>
import { BCol, BCard } from "bootstrap-vue";
import personal from "@/assets/images/pages/account-type/personal.png";
import organization from "@/assets/images/pages/account-type/organization.png";
import ConnectWalletButton from "@/components/ConnectWalletBtn.vue";

export default {
  name: "AccountType",
  components: {
    ConnectWalletButton,
    BCol,
    BCard,
  },
  data() {
    return {
      accontTypes: [
        {
          routeTo: "/user-profile/parse-resume",
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
    };
  },
  computed: {
    userData() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    setFlow(data) {
      const payload = {
        id: this.userData._id,
        updatedDetails: { accountType: data.type },
      };
      this.$router.push(data.routeTo);
      this.$store
        .dispatch("user/editUserData", payload)
        .then((res) => {
          console.log(res);
          this.$router.push(data.routeTo);
        })
        .catch(() => {
          return;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.account-container {
  height: 100vh;
}
.account__type {
  &__container {
    &__content {
      margin-top: 5em;
    }
  }
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

.font {
  &-semibold {
    font-weight: 600;
    color: #000;
  }
  &-bold {
    font-weight: 700;
  }
}

.font-semibold {
  font-weight: 600;
  color: #000;
}
.capitalize {
  text-transform: capitalize;
}
.content__detail {
  padding: 5rem;
  margin-top: 6%;
  h2 {
    width: 75%;
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
  margin: -2.5em;
  width: 25rem;
  border-radius: 16px;
}

.wallet__btn {
  position: absolute;
  right: 2em;
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
