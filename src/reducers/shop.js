/**
 * Created by youyifan on 2016/3/22.
 */

import {
    GET_ALL_ROW,
    GET_ALL_ROW_SUCCESS
} from '../actions/shop';

const initialState = {
    rows:[]
}

export default function shop(state = initialState, action = {}) {
    switch (action.type) {
        case GET_ALL_ROW_SUCCESS:
            return Object.assign({}, initialState, {rows: action.payload.shops});
        default:
            return state;
    }
}