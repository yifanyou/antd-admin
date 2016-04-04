/**
 * Created by youyifan on 2016/3/22.
 */

import {
    CHECK,
    UPDATE_PAGINATION,
    QUERY_SUCCESS,
    INSERT_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_SUCCESS
} from '../actions/shop'

const initialState = {
    rows: [],
    loading: false,
    status:0,
    selectedRowKeys:[],
    pagination:{}
}

export default function shop(state = initialState, action = {}) {
    switch (action.type) {
        case CHECK:
            return Object.assign({}, state, {selectedRowKeys: action.selectedRowKeys})
        case UPDATE_PAGINATION:
            return Object.assign({}, state, {pagination: action.pagination})
        case QUERY_SUCCESS:
            return Object.assign({}, initialState, {rows: action.payload})
        case INSERT_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload})
        case UPDATE_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload})
        case DELETE_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload, rows:state.rows})
        default:
            return state
    }
}