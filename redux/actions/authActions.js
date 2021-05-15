import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_PROFILE,
  UPDATE_PROFILE,
  FETCH_ALL_USER_TOTAL_POSTS,
  CHANGE_PASSWORD,
} from "../types/actionTypes";
// where we sen http req
const baseUrl = "https://note-expressjs-api.herokuapp.com/";
const headers = {
  "Content-Type": "application/json",
};

export const signup = ({ username, email, password }) => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}api/users/register`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username,
        email,
        password,
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
      type: SIGN_UP,
      user: resData.user,
    });
  };
};

// login
export const signin = ({ email, password }) => {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}api/users/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email,
        password,
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
    // console.log(resData);
    dispatch({
      type: SIGN_IN,
      user: resData.user,
      token: resData.token,
    });
  };
};

//Change password
export const changePassword = ({ password, newPassword, comfirmPassword }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${baseUrl}api/users/changePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
        newPassword,
        comfirmPassword,
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
      type: CHANGE_PASSWORD,
      user: resData.user,
    });
  };
};

// update inot

export const updateDetails = ({ username, email }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log("TOKeN", token);
    const response = await fetch(`${baseUrl}api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        username,
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
    console.log(resData);
    dispatch({
      type: UPDATE_PROFILE,
      user: resData.user,
    });
  };
};

//logou
export const signout = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};

// get user info
export const getUserInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${baseUrl}api/users/user/profile`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
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
    const userData = Object.values(resData.user);

    dispatch({
      type: GET_PROFILE,
      user: userData,
    });
  };
};

//  getb all user Post

export const totalPosts = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${baseUrl}api/users/all/posts`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
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
      type: FETCH_ALL_USER_TOTAL_POSTS,
      totalPosts: resData.totalPosts,
    });
  };
};
