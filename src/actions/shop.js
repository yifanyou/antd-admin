/**
 * Created by youyifan on 2016/3/22.
 */
import api from '../api'

export const GET_ALL_ROW = 'GET_ALL_ROW';
export const GET_ALL_ROW_SUCCESS = 'GET_ALL_ROW_SUCCESS';

export const SHOW_ADD_MODAL = 'SHOW_ADD_MODAL';
export const HIDE_ADD_MODAL = 'HIDE_ADD_MODAL';

export function getAllRow() {
    return {
        type: GET_ALL_ROW,
        payload: {
            promise: api.post('/v/shop/test')
        }
    }
}

export function showAddModel() {
    return {
        type:SHOW_ADD_MODAL
    }
}

export function hideAddModel() {
    return {
        type:HIDE_ADD_MODAL
    }
}
