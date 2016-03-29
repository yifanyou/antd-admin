import api from '../api'

export const FETCH_PROFILE = 'FETCH_PROFILE'
export const FETCH_PROFILE_PENDING = 'FETCH_PROFILE_PENDING'
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS'

export const LOGIN = 'LOGIN'
export const LOGIN_PENDING = 'LOGIN_PENDING'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const UID_NOT_FOUND = 'UID_NOT_FOUND'

export const LOGOUT = 'LOGOUT'

export function fetchProfile(uid) {
    if (uid === undefined) {
        return {type: UID_NOT_FOUND};
    }
    return {
        type: FETCH_PROFILE,
        payload: {
          promise: api.get('/v1/user/'+uid)
        }
    }
}

export function login(user, password) {
  return {
      type: LOGIN,
      payload: {
        promise: api.post('/v1/security/login', {
          data: {
            username: user,
            password: password
          }
        })
      }
  }
}

export function logout() {
    return {
        type: LOGOUT
    }
}
