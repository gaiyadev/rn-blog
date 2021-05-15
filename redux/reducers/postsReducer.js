import {
  ADD_POST,
  FETCH_ALL_POSTS,
  FETCH_ALL_USER_POSTS,
  VIEW_SINGLE_POST,
} from "../types/actionTypes";

const initialState = {
  userPosts: [],
  posts: [],
  post: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
      };
    case FETCH_ALL_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case FETCH_ALL_USER_POSTS:
      const postData = action.posts;
      return {
        ...state,
        userPosts: postData,
      };
    case VIEW_SINGLE_POST:
      return {
        ...state,
        post: action.post,
      };
    default:
      return state;
  }
};

export default postsReducer;
