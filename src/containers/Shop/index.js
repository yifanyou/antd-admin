/**
 * Created by youyifan on 2016/4/9.
 */
import React from 'react'
import XTable from '../XTable'
import {connect} from 'react-redux'

import gridHelper from '../../data/grid'

export default class Shop extends React.Component {
    constructor () {
        super()
    }

    render() {
        const grid = gridHelper.lookupGrid('shop')

       if(this.props.children)
            return React.cloneElement(this.props.children, {grid: grid})
        else
            return (<XTable grid={grid} />)
    }
}

export default connect()(Shop)