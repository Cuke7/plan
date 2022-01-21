<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h2 class="text-center my-12">Bienvenue sur Plan !</h2>
      <h3 class="text-center my-12 mx-6">
        Ceci est votre invitation pour l'évenement suivant :
      </h3>
      <v-card class="mx-4">
        <v-card-title>
          {{ eventData.eventName }}
        </v-card-title>
        <v-card-text>
          {{ eventData.adress }}
        </v-card-text>
        <v-row justify="center" align="center">
          <v-col v-if="currentUser" cols="auto">
            <v-btn
              color="secondary"
              class="white--text"
              @click="join()"
              :disabled="joined"
            >
              Rejoindre
              <v-icon right dark> mdi-send </v-icon>
            </v-btn>
          </v-col>
          <div class="text-center" v-else>
            <sign-in />
          </div>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { db, auth } from "~/plugins/firebase.js";
import { ref, push, child, get, set } from "firebase/database";

export default {
  asyncData({ route }) {
    let eventID = route.query.eventID;
    return { eventID };
  },

  async fetch() {
    let eventDataResponse = await get(child(ref(db), "events/" + this.eventID));
    let eventData = await eventDataResponse.val();
    this.eventData = eventData;
    console.log(eventData);
  },
  data: () => ({
    eventData: {
      eventName: "",
      adress: "",
    },
  }),
  computed: {
    currentUser() {
      let authUser = this.$store.state.user;
      return authUser;
    },
    joined() {
      if (this.eventData) {
        let members = this.eventData.members;
        if (members) {
          return Object.keys(members).includes(this.currentUser.uid);
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    join() {
      set(
        ref(db, "events/" + this.eventID + "/members/" + this.currentUser.uid),
        this.currentUser
      ).then((e) => {
        this.$store.commit(
          "updateSnackBarText",
          "Évenement rejoint avec succès !"
        );
        this.$store.commit("updateSnackBar", true);
        this.$router.push(this.eventID + "/home");
      });
    },
  },
};
</script>
