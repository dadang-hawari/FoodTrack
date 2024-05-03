export const checkUserSignedIn = (token, userData, navigate) => {
  if (token && userData) {
    navigate("/", {
      state: { info: "You've signed in" },
    });
  }
};
