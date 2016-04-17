/**
 * Created by youyifan on 2016/4/3.
 */
import {
    FETCH_DETAIL_PENDING,
    FETCH_DETAIL_SUCCESS
} from '../actions/detail'

const initialState = {
    data: null
}

export default function detail(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_DETAIL_SUCCESS:
            return Object.assign({}, initialState, {data: action.payload})
        default:
            return state
    }
}