import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import postsReducer from "./postsReducer";
// To bring all app reducers together
export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
});
