import _ from 'lodash';

import {
    GET_ALL_MENU,
    GET_ALL_MENU_SUCCESS,
    UPDATE_NAVPATH
} from '../actions/menu';

const initialState = {
  currentIndex: 0,
  items: [],
  navpath: []
};

export default function menu(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ALL_MENU_SUCCESS:
      console.log(action.payload)
      return Object.assign({}, initialState, {items: action.payload});
    case UPDATE_NAVPATH:
      let navpath = [], tmpOb, tmpKey, child;
      if(action.payload.data){
        action.payload.data.reverse().map((item)=>{
          if(item.indexOf('sub') != -1){
            tmpKey = item.replace('sub', '');
            tmpOb = _.find(state.items, function(o) {
              return o.id == tmpKey;
            });
            child = tmpOb.subMenu;
            navpath.push({
              key: tmpOb.id,
              name: tmpOb.cname
            })
          }
          if(item.indexOf('menu') != -1){
            tmpKey = item.replace('menu', '');
            if(child){
              tmpOb = _.find(child, function(o) {
                return o.id == tmpKey;
              });
            }
            navpath.push({
              key: tmpOb.id,
              name: tmpOb.name
            })
          }
        })
      }
      return Object.assign({}, state, {
        currentIndex: action.payload.key*1,
        navpath: navpath
      });
    default:
      return state;
  }
}
