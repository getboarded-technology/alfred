<template>
  <div
    class="error__page d-flex flex-column align-items-center justify-content-center"
  >
    <img class="error__page-img" src="@/assets/images/error-404.svg" alt="Error Lochness" />
    <h3 class="my-2 error__page-text text-white">Oops it seems you follow backlink</h3>
    <a href="/" class="error__page__back-btn cursor-pointer">Back to home</a>
  </div>
</template>

<style lang="scss" scoped>
.error__page {
  height: 100vh;
  background-color: #121215;
  &__back-btn {
    padding: 0.5em 1em;
    background: #d8ab3e;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 5px;
    color: #111;
    font-size: 1.25em;
    font-weight: bold;
  }
}

@media only screen and (max-width: 600px) {
  .error__page {
    &-img {
      width: 60%;
    }
    &__back-btn {
      font-size: 1em;
    }
    &-text{
      font-size: 1.25em;
    }
  }
}
</style>
