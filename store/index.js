export const state = () => ({
  user: false,
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
