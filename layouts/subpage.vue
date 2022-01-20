<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt></Nuxt>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "subpage",
  methods: {
    hasHistory() {
      return window.history.length > 2;
    },
  },
};
</script>
