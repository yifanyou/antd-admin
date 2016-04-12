/**
 * Created by youyifan on 2016/3/23.
 */
import './index.less'
import classNames from 'classnames'
import _ from 'lodash'
import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Form, Input, Button, Cascader, Icon, Upload, Select, Modal, notification} from 'antd'
import {receiveDetail, insert} from '../../actions/detail'
import imageConfig from '../../data/image'

const confirm = Modal.confirm
const FormItem = Form.Item

export default class Detail extends React.Component {
    constructor (props) {
        super(props)
    }

    handleSubmit(e) {
        e.preventDefault()
        const { grid, actions, form } = this.props

        form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            } else {
                const formData = form.getFieldsValue()
                actions.insert(grid.url, formData, this.insertCallback.bind(this))
            }
        })


    }

    insertCallback(e){
        notification.success({
            message: '新增成功',
            description: '',
            duration: 1
        })

        this.context.router.goBack()
    }

    handleCancel() {
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

    //Upload
    onChange(name, obj){
        const { form } = this.props
        const { file } = obj

        if(file.status == 'done'){
            let fields = new Object()
            fields[name] = file.response.result
            
            form.setFieldsValue(fields)
        }
    }

    //Cascader 只展示最后一项
    displayRender(label) {
        return label[label.length - 1]
    }
    onCascaderChange(name, value) {
        const { form } = this.props
        let choose = value?value[1]:''
        let fields = new Object()
        fields[name] = choose
        form.setFieldsValue(fields)
        console.log(form.getFieldsValue())
    }

    componentWillMount () {

    }

    render () {
        const { grid } = this.props
        const data = null
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form
        const columns = grid.columns
        const rightColumns = _.dropRight(columns, 1)
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 }
        }

        return (
            <div>
                <p><Button onClick={()=>this.context.router.goBack()}>返回</Button></p>
                <br />

                <Form horizontal form={this.props.form}>
                    {rightColumns.map(column => {
                        if(column.dataIndex != 'id')
                            if (column.type === undefined || column.type == null || column.type == 'text') {
                                if(column.fieldProps == null)
                                    return (
                                        <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                            <Input {...getFieldProps(column.dataIndex)} placeholder={column.placeholder?column.placeholder:''} />
                                        </FormItem>
                                    )
                                else
                                    return (
                                        <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex} hasFeedback>
                                            <Input {...getFieldProps(column.dataIndex, column.fieldProps)}  placeholder={column.placeholder?column.placeholder:''} />
                                        </FormItem>
                                    )
                            } else if (column.type == 'textarea'){
                                if(column.fieldProps == null)
                                    return (
                                        <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                            <Input type='textarea' {...getFieldProps(column.dataIndex)}  placeholder={column.placeholder?column.placeholder:''} />
                                        </FormItem>
                                    )
                                else
                                    return (
                                        <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex} hasFeedback>
                                            <Input type='textarea' {...getFieldProps(column.dataIndex, column.fieldProps)}  placeholder={column.placeholder?column.placeholder:''} />
                                        </FormItem>
                                    )
                            } else if (column.type == 'select'){
                                if(column.fieldProps == null)
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
                                else
                                    return (
                                        <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                            <Select style={{ width: 200 }} placeholder="请选择"
                                                {...getFieldProps(column.dataIndex, column.fieldProps)}>
                                                {column.selectOptions.map(option => (
                                                    <Option key={option.key} value={option.key}>{option.value}</Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                    )
                            }else if(column.type == 'cascader') {
                                return (
                                    <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                        <Cascader style={{ width: 200 }} options={column.selectOptions} expandTrigger="hover" defaultValue={column.defaultValue}
                                                  displayRender={this.displayRender} onChange={this.onCascaderChange.bind(this, column.dataIndex)} />
                                        <Input type='hidden' {...getFieldProps(column.dataIndex, {'initialValue': column.defaultValue[1]})} />
                                    </FormItem>
                                )
                            }else if(column.type == 'image') {
                                let imgConfig = imageConfig
                                imgConfig.onChange = this.onChange.bind(this, column.dataIndex)
                                return (
                                    <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                        <Upload {...imageConfig}>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传照片</div>
                                        </Upload>
                                        <Input type='hidden' {...getFieldProps(column.dataIndex)} />
                                    </FormItem>
                                )
                            }
                        })}
                    <FormItem wrapperCol={{ span: 12, offset: 7 }} >
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleCancel.bind(this)}>取消</Button>
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
        actions: bindActionCreators({receiveDetail, insert}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)