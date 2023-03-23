<template>
  <div class="company-card">
    <div class="company-card-img">
      <img
        :src="image"
        alt="Company Logo"
        style="width: 100%; height: 100% object-fit: cover;"
      >
    </div>
    <div class="company-card-container">
      <h3 class="company-card-heading">
        {{ title }}
      </h3>
      <p class="company-card-sub-heading">
        {{ website }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallCard',
  props: {
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
  },
}
</script>
