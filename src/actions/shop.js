/**
 * Created by youyifan on 2016/3/22.
 */
import api from '../api'
import gridHelper from '../data/grid'

export const GET_ALL_ROW = 'GET_ALL_ROW'
export const GET_ALL_ROW_SUCCESS = 'GET_ALL_ROW_SUCCESS'

export const INSERT = 'INSERT'
export const INSERT_PENDING = 'INSERT_PENDING'
export const INSERT_SUCCESS = 'INSERT_SUCCESS'

export const UPDATE = 'UPDATE'
export const UPDATE_PENDING = 'UPDATE_PENDING'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'

export const DELETE = 'DELETE'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'

//check
export const CHECK = 'CHECK'

const url = gridHelper.lookupGrid('shop').url

export function check(selectedRowKeys){
    return {
        type:CHECK,
        payload: {
            selectedRowKeys:selectedRowKeys
        }
    }
}

export function getAllRow() {
    return {
        type: GET_ALL_ROW,
        payload: {
            promise: api.get(url)
        }
    }
}

export function insert(shop, callback) {
    return {
        type: INSERT,
        payload: {
            promise: api.post(url, {
                data: shop,
                callback:callback
            })
        }
    }
}

export function update(shop) {
    return {
        type: UPDATE,
        payload: {
            promise: api.put(url, {
                data: shop
            })
        }
    }
}

export function del(ids, callback) {
    return {
        type: DELETE,
        payload: {
            promise: api.del(url, {
                data: ids,
                callback: callback
            })
        }
    }
}