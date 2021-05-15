import {
  ADD_POST,
  FETCH_ALL_POSTS,
  FETCH_ALL_USER_POSTS,
  UPDATE_POST,
  VIEW_SINGLE_POST,
} from "../types/actionTypes";
// where we sen http req
const baseUrl = "https://note-expressjs-api.herokuapp.com/";

const headers = {
  "Content-Type": "application/json",
};

export const addPost = ({ title, body }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`${baseUrl}api/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMsg = errorResponse.error;
      let message = "Something went wrong";
      if (errorMsg) {
        message = errorMsg;
      }

      throw new Error(message);
    }
    // success
    const resData = await response.json();

    dispatch({
      type: ADD_POST,
      post: resData.note,
    });
  };
};

// updatepost
export const updatePost = ({ title, body }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${baseUrl}api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMsg = errorResponse.error;
      console.log("ERROR", errorMsg);
      let message = "Something went wrong";
      if (errorMsg) {
        message = errorMsg;
      }
      throw new Error(message);
    }
    // success
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: UPDATE_POST,
      user: resData.note,
    });
  };
};

// all post
export const fetchUserPost = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${baseUrl}api/notes/all/posts`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMsg = errorResponse.error;
      console.log("ERROR", errorMsg);
      let message = "Something went wrong";
      if (errorMsg) {
        message = errorMsg;
      }
      throw new Error(message);
    }
    // success
    const resData = await response.json();
    console.log("UserPosty", resData);
    dispatch({
      type: FETCH_ALL_USER_POSTS,
      posts: resData.notes,
    });
  };
};

// all users post
export const fetchPost = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${baseUrl}api/notes/`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMsg = errorResponse.error;
      console.log("ERROR", errorMsg);
      let message = "Something went wrong";
      if (errorMsg) {
        message = errorMsg;
      }
      throw new Error(message);
    }
    // success
    const resData = await response.json();
    dispatch({
      type: FETCH_ALL_POSTS,
      posts: resData.notes,
    });
  };
};

// all sinhle post by_id
export const fetchSinglePost = (_id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${baseUrl}api/notes/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMsg = errorResponse.error;
      console.log("ERROR", errorMsg);
      let message = "Something went wrong";
      if (errorMsg) {
        message = errorMsg;
      }
      throw new Error(message);
    }
    // success
    const resData = await response.json();
    console.log(">>>>", resData);
    dispatch({
      type: VIEW_SINGLE_POST,
      post: resData.item,
    });
  };
};
