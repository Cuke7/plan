<template>
  <v-dialog v-model="dialog" max-width="290" persistent>
    <v-card>
      <v-card-title class="text-h5"> Nouveau message </v-card-title>

      <v-textarea
        class="mx-5"
        outlined
        hide-details
        v-model="messageText"
      ></v-textarea>

      <v-card-actions>
        <v-btn color="primary" text> Poster </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="closeDialog()"> Annuler </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
  data: () => ({
    messageText: "",
  }),
};
</script>
