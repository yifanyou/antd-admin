/**
 * Created by youyifan on 2016/4/13.
 */
import api from '../api'

export const INSERT = 'INSERT'
export const INSERT_PENDING = 'INSERT_PENDING'
export const INSERT_SUCCESS = 'INSERT_SUCCESS'

export function insert(url, formData, callback) {
    return {
        type: INSERT,
        payload: {
            promise: api.post(url, {
                data: formData,
                callback: callback
            })
        }
    }
}