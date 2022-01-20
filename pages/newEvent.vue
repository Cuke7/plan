<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row justify="space-between" align="center">
        <v-col cols="auto" class="mx-2 mt-2">
          <v-btn icon color="primary" @click="$router.push('/')">
            <v-icon> mdi-arrow-left </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" class="ma-4">
          <v-btn
            color="primary"
            icon
            :disabled="!isValid"
            :loading="loading"
            @click="createEvent()"
          >
            <v-icon> mdi-send </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-card-text class="pt-0">
        <v-card-title class="pl-1">Nouvel évenement</v-card-title>
        <v-form v-model="isValid">
          <v-text-field
            label="Comment s'apelle votre évenement ?"
            v-model="eventName"
            autocomplete="new"
            :rules="[rules.required]"
          >
            <template v-slot:prepend>
              <v-icon color="UI"> mdi-rename-box </v-icon>
            </template>
          </v-text-field>

          <v-text-field
            label="Où se déroule-t-il ?"
            v-model="adress"
            autocomplete="new"
            :rules="[rules.required]"
          >
            <template v-slot:prepend>
              <v-icon color="UI"> mdi-map-marker </v-icon>
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>

      <v-textarea
        class="ma-3"
        outlined
        label="Description, détails pratiques, horaires... "
        hide-details
        v-model="details"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
import { db, auth } from "~/plugins/firebase.js";
import { ref, push, child, get, set } from "firebase/database";

export default {
  layout: "subpage",
  data: () => ({
    details: "",
    eventName: "Puy du fou, session 2022",
    adress: "Au puy du Fou",
    dateBegin: "",
    dateEnd: "",
    loading: false,
    rules: {
      date: (value) => {
        const pattern =
          /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
        return (
          pattern.test(value) || "Format de la date : jj/mm/aaaa ou jj/mm/aa."
        );
      },
      required: (value) => !!value || "Requis.",
    },
    isValid: false,
  }),
  watch: {
    dateBegin(val) {
      if (!isNaN(val[0]) && !isNaN(val[1]) && val.length == 2) {
        this.dateBegin += "/";
      }

      if (!isNaN(val[3]) && !isNaN(val[4]) && val.length == 5) {
        this.dateBegin += "/";
      }
    },
    dateEnd(val) {
      if (!isNaN(val[0]) && !isNaN(val[1]) && val.length == 2) {
        this.dateEnd += "/";
      }

      if (!isNaN(val[3]) && !isNaN(val[4]) && val.length == 5) {
        this.dateEnd += "/";
      }
    },
  },
  methods: {
    createEvent() {
      this.loading = true;
      push(ref(db, "events/"), this.eventData).then((e) => {
        this.loading = false;
        this.$router.push("/");
        this.$store.commit(
          "updateSnackBarText",
          "Évenement créé avec succès !"
        );
        this.$store.commit("updateSnackBar", true);
        console.log("Event created! The key is", e.key);
      });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    eventData() {
      let data = {
        eventName: this.eventName,
        adress: this.adress,
        details: this.details,
        members: {},
      };
      data.members[this.currentUser.uid] = this.currentUser;
      data.owner = this.currentUser.uid;
      return data;
    },
  },
};
</script>
