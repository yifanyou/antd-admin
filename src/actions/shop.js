/**
 * Created by youyifan on 2016/3/22.
 */
import api from '../api'
import gridHelper from '../data/grid'
import _ from 'lodash'

export const QUERY = 'QUERY'
export const QUERY_SUCCESS = 'QUERY_SUCCESS'

export const INSERT = 'INSERT'
export const INSERT_PENDING = 'INSERT_PENDING'
export const INSERT_SUCCESS = 'INSERT_SUCCESS'

export const UPDATE = 'UPDATE'
export const UPDATE_PENDING = 'UPDATE_PENDING'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'

export const DELETE = 'DELETE'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'

//pagination
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'

//check
export const CHECK = 'CHECK'

const url = gridHelper.lookupGrid('shop').url

export function check(selectedRowKeys){
    return {
        type:CHECK,
        selectedRowKeys:selectedRowKeys
    }
}

export function query(request) {
    let urlRight = buildUrl(url, request)
    return {
        type: QUERY,
        payload: {
            promise: api.get(urlRight)
        }
    }
}

export function insert(shop, callback) {
    return {
        type: INSERT,
        payload: {
            promise: api.post(url, {
                data: shop,
                callback: callback
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

export function updatePagination(pagination){
    return {
        type: UPDATE_PAGINATION,
        pagination: pagination
    }
}

function buildUrl(url , request){
    let params = ''
    if(request!=null)
        _.forIn(request, function(value, key) {
            params += '&' + key + '=' + value
        })
    return request!=null?(url+ '?' + params):url
}