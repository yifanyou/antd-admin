/**
 * Created by youyifan on 2016/3/23.
 */
import './index.less'
import classNames from 'classnames'
import _ from 'lodash'
import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Form, Input, Button, Icon, Upload, Select, Modal, notification} from 'antd'
import {receiveDetail} from '../../actions/detail'
import imageConfig from '../../data/image'

const confirm = Modal.confirm
const FormItem = Form.Item

export default class Detail extends React.Component {
    constructor (props) {
        super(props)
    }

    cancel() {
        const { router } = this.context

        confirm({
            title: '您是否确定要取消表单的编辑',
            content: '取消之后表单内未提交的修改将会被丢弃',
            onOk() {
                router.goBack()
            },
            onCancel() {}
        })
    }

    componentWillMount () {
        const {actions} = this.props
        actions.receiveDetail('/v2/shop/1')
    }

    render () {
        const { grid } = this.props
        const data = null
        const {getFieldProps} = this.props.form
        const columns = grid.columns
        const rightColumns = _.dropRight(columns, 1)
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 }
        }
        console.log(imageConfig)
        return (
            <div>
                <p><Button onClick={()=>this.context.router.goBack()}>返回</Button></p>
                <br />

                <Form horizontal onSubmit={this.handleSubmit}>
                    {rightColumns.map(column => {
                        if(column.dataIndex != 'id')
                            if (column.type === undefined || column.type == null || column.type == 'text')
                                return (
                                    <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                        <Input {...getFieldProps(column.dataIndex)}/>
                                    </FormItem>
                                )
                            else if (column.type == 'textarea')
                                return (
                                    <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                        <Input type='textarea' {...getFieldProps(column.dataIndex)}/>
                                    </FormItem>
                                )
                            else if (column.type == 'select')
                                return (
                                    <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                        <Select style={{ width: 200 }} placeholder="请选择"
                                            {...getFieldProps(column.dataIndex)}>
                                            {column.selectOptions.map(option => (
                                                <Option key={option.key} value={option.key}>{option.value}</Option>
                                            ))}
                                        </Select>
                                    </FormItem>
                                )
                            else if(column.type == 'image')
                                return (
                                    <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                        <div>
                                            <Upload {...imageConfig}>
                                                <Icon type="plus" />
                                                <div className="ant-upload-text">上传照片</div>
                                            </Upload>
                                        </div>
                                    </FormItem>
                                )
                        })}
                    <FormItem wrapperCol={{ span: 12, offset: 7 }} >
                        <Button type="primary">提交</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.cancel.bind(this)}>取消</Button>
                    </FormItem>
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