/**
 * Created by youyifan on 2016/3/28.
 *
 * TODO Not good solution 
 */

import _ from 'lodash'

const MENU_MAPPER = 'MENU_MAPPER';

module.exports = {
    saveMenu(menus){
        let menusMapper = {}
        for(var i=0; i<menus.length; i++){
            let sub = menus[i];

            for(var j=0; j<sub.subMenu.length; j++){
                let menu = sub.subMenu[j];

                let keyPath = new Array()
                keyPath[0] = menu.id //菜单项
                keyPath[1] = menu.name
                keyPath[2] = sub.id //菜单
                keyPath[3] = sub.cname

                menusMapper[menu.link] = keyPath
            }
        }
        localStorage.setItem(MENU_MAPPER, JSON.stringify(menusMapper));
    },

    getNavPath(){
        let path = location.pathname.replace('/', '').split('/')[0]
        if(path!='' && path != 'home'){
            let navPath = []
            let menusMapper = JSON.parse(localStorage.getItem(MENU_MAPPER))
            navPath[0] = {
                key: menusMapper[path][2],
                name: menusMapper[path][3]
            }
            navPath[1] = {
                key:  menusMapper[path][0],
                name:  menusMapper[path][1]
            }
            return navPath
        }
        return []
    }
}