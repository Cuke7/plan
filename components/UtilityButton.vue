<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    absolute
    direction="left"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="primary" fab >
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-plus </v-icon>
      </v-btn>
    </template>
     <v-btn fab dark small color="purple">
      <v-icon>mdi-android-messages</v-icon>
    </v-btn>
    <v-btn fab dark small color="green">
      <v-icon>mdi-camera</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo">
      <v-icon>mdi-piggy-bank</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>mdi-order-bool-ascending-variant</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false,
  }),
  watch: {
    fab(val) {
      console.log(val);
    },
  },
};
</script>
