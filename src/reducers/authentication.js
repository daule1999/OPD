
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../actionConstants/actionConstants"

// import { userConstants } from '../_constants';

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};
const initialState = {
  user: {
    username: "Bhola",
    password: "123456789",
  },
  loggedIn: false,
  isAuthAllowed: false
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      }

    case LOGIN_FAILURE:
      return {
        user: {
          username: "Bhola",
          password: "123456789",
        },
        loggedIn: false,

      };
    case LOGOUT:
      return {
        user: {
          username: "Bhola",
          password: "123456789",
        },
        loggedIn: false,

      };
    default:
      return state
  }
}