/**
 * Created by youyifan on 2016/4/13.
 */
import api from '../api'

export const INIT_FORM = 'INIT_FORM'

export const UPDATE = 'UPDATE'
export const UPDATE_PENDING = 'UPDATE_PENDING'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'

export const FETCH_DETAIL = 'FETCH_DETAIL'
export const FETCH_DETAIL_PENDING = 'FETCH_DETAIL_PENDING'
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS'

export function initForm() {
    return {
        type:INIT_FORM
    }
}

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

export function update(url, formData, callback) {
    return {
        type: UPDATE,
        payload: {
            promise: api.put(url, {
                data: formData,
                callback: callback
            })
        }
    }
}