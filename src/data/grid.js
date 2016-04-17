/**
 * Created by youyifan on 2016/4/2.
 */
import _ from 'lodash'
import {shop} from './shop'

const data = {
    shop
}

const gridMap = _.reduce(data, function (map, grid) {
    map[grid.name] = grid
    return map
}, {})

module.exports = {
    getAll() {
        return data
    },

    lookupGrid(name) {
        return gridMap[name]
    }
}


