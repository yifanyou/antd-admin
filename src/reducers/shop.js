/**
 * Created by youyifan on 2016/3/22.
 */

import {
    CHECK,
    UPDATE_PAGINATION,
    QUERY_SUCCESS,
    QUERY_PENDING,
    INSERT_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_SUCCESS
} from '../actions/shop'

const initialState = {
    rows: [],
    loading: false,
    status:0,
    selectedRowKeys:[],
    pagination:{
        showSizeChanger: true
    }
}

export default function shop(state = initialState, action = {}) {
    switch (action.type) {
        case CHECK:
            return Object.assign({}, state, {selectedRowKeys: action.selectedRowKeys})
        case UPDATE_PAGINATION:
            console.log(action.pagination)
            return Object.assign({}, state, {pagination: action.pagination})
        case QUERY_SUCCESS:
            console.log(state)
            return Object.assign({}, state, {loading:false, rows: action.payload.data, pagination: {total: action.payload.totalCount}})
        case QUERY_PENDING:
            return Object.assign({}, state, {loading:true})
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