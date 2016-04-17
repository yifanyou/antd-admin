/**
 * Created by youyifan on 2016/3/23.
 */
import './index.less'

import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Spin, Form, Input, Button, Cascader, Icon, Upload, Select, Modal, notification} from 'antd'
import {insert} from '../../actions/addForm'
import imageConfig from '../../data/image'

const confirm = Modal.confirm
const FormItem = Form.Item

export default class AddForm extends React.Component {
    constructor (props) {
        super(props)
    }

    //Upload
    onChange(name, obj){
        const { form } = this.props
        const { file } = obj
        if(file.status == 'done'){
            const { response } = file
            form.setFieldsValue({[name]: response.result})
        }
    }

    //Cascader 只展示最后一项
    displayRender(label) {
        return label[label.length - 1]
    }
    onCascaderChange(name, value) {
        const { form } = this.props
        let choose = value ? value[1] : ''
        form.setFieldsValue({[name]: choose})
    }

    handleSubmit(e) {
        e.preventDefault()
        const { grid, actions, form } = this.props

        form.validateFields((errors, values) => {
            if (!!errors) {
                return
            } else {
                const formData = form.getFieldsValue()
                actions.insert(grid.url, formData)
            }
        })
    }

    handleCancel() {
        const { form } = this.props
        const { router } = this.context

        confirm({
            title: '您是否确定要取消表单的编辑',
            content: '取消之后表单内未提交的修改将会被丢弃',
            onOk() {
                router.goBack()
                form.resetFields()
            },
            onCancel() {}
        })
    }

    insertCallback(){
        notification.success({
            message: '新增成功',
            description: '',
            duration: 1
        })

        this.context.router.goBack()
    }

    componentWillReceiveProps(nextProps) {
        const { inserted } = nextProps

        if (this.props.inserted !=inserted && !inserted)
            this.insertCallback()

    }

    render () {
        const { grid } = this.props
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form
        const columns = grid.columns
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 }
        }

        return (
            <div>
                <Form horizontal form={this.props.form}>
                    {columns.map(column => {
                        if(column.dataIndex != 'id')
                            if(column.dataIndex !=null)
                                if (column.type === undefined || column.type == null || column.type == 'text') {
                                    if(column.fieldProps == null)
                                        return (
                                            <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                                <Input {...getFieldProps(column.dataIndex)} placeholder={column.placeholder ? column.placeholder:''} />
                                            </FormItem>
                                        )
                                    else
                                        return (
                                            <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex} hasFeedback>
                                                <Input {...getFieldProps(column.dataIndex, column.fieldProps)}  placeholder={column.placeholder ? column.placeholder:''} />
                                            </FormItem>
                                        )
                                } else if (column.type == 'textarea'){
                                    if(column.fieldProps == null)
                                        return (
                                            <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                                <Input type='textarea' size='large' {...getFieldProps(column.dataIndex)}  placeholder={column.placeholder?column.placeholder:''} />
                                            </FormItem>
                                        )
                                    else
                                        return (
                                            <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex} hasFeedback>
                                                <Input type='textarea' size='large' {...getFieldProps(column.dataIndex, column.fieldProps)}  placeholder={column.placeholder?column.placeholder:''} />
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
                                            <Cascader style={{ width: 200 }} allowClear={false} options={column.selectOptions} expandTrigger="hover" defaultValue={column.defaultValue}
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

AddForm.propTypes = {
    inserted: PropTypes.bool
}

AddForm.defaultTypes = {
    inserted: false
}

AddForm.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

AddForm = Form.create()(AddForm)

function mapStateToProps(state) {
    return {
        inserted: state.addForm.inserted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({insert}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)