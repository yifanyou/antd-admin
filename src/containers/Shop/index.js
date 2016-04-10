/**
 * Created by youyifan on 2016/3/20.
 */
import _ from 'lodash'
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Radio, Switch, Form, Input, Table, Modal, Button, Icon, Row, Col, Collapse, Alert, notification} from 'antd'
import {check, updatePagination, query, insert, update, del} from '../../actions/shop'
import {showModal} from '../../actions/editmodal'
import {Link} from 'react-router'
import EditModal from '../Modal/EditModal'
import gridHelper from '../../data/grid'
import classNames from 'classnames'

const confirm = Modal.confirm
const InputGroup = Input.Group;

export default class Shop extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        const{actions, } = this.props
        let request = {
            pageSize: 10,
            currentPage: 1,
            sortField: '',
            sortOrder: '',
            filters:''
        }

        actions.query(request)
    }

    handleOk(op, formData) {
        const {actions} = this.props

        let request = {
            pageSize: 10,
            currentPage: 1,
            sortField: '',
            sortOrder: '',
            filters:''
        }

        if(op=='add'){
            actions.insert(formData, (()=>actions.query(request)))
        } else if( op == 'edit') {
            actions.update(formData, (()=>actions.query(request)))
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
        })
    }

    onSelectChange(selectedRowKeys) {
        const{actions} = this.props
        actions.check(selectedRowKeys)
    }

    callback() {
        const {actions} = this.props
        let request = {
            pageSize: 10,
            currentPage: 1,
            sortField: '',
            sortOrder: '',
            filters:''
        }

        actions.query(request)
    }

    handleTableChange(pagination, filters, sorter) {
        const {actions} = this.props
        const pager = this.props.pagination
        pager.current = pagination.current
        pager.pageSize = pagination.pageSize

        actions.updatePagination(pager)

        let request = {
            pageSize: pagination.pageSize,
            currentPage: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        }

        actions.query(request)
    }

    render () {
        const {data, actions, selectedRowKeys, pagination} = this.props
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        }

        const grid = gridHelper.lookupGrid('shop')
        const columns = grid.columns

        const btnCls = classNames({
            'ant-search-btn': true
        });
        const searchCls = classNames({
            'ant-search-input': true
        });

        return (
            <div>
                {this.props.children ||
                (
                <div>
                    <div>
                        <div style={{marginBottom: 16, float:'left'}}>
                            <Button style={{marginRight: 5}} type="primary" onClick={()=>actions.showModal('add')}>添加</Button>
                            <Button style={{marginRight: 5}} type="primary" onClick={this.handleEdit.bind(this)}>修改</Button>
                            <Button style={{marginRight: 5}} type="primary" onClick={this.handleDelete.bind(this)}>删除</Button>
                        </div>
                    </div>
                    <Table rowKey={record => record.id} columns={columns} dataSource={data}
                           rowSelection={rowSelection} pagination={pagination} loading={this.props.loading}
                           onChange={this.handleTableChange.bind(this)}
                    />
                    <EditModal grid={grid} onOk={this.handleOk.bind(this)}/>
                </div>
                )
                }
            </div>
        )
    }
}

Shop.propTypes = {
    data: PropTypes.array,
    selectedRowKeys: PropTypes.array,
    loading: PropTypes.bool,
    pagination:PropTypes.object
}

Shop.defaultProps = {
    selectedRowKeys: [],
    loading: false,
    pagination: {
        pageSize: 10,
        currentPage: 1,
        showSizeChanger: true
    }
}

function mapStateToProps(state) {
    return {
        data: state.shop.rows,
        selectedRowKeys: state.shop.selectedRowKeys,
        loading:state.shop.loading,
        pagination:state.shop.pagination
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({check, updatePagination, query, insert, update, del, showModal}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
