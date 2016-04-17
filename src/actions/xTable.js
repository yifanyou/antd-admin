/**
 * Created by youyifan on 2016/4/9.
 */
import api from '../api'

export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'

export const CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE'

export const SEARCH = 'SEARCH'
export const SEARCH_PENDING = 'SEARCH_PENDING'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'

export const QUERY = 'QUERY'
export const QUERY_PENDING = 'QUERY_PENDING'
export const QUERY_SUCCESS = 'QUERY_SUCCESS'

export const INSERT = 'INSERT'
export const INSERT_PENDING = 'INSERT_PENDING'
export const INSERT_SUCCESS = 'INSERT_SUCCESS'

export const UPDATE = 'UPDATE'
export const UPDATE_PENDING = 'UPDATE_PENDING'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'

export const DELETE = 'DELETE'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'

export function updatePagination(pagination){
    return {
        type: UPDATE_PAGINATION,
        pagination: pagination
    }
}

export function changePageSize(pageSize){
    return {
        type: CHANGE_PAGE_SIZE,
        pageSize: pageSize
    }
}

export function search(url, params){
    return {
        type: SEARCH,
        payload: {
            promise: api.get(url, {
                params: params
            })
        }
    }
}

export function query(url, params) {
    return {
        type: QUERY,
        payload: {
            promise: api.get(url, {
                params: params
            })
        }
    }
}

export function insert(url, data, callback) {
    return {
        type: INSERT,
        payload: {
            promise: api.post(url, {
                data: data,
                callback: callback
            })
        }
    }
}

export function update(url, data, callback) {
    return {
        type: UPDATE,
        payload: {
            promise: api.put(url, {
                data: data,
                callback: callback
            })
        }
    }
}

export function del(url, ids, callback) {
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