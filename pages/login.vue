<template>
  <div class="text-center">
    <sign-in />
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
};
</script>
