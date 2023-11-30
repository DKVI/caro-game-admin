const action = {
  setAdmin: (payload) => {
    return {
      type: "SET_ADMIN",
      payload,
    };
  },
};

export default action;
