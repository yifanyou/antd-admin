import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  FETCH_PROFILE_PENDING,
  FETCH_PROFILE_SUCCESS,
  UID_NOT_FOUND
} from '../actions/user';

import authUtils from '../utils/auth'

const initialState = {
  uid: null,
  profile:null,
  loggingIn: false,
  loggingOut: false,
  loginErrors: null
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_PENDING:
      return Object.assign({}, initialState, {loggingIn: true})
    case LOGIN_SUCCESS:
      authUtils.login(action.payload.token, action.payload.uid)
      return Object.assign({}, initialState, {uid: action.payload.uid, loggingIn: false, loginErrors: null})
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        uid: null,
        loginErrors: action.payload.message
      }
    case LOGOUT:
      authUtils.logout()
      return {
        ...state,
        loggingOut: false,
        uid: null,
        loginErrors: null
      }
    case FETCH_PROFILE_SUCCESS:
      return Object.assign({}, initialState, {profile: action.payload, uid: state.uid});
    case UID_NOT_FOUND:
      return state;
    default:
      return state;
  }
}
