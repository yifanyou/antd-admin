/**
 * Created by youyifan on 2016/4/13.
 */
import {
    INSERT_PENDING,
    INSERT_SUCCESS,
} from '../actions/addForm'

const initialState = {
    inserted: false
}

export default function detail(state = initialState, action = {}) {
    switch (action.type) {
        case INSERT_PENDING:
            return Object.assign({}, initialState, {inserted: false})
        case INSERT_SUCCESS:
            return Object.assign({}, initialState, {inserted: true})
        default:
            return state
    }
}