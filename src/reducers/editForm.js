/**
 * Created by youyifan on 2016/4/13.
 */
import {
    INIT_FORM,
    FETCH_DETAIL,
    FETCH_DETAIL_PENDING,
    FETCH_DETAIL_SUCCESS,
    UPDATE,
    UPDATE_PENDING,
    UPDATE_SUCCESS
} from '../actions/editForm'

const initialState = {
    data: null,
    updated: false
}

export default function detail(state = initialState, action = {}) {
    switch (action.type) {
        case INIT_FORM:
            return Object.assign({}, initialState)
        case FETCH_DETAIL_SUCCESS:
            return Object.assign({}, initialState, {data: action.payload})
        case UPDATE_PENDING:
            return Object.assign({}, initialState, {updated: false})
        case UPDATE_SUCCESS:
            return Object.assign({}, initialState, {updated: true})
        default:
            return state
    }
}