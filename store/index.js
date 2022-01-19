export const state = () => ({
  user: false,
  snackbar: false,
  snackBarText: "",
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, authUser) {
    if (authUser) {
      state.user = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL,
      };
    } else {
      state.user = false;
    }
  },
  updateSnackBar(state, val) {
    state.snackbar = val;
  },
  updateSnackBarText(state, test) {
    state.snackBarText = test;
  },
  //   ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
  //     if (authUser) {
  //       state.user = {
  //         uid: authUser.uid,
  //         email: authUser.email,
  //         displayName: authUser.displayName,
  //       };
  //     } else {
  //       state.user = false;
  //     }
  //   },
};
