import { LOGIN_SUCCESS, LOGOUT_FAIL, LOGIN_FAIL, LOGOUT_SUCCESS, FETCHING_USER } from "actions";

const initialState = {
  isAuthenticated: false,
  authenticating: true,
  user: null
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING_USER:
      return {
        ...state,
        authenticating: payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticating: false,
        isAuthenticated: true,
        user: payload
      };

    case LOGIN_FAIL:
      return {
        ...state,
        authenticating: false,
        isAuthenticated: false,
        user: null
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticating: false,
        user: null,
        isAuthenticated: false
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        authenticating: false
      };
    default:
      return state;
  }
}
