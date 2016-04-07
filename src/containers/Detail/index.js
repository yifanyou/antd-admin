/**
 * Created by youyifan on 2016/3/23.
 */
import _ from 'lodash'
import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon } from 'antd'
import { Link } from 'react-router'
import {receiveDetail} from '../../actions/detail'
import gridHelper from '../../data/grid'

const FormItem = Form.Item
const RadioGroup = Radio.Group

export default class Detail extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        const {actions} = this.props
        actions.receiveDetail('/v2/shop/1')
    }

    callback() {

    }

    render () {
        const {data} = this.props
        const {getFieldProps} = this.props.form

        const grid = gridHelper.lookupGrid('shop')
        const columns = grid.columns
        const rightColumns = _.dropRight(columns, 1)

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
            fontWeight: {bold:''}
        };

        return (
            <div>
                <p><Button onClick={()=>this.context.router.goBack()}>返回</Button></p>
                <br />

                <Form horizontal onSubmit={this.handleSubmit}>
                    {rightColumns.map(column => (
                        <FormItem {...formItemLayout} label={column.title + '：'} key={column.dataIndex}>
                            <p className="ant-form-text" id={column.dataIndex} name={column.dataIndex}>{data!=null?data[column.dataIndex]:''}</p>
                        </FormItem>
                    ))}
                </Form>
            </div>
        )
    }
}

Detail.propTypes = {
    data: PropTypes.object
}

Detail.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Detail.defaultProps = {
    data: null
}

Detail = Form.create()(Detail)

function mapStateToProps(state) {
    return {
        data: state.detail.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({receiveDetail}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)