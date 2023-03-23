<template>
  <div
    :style="{
      background: `url(${require(`@/assets/images/organization/default/bg.png`)})`,
    }"
    class="landing__container d-flex flex-column align-items-center justify-content-between py-5"
  >
    <!-- Org logo  -->
    <a
      href="http://getboarded.com/"
      class="logo d-flex align-items-center justify-content-center"
    >
      <img
        class="w-100"
        :src="require(`@/assets/images/organization/default/logo.png`)"
        alt="Ale"
      />
    </a>

    <div
      class="landing__container__text d-flex flex-column align-items-center justify-content-center"
    >
      <h2 class="landing__container__text--main-heading">Coming Soon</h2>
      <h4
        class="landing__container__text--sub-heading mt-2 mt-md-3 text-center"
      >
        This page is reserved for Alex app, it will be live in a few days.
      </h4>
    </div>

    <div class="social__icons d-flex align-items-center justify-content-center">
      <a href="https://www.instagram.com/getboarded/" target="_blank">
        <img
          class="icon mx-2 cursor-pointer"
          src="@/assets/images/landing/insta.svg"
          alt="Instagram"
      /></a>
      <a href="https://twitter.com/gtbrdd" target="_blank">
        <img
          class="icon cursor-pointer"
          src="@/assets/images/landing/twitter.svg"
          alt="Twitter"
      /></a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Landing",
};
</script>
<style lang="scss" scoped>

@mixin transparent-text {
  background-image: -webkit-linear-gradient(0deg, #f7f7f793 10%, #fff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}

.landing {
  &__container {
    background-size: cover !important;
    background-repeat: no-repeat !important;
    height: 100vh;
    &__text {
      font-family: "Inter", sans-serif;
      &--main-heading {
        font-size: 8.5em;
        font-weight: 900;
        @include transparent-text;
      }
      &--sub-heading {
        width: 75%;
        font-size: 2.25em;
        font-weight: 500;
        @include transparent-text;
      }
    }

    .logo {
      width: 5%;
    }

    .social__icons {
      .icon {
        width: 3.5em;
        height: 3.5em;
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .landing {
    &__container {
      &__text {
        &--main-heading {
          font-size: 3.5em;
        }
        &--sub-heading {
          font-size: 2em;
        }
      }

      .logo {
        width: 10%;
      }
    }
  }
}

@media only screen and (max-width: 660px) {
  .landing {
    &__container {
      &__text {
        &--main-heading {
          text-align: center;
        }
        &--sub-heading {
          font-size: 1.75em;
          width: 95%;
        }
      }

      .logo {
        width: 15%;
      }
    }
  }
}
</style>
