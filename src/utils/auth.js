/**
 * Created by youyifan on 2016/3/28.
 */
const TOKEN_NAME = 'token'

module.exports = {
    getToken() {
        return localStorage.getItem(TOKEN_NAME)
    },

    logout() {
        localStorage.removeItem(TOKEN_NAME)
    },

    loggedIn(token) {
        return localStorage.setItem(TOKEN_NAME, token)
    },

    onChange() {}
}