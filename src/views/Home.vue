<template>
  <div>
    <navbar />
    <library />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Library from "@/views/library/Library.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Library,
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
html,
* {
  font-family: "Inter", sans-serif;
}
</style>
