/**
 * Created by youyifan on 2016/3/22.
 */

import {
    CHECK,
    GET_ALL_ROW_SUCCESS,
    INSERT_SUCCESS,
    SHOW_ADD_MODAL,
    HIDE_ADD_MODAL
} from '../actions/shop';

const initialState = {
    rows: [],
    visible: false,
    loading: false,
    status:0,
    selectedRowKeys:[]
}

export default function shop(state = initialState, action = {}) {
    switch (action.type) {
        case CHECK:
            return Object.assign({}, state, {selectedRowKeys: action.payload.selectedRowKeys});
        case GET_ALL_ROW_SUCCESS:
            return Object.assign({}, initialState, {rows: action.payload});
        case INSERT_SUCCESS:
            return Object.assign({}, initialState, {status:1});
        case SHOW_ADD_MODAL:
            return Object.assign({}, state, {visible:true});
        case HIDE_ADD_MODAL:
            return Object.assign({}, state, {visible:false});
        default:
            return state;
    }
}