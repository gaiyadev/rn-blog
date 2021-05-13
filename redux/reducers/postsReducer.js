import { ADD_POST, FETCH_ALL_POSTS } from "../types/actionTypes";

const initialState = {
  userPosts: [],
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
    case FETCH_ALL_POSTS:

    default:
      return state;
  }
};

export default postsReducer;
