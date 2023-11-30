const initialState = {
  username: "",
  password: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADMIN":
      return {
      };
    default:
      return state;
  }
};

export default rootReducer;
