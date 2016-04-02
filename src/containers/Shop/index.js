/**
 * Created by youyifan on 2016/3/20.
 */
import _ from 'lodash'
import React, { PropTypes } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Radio, Switch, Form, Input, Table, Modal, Button, Icon, Row, Col, Collapse, Alert, notification} from 'antd'
import {Link} from 'react-router'
import {check, getAllRow, insert, update, del} from '../../actions/shop'
import {showModal} from '../../actions/editmodal'
import EditModal from '../Modal/EditModal'

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

    componentWillMount () {
        const{actions} = this.props
        actions.getAllRow()
    }

    handleOk(op, formData) {
        const {actions} = this.props
        if(op=='add'){
            actions.insert(formData, (()=>actions.getAllRow()))
        } else if( op == 'edit') {
            actions.update(formData, (()=>actions.getAllRow()))
        }
    }

    handleEdit(){
        const {data, selectedRowKeys, actions} = this.props
        if(selectedRowKeys.length!=1){
            notification.error({
                message: '请勾选一项',
                description: '',
                duration: 1
            })
            return
        }

        let checkedRow = _.find(data, function(row){
            return row.id == selectedRowKeys[0]
        })

        actions.showModal('edit', checkedRow)
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
                let ids = new Array()
                _.forEach(selectedRowKeys, function(id, i){
                    ids[i] = {id:id}
                })
                actions.del(JSON.stringify(ids), callback)
            },
            onCancel() {}
        });
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
        console.log('shop index ................................')
        const {data, actions, selectedRowKeys} = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        }

        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button style={{marginRight: 5}} type="primary" onClick={()=>actions.showModal('add')}>添加</Button>
                    <Button style={{marginRight: 5}} type="primary" onClick={this.handleEdit.bind(this)}>修改</Button>
                    <Button style={{marginRight: 5}} type="primary" onClick={this.handleDelete.bind(this)}>删除</Button>
                </div>
                <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={data} />

                <EditModal onOk={this.handleOk} />
            </div>
        )
    }
}

Shop.propTypes = {
    data: PropTypes.array,
    selectedRowKeys: PropTypes.array
}

Shop.defaultProps = {
    selectedRowKeys: []
}

function mapStateToProps(state) {
    return {
        data: state.shop.rows,
        selectedRowKeys: state.shop.selectedRowKeys
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({check, getAllRow, insert, update, del, showModal}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
