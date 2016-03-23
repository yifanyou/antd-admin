/**
 * Created by youyifan on 2016/3/22.
 */
import api from '../api'

export const GET_ALL_ROW = 'GET_ALL_ROW';
export const GET_ALL_ROW_SUCCESS = 'GET_ALL_ROW_SUCCESS';

export function getAllRow() {
    return {
        type: GET_ALL_ROW,
        payload: {
            promise: api.post('/shop')
        }
    }
}
