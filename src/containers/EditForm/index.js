/**
 * Created by youyifan on 2016/3/23.
 */
import './index.less'

import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Spin, Form, Input, Button, Cascader, Icon, Upload, Select, Modal, notification} from 'antd'
import {initForm, fetchDetail, update} from '../../actions/editForm'
import imageConfig from '../../data/image'
import {buildOption} from '../../data/city.js'

const confirm = Modal.confirm
const FormItem = Form.Item

export default class EditForm extends React.Component {
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
                actions.update(grid.url, formData)
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
            },
            onCancel() {}
        })
    }

    updateCallback(){
        notification.success({
            message: '更新成功',
            description: '',
            duration: 1
        })

        this.context.router.goBack()
    }

    fetchDetailCallBack(data){
        const { form } = this.props
        form.setFieldsValue(data)
    }

    componentWillMount(){
        const { actions } = this.props
        actions.initForm()
    }
    
    componentDidMount(){
        const { actions, grid, params } = this.props
        let url = grid.url + '/' + params.id
        actions.fetchDetail(url)
    }

    componentWillReceiveProps(nextProps) {
        const { updated, data } = nextProps

        if (this.props.data == null && data != null) {
            this.fetchDetailCallBack(data)
        }

        if (!this.props.updated && updated)
            this.updateCallback()
    }

    render () {
        const { grid, data, form } = this.props
        
        if(data == null)
            return (<div className="spin-loading"><Spin size="large" /></div>)
        else {
            const { getFieldProps, getFieldValue } = this.props.form
            const columns = grid.columns
            const formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 10 }
            }

            return (
                <div>
                    <Form horizontal form={this.props.form}>
                        {columns.map(column => {
                            if(column.dataIndex == 'id'){
                                return (
                                    <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                        <Input {...getFieldProps(column.dataIndex)} disabled={true} />
                                    </FormItem>
                                )
                            } else
                                if(column.dataIndex !=null)
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
                                        const value = data[column.dataIndex]
                                        const option = value ? buildOption(value):[]

                                        return (
                                            <FormItem {...formItemLayout} label={column.title + "："} key={column.dataIndex}>
                                                <Cascader style={{ width: 200 }} allowClear={false} options={column.selectOptions} expandTrigger="hover" value={option}
                                                          displayRender={this.displayRender} onChange={this.onCascaderChange.bind(this, column.dataIndex)} />
                                                <Input type='hidden' {...getFieldProps(column.dataIndex, {'initialValue': column.defaultValue[1]})} />
                                            </FormItem>
                                        )
                                    }else if(column.type == 'image') {
                                        const formImageLayout = {
                                            labelCol: { span: 5 },
                                            wrapperCol: { span: 14 }
                                        }

                                        let imgConfig = Object.assign({}, imageConfig)
                                        imgConfig.onChange = this.onChange.bind(this, column.dataIndex)
                                        imgConfig.defaultFileList = []

                                        let val = getFieldValue(column.dataIndex)
                                        if(val!= undefined || val!=null){
                                            let imgs  = val.split(',')
                                            let count = 0
                                            for(let img of imgs)
                                                imgConfig.defaultFileList[count++] = {
                                                    uid: img,
                                                    name: img,
                                                    status: 'done',
                                                    url: 'http://localhost:9090/v2/image/'+ img,
                                                    thumbUrl: 'http://localhost:9090/v2/image/' + img
                                                }
                                        }

                                        return (
                                            <FormItem {...formImageLayout} label={column.title + "："} key={column.dataIndex}>
                                                <Upload {...imgConfig}>
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
}

EditForm.propTypes = {
    data: PropTypes.object,
    updating: PropTypes.bool
}

EditForm.defaultTypes = {
    data: null,
    updated: false
}

EditForm.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

EditForm = Form.create()(EditForm)

function mapStateToProps(state) {
    return {
        data: state.editForm.data,
        updated: state.editForm.updated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({initForm, fetchDetail, update}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)