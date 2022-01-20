<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snackBarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
          console.log("User signed in!", authUSer);
        } else {
          console.log("User signed out!");
        }
      });
    });
  },

  computed: {
    snackBarText() {
      return this.$store.state.snackBarText;
    },
    snackbar: {
      // getter
      get: function () {
        return this.$store.state.snackbar;
      },
      // setter
      set: function (newValue) {
        this.$store.commit("updateSnackBar", newValue);
      },
    },
  },
};
</script>

<style></style>
