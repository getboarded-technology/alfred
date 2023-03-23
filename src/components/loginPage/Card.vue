<template>
  <b-col
    class="card"
    :class="addStyle"
  >
    <img
      src="@/assets/images/avatars/avatar.png"
      alt=""
    >
    <h3
      class="card-heading"
      :class="addStyleHeading"
    >
      Leslie Alexander
    </h3>
    <h5
      class="card-text"
      :class="addStyleText"
    >
      leslie@getboarded.com
    </h5>
  </b-col>
</template>

<script>
import { BCol } from 'bootstrap-vue'

export default {
  name: 'Card',
  components: {
    BCol,
  },
  props: {
    addStyle: {
      type: String,
      default: '',
    },
    addStyleHeading: {
      type: String,
      default: '',
    },
    addStyleText: {
      type: String,
      default: '',
    },
  },
}
</script>
