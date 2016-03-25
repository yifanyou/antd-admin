/**
 * Created by youyifan on 2016/3/22.
 */

import {
    GET_ALL_ROW,
    GET_ALL_ROW_SUCCESS,
    SHOW_ADD_MODAL,
    HIDE_ADD_MODAL
} from '../actions/shop';

const initialState = {
    rows: [],
    visible: false,
    loading: false
}

export default function shop(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_ROW_SUCCESS:
            return Object.assign({}, initialState, {rows: action.payload.shops});
        case SHOW_ADD_MODAL:
            return Object.assign({}, state, {visible:true});
        case HIDE_ADD_MODAL:
            return Object.assign({}, state, {visible:false});
        default:
            return state;
    }
}