/**
 * Created by youyifan on 2016/3/20.
 */
import React, { PropTypes } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Radio, Switch, Form, Input, Table, Modal, Button, Icon, Row, Col, Collapse, Alert, notification} from 'antd'
import { Link } from 'react-router'
import {updateNavPath} from '../../actions/menu'
import {getAllRow, insert, showAddModel, hideAddModel} from '../../actions/shop'

import menuUtils from '../../utils/menu'

const FormItem = Form.Item;
const RadioGroup = Radio.Group

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
        var url = '/4/401/shop/' + record.id;
        return (
            <span>
                <Link to={url}>查看详情</Link>
            </span>
    );
    }
}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
    getCheckboxProps(record) {
        return {

        };
    }
};

export default class Shop extends React.Component {
    constructor (props) {
        super(props)
    }


    handleOk(e) {
        const formData = this.props.form.getFieldsValue()
        console.log(this.props.form.getFieldsValue())
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
        });
    }

    // handleCancel() {
    //     this.props.hideAddModel();
    // }

    componentDidMount () {
        const{actions, route} = this.props
        actions.getAllRow()
    }

    callback() {
    }

    render () {
        const {data} = this.props
        const {getFieldProps} = this.props.form
        return (
        <div>
            <div style={{marginBottom: 16}}>
                <Button style={{marginRight: 5}} type="primary" onClick={()=>this.props.actions.showAddModel()}>添加</Button>
                <Button style={{marginRight: 5}} type="primary" >修改</Button>
                <Button style={{marginRight: 5}} type="primary">删除</Button>
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
    data: PropTypes.array
}

function mapStateToProps(state) {
    return {
        data: state.shop.rows,
        visible: state.shop.visible,
        loading: state.shop.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({getAllRow, insert, showAddModel, hideAddModel, updateNavPath}, dispatch)
    }
}

Shop = Form.create()(Shop)

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
