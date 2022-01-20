<template>
  <div>
    <div id="firebaseui-auth-container" class="py-12"></div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js";

export default {
  mounted() {
    const firebaseui = require("firebaseui");
    require("firebaseui/dist/firebaseui.css");
    var firebase = require("firebase");
    // https://github.com/firebase/firebaseui-web/issues/216
    // for below version 7
    // const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.$fireAuth)
    // for version 7 and above
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    const config = {
      signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // this.$fireAuthObj.GoogleAuthProvider.PROVIDER_ID
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // signInSuccessUrl: "/",
      // tosUrl: '/tos',
      // privacyPolicyUrl: '/privacy',
      callbacks: {
        // signInSuccessWithAuthResult(user) {
        //   console.log("signInSuccessWithAuthResult", user);
        // },
        // uiShown: function () {
        //   console.log("uiShown");
        // },
      },
    };

    ui.start("#firebaseui-auth-container", config);
  },

  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
ul.firebaseui-idp-list {
  padding-left: 0px;
}
</style>
