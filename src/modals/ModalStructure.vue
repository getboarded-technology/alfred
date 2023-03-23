<template>
  <div
    class="modal"
    @click="close"
  >
    <div class="modal-child">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalStructure',
  props: {
    close: {
      type: Function,
      default: () => {},
    },

  },
}
</script>
