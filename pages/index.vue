<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <sign-in v-if="!currentUser" />
      </div>
      <v-row class="pa-4" justify="center">
        <v-col cols="12">
          <div v-for="(key, index) in eventKeys" :key="index">
            <v-card
              @click="$router.push('/' + key + '/home')"
              v-if="eventList[key].members.hasOwnProperty(currentUser.uid)"
              class="my-6 pa-4"
            >
              <v-card-title class="pa-0" style="word-break: normal">{{
                eventList[key].eventName
              }}</v-card-title>
              <div class="text-body-1">
                {{ eventList[key].adress }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-fab-transition>
      <v-btn
        color="primary"
        absolute
        bottom
        right
        fab
        style="bottom: 16px"
        nuxt
        to="./newEvent"
        v-if="currentUser"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-row>
</template>

<script>
import { db, auth } from "~/plugins/firebase.js";
import { ref, push, child, get, set } from "firebase/database";

export default {
  data: () => ({
    eventList: {},
    eventKeys: [],
  }),
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  mounted() {
    // let data = {
    //   eventName: "Puy du fou 2022",
    // };
    // this.createEvent(data);
    this.readEventsList();
  },
  methods: {
    signOut() {
      console.log("signOut");
      // this.$fireAuth.signOut()
      auth.signOut();
    },
    createEvent(data) {
      push(ref(db, "events/"), data).then((e) => {
        console.log("Event created! The key is", e.key);
      });
    },
    modifyEvent(id, data) {
      set(ref(db, "events/" + id), data);
    },
    readEventsList() {
      get(child(ref(db), "events/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let eventList = snapshot.val();
            console.log(eventList);
            this.eventList = eventList;
            this.eventKeys = Object.keys(eventList);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
