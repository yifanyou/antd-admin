/**
 * Created by youyifan on 2016/3/23.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'antd'
import { Link } from 'react-router'

const FormItem = Form.Item;

export default class Detail extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {
    }

    callback() {

    }

    render () {
        var name = 'hello world:' + this.props.params.id;
        return (
            <div>
                <p><Link to={'/4/401'}>返回</Link></p>
                {name}
            </div>
        )
    }
}

// export default connect()(Detail)
