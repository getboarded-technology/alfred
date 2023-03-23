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

