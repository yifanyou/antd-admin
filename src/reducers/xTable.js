/**
 * Created by youyifan on 2016/4/9.
 */
import {
    CHANGE_PAGE_SIZE,
    UPDATE_PAGINATION,
    SEARCH_PENDING,
    SEARCH_SUCCESS,
    QUERY_SUCCESS,
    QUERY_PENDING,
    INSERT_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_SUCCESS
} from '../actions/xTable'

const initialState = {
    data: [],
    selectedRowKeys:[],
    pagination: {
        pageSize: 10,
        current: 1,
        showSizeChanger: true,
        total:0
    },
    loading:false
}

export default function shop(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_PAGE_SIZE:
            return Object.assign({}, state, {pagination: {
                pageSize: action.pageSize,
                current: state.pagination.current,
                showSizeChanger: state.pagination.showSizeChanger,
                total: state.pagination.total
            }})
        case UPDATE_PAGINATION:
            return Object.assign({}, state, {pagination: {
                pageSize: action.pagination.pageSize,
                current: action.pagination.current,
                showSizeChanger: state.pagination.showSizeChanger,
                total: action.pagination.total
            }})
        case SEARCH_PENDING:
            return Object.assign({}, state, {loading:true})
        case SEARCH_SUCCESS:
            return Object.assign({}, state,
                {
                    data: action.payload.data,
                    pagination: {
                        pageSize: state.pagination.pageSize,
                        current: state.pagination.current,
                        showSizeChanger: state.pagination.showSizeChanger,
                        total: action.payload.total
                    },
                    loading:false
                })
        case QUERY_PENDING:
            return Object.assign({}, state, {loading:true})
        case QUERY_SUCCESS:
            return Object.assign({}, state,
                {
                    data: action.payload.data,
                    pagination: {
                        pageSize: state.pagination.pageSize,
                        current: state.pagination.current,
                        showSizeChanger: state.pagination.showSizeChanger,
                        total: action.payload.total
                    },
                    loading:false
                })
        case INSERT_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload})
        case UPDATE_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload})
        case DELETE_SUCCESS:
            return Object.assign({}, initialState, {status:action.payload})
        default:
            return state
    }
}