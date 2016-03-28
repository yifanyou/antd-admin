import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  FETCH_PROFILE_PENDING,
  FETCH_PROFILE_SUCCESS
} from '../actions/user';

import auth from '../utils/auth'

const initialState = {
  user: null,
  profile:null,
  loggingIn: false,
  loggingOut: false,
  loginErrors: null
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_PENDING:
      return Object.assign({}, initialState, {loggingIn: true});
    case LOGIN_SUCCESS:
      auth.login(aciton.payload.token)
      return Object.assign({}, initialState, {user: action.payload, loggingIn: false, loginErrors: null});
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginErrors: action.payload.message
      };
    case LOGOUT:
      auth.logout()
      return {
        ...state,
        loggingOut: false,
        user: null,
        loginErrors: null
      };
    case FETCH_PROFILE_SUCCESS:
      return Object.assign({}, initialState, {profile: action.payload, user: state.user});
    case 'UID_NOT_FOUND':
        console.log('UID_NOT_FOUND');
      return state;
    default:
      return state;
  }
}
