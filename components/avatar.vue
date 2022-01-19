<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="currentUser"
          icon
          v-bind="attrs"
          v-on="on"
          width="30"
          height="30"
        >
          <v-avatar size="30" v-if="currentUser.photoURL">
            <img v-bind:src="currentUser.photoURL" />
          </v-avatar>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon v-else nuxt to="./login">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title> Mon profil </v-card-title>

        <v-card-text>
          <v-row align="center">
            <v-col>
              <v-avatar size="40" v-if="currentUser.photoURL">
                <img v-bind:src="currentUser.photoURL" />
              </v-avatar>
            </v-col>
            <v-col>
              {{ currentUser.displayName }}
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="signOut"> Déconnection</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js";

export default {
  data: () => ({
    dialog: false,
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    signOut() {
      console.log("signOut");
      // this.$fireAuth.signOut()
      auth.signOut();
    },
  },
};
</script>
