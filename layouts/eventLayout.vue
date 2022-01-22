<template>
  <v-app>
    <v-main>
      <v-container>
        <v-app-bar app color="primary">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white">
          </v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <eventMenu></eventMenu>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav>
            <v-list-item-group active-class="deep-purple--text text--accent-4">
              <v-list-item nuxt to="./home">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Accueil</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-piggy-bank</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Comptes</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Membres</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-google-maps</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Carte</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-camera</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Photos</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item nuxt to="/">
                <v-list-item-title class="red--text font-weight-bold"
                  >Menu principal</v-list-item-title
                >
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
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
  data: () => ({
    drawer: false,
  }),

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
