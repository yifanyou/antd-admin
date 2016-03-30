/**
 * Created by youyifan on 2016/3/20.
 */
import _ from 'lodash'
import React, { PropTypes } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Radio, Switch, Form, Input, Table, Modal, Button, Icon, Row, Col, Collapse, Alert, notification} from 'antd'
import {Link} from 'react-router'
import {check, getAllRow, insert, del, showAddModel, hideAddModel} from '../../actions/shop'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const confirm = Modal.confirm

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    render(text) {
        return <a href="#">{text}</a>;
    }
}, {
    title: '门店名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '所属品牌',
    dataIndex: 'brand',
    key: 'brand',
    width: 80
}, {
    title: '是否上线',
    dataIndex: 'isValid',
    key: 'isValid',
    width: 80
}, {
    title: '支持红包',
    dataIndex: 'isBonus',
    key: 'isBonus',
    width: 80
}, {
    title: '操作',
    key: 'operation',
    width: 80,
    render(text, record) {
        var url = '/shop/' + record.id;
        return (
            <span>
                <Link to={url}>查看详情</Link>
            </span>
    );
    }
}];

export default class Shop extends React.Component {
    constructor (props) {
        super(props)
    }

    handleOk(e) {
        const formData = this.props.form.getFieldsValue()
        //校验
        
        //
        const {actions} = this.props
        actions.insert(formData)
        actions.getAllRow()
        this.props.form.resetFields()
        
        setTimeout(() => {
            actions.hideAddModel()
        }, 1000)

        notification.success({
            message: '新增成功',
            description: '',
            duration: 1
        })
    }

    handleDelete(){
        const {actions, selectedRowKeys} = this.props
        const callback = this.callback.bind(this)

        if(!selectedRowKeys||selectedRowKeys.length<=0){
            notification.error({
                message: '请勾选删除项',
                description: '',
                duration: 1
            })
            return
        }

        confirm({
            title: '您是否确认要删除勾选项',
            content: '',
            onOk() {
                console.log(selectedRowKeys)
                let ids = new Array()
                _.forEach(selectedRowKeys, function(id, i){
                    ids[i] = {id:id}
                })
                actions.del(JSON.stringify(ids), callback)
            },
            onCancel() {}
        });
    }

    componentDidMount () {
        const{actions} = this.props
        actions.getAllRow()
    }

    onSelectChange(selectedRowKeys) {
        const{actions} = this.props
        actions.check(selectedRowKeys)
    }

    callback() {
        const {actions} = this.props
        actions.getAllRow()
    }

    render () {
        const {data, actions, selectedRowKeys} = this.props
        const {getFieldProps} = this.props.form

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        };

        return (
        <div>
            <div style={{marginBottom: 16}}>
                <Button style={{marginRight: 5}} type="primary" onClick={()=>actions.showAddModel()}>添加</Button>
                <Button style={{marginRight: 5}} type="primary">修改</Button>
                <Button style={{marginRight: 5}} type="primary" onClick={this.handleDelete.bind(this)}>删除</Button>
            </div>

            <Modal ref="modal"
                   visible={this.props.visible}
                   title="新增门店" onOk={this.handleOk} onCancel={()=>this.props.actions.hideAddModel()}
                   footer={[
            <Button key="back" type="ghost" size="large" onClick={()=>this.props.actions.hideAddModel()}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleOk.bind(this)}>
              提 交
            </Button>
             ]}>
                <Form horizontal>
                    <FormItem
                        label="门店名称："
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}>
                        <Input {...getFieldProps('name')} />
                    </FormItem>
                    <FormItem
                        label="所属品牌："
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}>
                        <Input {...getFieldProps('brand')} />
                    </FormItem>
                    <FormItem
                        label="地址："
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}>
                        <Input {...getFieldProps('address')} />
                    </FormItem>
                    <FormItem
                        label="是否上线："
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}>
                        <RadioGroup {...getFieldProps('isValid', { initialValue: '0' })}>
                            <Radio value="0">下线</Radio>
                            <Radio value="1">上线</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        label="支持红包："
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}>
                        <RadioGroup {...getFieldProps('isBonus', { initialValue: '0' })}>
                            <Radio value="0">不支持</Radio>
                            <Radio value="1">支持</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </Modal>

            <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
        )
    }
}

Shop.propTypes = {
    loading: PropTypes.bool,
    visible: PropTypes.bool,
    data: PropTypes.array,
    selectedRowKeys: PropTypes.array
}

Shop.defaultProps = {
    selectedRowKeys: []
}

function mapStateToProps(state) {
    return {
        data: state.shop.rows,
        visible: state.shop.visible,
        loading: state.shop.loading,
        selectedRowKeys: state.shop.selectedRowKeys
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({check, getAllRow, insert, del, showAddModel, hideAddModel}, dispatch)
    }
}

Shop = Form.create()(Shop)

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
