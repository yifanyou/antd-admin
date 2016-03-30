/**
 * Created by youyifan on 2016/3/22.
 */

import {
    CHECK,
    GET_ALL_ROW_SUCCESS,
    INSERT_PENDING,
    INSERT_SUCCESS,
    UPDATE_PENDING,
    UPDATE_SUCCESS,
    DELETE_SUCCESS
} from '../actions/shop'

const initialState = {
    rows: [],
    // visible: false,
    // loading: false,
    status:0,
    selectedRowKeys:[]
}

export default function shop(state = initialState, action = {}) {
    switch (action.type) {
        case CHECK:
            return Object.assign({}, state, {selectedRowKeys: action.payload.selectedRowKeys})
        case GET_ALL_ROW_SUCCESS:
            return Object.assign({}, initialState, {rows: action.payload})
        // case INSERT_PENDING:
        //     return Object.assign({}, state, {loading:true})
        case INSERT_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload})
        // case UPDATE_PENDING:
        //     return Object.assign({}, state, {loading:true})
        case UPDATE_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload})
        case DELETE_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload, rows:state.rows})
        default:
            return state
    }
}