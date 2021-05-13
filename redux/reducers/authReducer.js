import { SIGN_IN, SIGN_UP } from "../types/actionTypes";

const initialState = {
  token: null,
  user: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:

    default:
      return state;
  }
};

export default authReducer;
