<template>
  <div>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>
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
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="ma-4" v-if="eventData">
          <v-card-title>
            {{ eventData.eventName }}
          </v-card-title>
          <v-card-text class="text-body-1">
            {{ eventData.adress }}
          </v-card-text>
        </v-card>
        <v-row align="center" justify="space-between" class="ma-4">
          <v-col cols="auto" class="px-0 mx-0">
            <v-btn color="primary" class="white--text" @click="share()">
              Partager
              <v-icon right dark> mdi-share-variant </v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <div class="text-center" v-show="!currentUser">
          <sign-in />
        </div>

        <UtilityButton></UtilityButton>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db, auth } from "~/plugins/firebase.js";
import { ref, push, child, get, set } from "firebase/database";

export default {
  layout: "eventLayout",
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"

    return { slug };
  },

  async fetch() {
    let eventData = await await get(child(ref(db), "events/" + this.slug));
    this.eventData = eventData.val();
    console.log(eventData.val());
  },

  data: () => ({
    eventData: null,
    drawer: false,
    group: null,
  }),

  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator
          .share({
            title: "Rejoindre " + this.eventData.eventName,
            text: "",
            url: window.location.href,
          })
          .then(() => console.log("Shared!"))
          .catch((error) => console.log("Error sharing", error));
      }
    },
  },
};
</script>
