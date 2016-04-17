/**
 * Created by youyifan on 2016/4/7.
 */
module.exports = {
    getContextPath() {
        let pathName = location.pathname
        console.log(location.pathname)

        let index = pathName.substr(1).indexOf("/")
        let result = pathName.substr(0,index+1)

        return result
    }
}