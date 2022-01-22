<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon color="white" dark v-bind="attrs" v-on="on">
        <v-icon> mdi-dots-vertical </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>Modifier</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Paramètres</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Supprimer</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
