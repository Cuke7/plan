<template>
  <div>
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
