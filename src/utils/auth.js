/**
 * Created by youyifan on 2016/3/28.
 */
const TOKEN_NAME = 'TOKEN'
const UID = 'UID'

module.exports = {
    saveToken(token) {
        return localStorage.setItem(TOKEN_NAME, token)
    },

    getToken() {
        return localStorage.getItem(TOKEN_NAME)
    },

    getUid() {
        return localStorage.getItem(UID)
    },

    login(token, uid) {
        localStorage.setItem(TOKEN_NAME, token)
        localStorage.setItem(UID, uid)
    },

    logout() {
        localStorage.removeItem(TOKEN_NAME)
        localStorage.removeItem(UID)
    },

    loggedIn(token) {
        return localStorage.setItem(TOKEN_NAME, token)
    },

    onChange() {}
}