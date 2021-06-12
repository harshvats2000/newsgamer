import { LOGIN_SUCCESS, LOGOUT_FAIL, LOGIN_FAIL, LOGOUT_SUCCESS, LOGGING_IN } from "actions";

const initialState = {
  isAuthenticated: false,
  authenticating: true,
  user: null
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case LOGGING_IN:
      return {
        ...state,
        authenticating: true
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
