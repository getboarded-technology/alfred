<template>
  <div
    class="small-card"
    :style="{
      opacity: opacity + '%',
    }"
  >
    <img
      :src="icon"
      alt=""
    >
    <h4
      class="small-card-heading"
    >
      {{ msg }}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'SmallCard',
  components: {},
  props: {
    msg: {
      type: String,
      default: 'No Message Passed',
    },
    icon: {
      type: String,
      default: 'require("@/assets/images/avatars/card1.png")',
    },
    opacity: {
      type: Number,
      default: 100,
    },
    addStyleHeading: {
      type: String,
      default: '',
    },
  },
}
</script>
