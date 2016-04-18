/**
 * Created by youyifan on 2016/4/3.
 */
import api from '../api'

export const FETCH_DETAIL = 'FETCH_DETAIL'
export const FETCH_DETAIL_PENDING = 'FETCH_DETAIL_PENDING'
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS'

export function fetchDetail(url, callback) {
    return {
        type:FETCH_DETAIL,
        payload: {
            promise: api.get(url, {
                callback: callback
            })
        }
    }
}