import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_PROFILE,
  FETCH_ALL_USER_TOTAL_POSTS,
  CHANGE_PASSWORD,
} from "../types/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  token: null,
  user: {},
  userDetails: [],
  totalNumPost: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        user: action.user,
      };
    case SIGN_IN:
      return {
        token: action.token, //AsyncStorage.setItem("token", JSON.stringify(action.token)),
        user: action.user,
      };

    case GET_PROFILE:
      const data = action.user;
      return {
        ...state,
        userDetails: data,
      };
    case FETCH_ALL_USER_TOTAL_POSTS:
      return {
        ...state,
        totalNumPost: action.totalPosts,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        user: {},
        token: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: {},
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
