<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6"> </v-col>
  </v-row>
</template>

<script>
import { db, auth } from "~/plugins/firebase.js";
import { ref, push, child, get, set } from "firebase/database";

export default {
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
    // console.log(this.readEvents());
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
    readEvents() {
      get(child(ref(db), "events/-MtiO2s59QMPs5A67ZE8"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
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
