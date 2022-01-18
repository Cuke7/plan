<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Plan</v-toolbar-title>
      <v-spacer></v-spacer>
      <avatar></avatar>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/plugins/firebase.js";

export default {
  mounted: function () {
    this.$nextTick(function () {
      onAuthStateChanged(auth, (authUSer) => {
        // console.log(authUSer);
        this.$store.commit("ON_AUTH_STATE_CHANGED_MUTATION", authUSer);
        if (authUSer) {
          console.log("User signed in!");
        } else {
          console.log("User signed out!");
        }
      });
    });
  },
};
</script>
