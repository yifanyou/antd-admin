/**
 * Created by youyifan on 2016/4/7.
 */
import _ from 'lodash'
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Radio, Switch, Form, Input, Table, Modal, Button, Icon, Row, Col, Collapse, Alert, notification} from 'antd'
import SearchInput from '../../components/SearchInput'
import {query, insert, update, del, search, updatePagination} from '../../actions/xTable'

const confirm = Modal.confirm

export default class XTable extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data:[],
            selectedRowKeys: []
        }
    }

    handleSearch(search){
        const { actions, grid, pagination } = this.props
        let params = {
            pageSize: pagination.pageSize,
            current: 1,
            search: search
        }
        actions.search(grid.url +　'/search', params)
    }

    showSizeChange(current, pageSize) {
        const {actions} = this.props
        let pager = this.props.pagination
        pager.pageSize = pageSize
        actions.updatePagination(pager)
    }

    pageChange(current) { }

    selectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys })
    }

    handleTableChange(pagination, filters, sorter) {
        console.log('test3+')
        const { actions, grid } = this.props
        let pager = this.props.pagination
        pager.current = pagination.current
        actions.updatePagination(pager)
        
        let params = {
            pageSize: pagination.pageSize,
            current: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        }
        
        actions.query(grid.url, params)
    }

    handleInsert() {
        this.context.router.push({
            pathname: window.location.pathname + '/add',
            state: null
        })
    }

    handleUpdate() {
        const {selectedRowKeys} = this.state
        const {data, actions} = this.props
        if(selectedRowKeys.length!=1){
            notification.error({
                message: '请选择编辑项',
                description: '只能勾选一项',
                duration: 1
            })
            return
        }

        let checkedRow = _.find(data, function(row){
            return row.id == selectedRowKeys[0]
        })

        this.context.router.push({
            pathname: window.location.pathname + '/edit/'+selectedRowKeys[0],
            state: null
        })
    }

    handleDelete() {
        const { actions, grid } = this.props
        const { selectedRowKeys } = this.state
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
                actions.del(grid.url, JSON.stringify(ids), callback)
            },
            onCancel() {}
        })
    }

    callback() {
        let pager = this.props.pagination
        const {actions, grid} = this.props
        const params = {
            pageSize: 10,
            current: 1
        }
        pager.current = params.current
        this.setState({
            selectedRowKeys: []
        })
        actions.updatePagination(pager)

        actions.query(grid.url, params)
        notification.success({
            message: '删除成功',
            description: '',
            duration: 1
        })
    }

    componentDidMount() {
        const { actions, grid } = this.props
        let params = {
            pageSize: 10,
            current: 1
        }
        actions.query(grid.url, params)
    }

    render () {
        const { grid, data, pagination, loading} = this.props
        const { columns } = grid
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.selectChange.bind(this)
        }

        let showColumns = _.filter(columns, function(col){
            return col.hidden == null || col.hidden == false
        })

        let paginationWithEvent = Object.assign({}, pagination, {
            onShowSizeChange:this.showSizeChange.bind(this),
            onChange:this.pageChange.bind(this)
        })

        return (
            <div>
                <Row style={{marginBottom: 8, zIndex: 0}}>
                    <Col span="18">
                        <Button style={{marginRight: 5}} type="primary" onClick={this.handleInsert.bind(this)}>新增</Button>
                        <Button style={{marginRight: 5}} type="primary" onClick={this.handleUpdate.bind(this)}>修改</Button>
                        <Button style={{marginRight: 5}} type="primary" onClick={this.handleDelete.bind(this)}>删除</Button>
                    </Col>
                    <Col span="6">
                        <SearchInput placeholder="搜索名字/品牌/地址" onSearch={this.handleSearch.bind(this)} />
                    </Col>
                </Row>

                <Table bordered size='middle'
                       rowKey={record => record.id}
                       rowSelection={rowSelection}
                       columns={showColumns}
                       dataSource={data}
                       pagination={paginationWithEvent}
                       loading={loading}
                       onChange={this.handleTableChange.bind(this)} />
            </div>
        )
    }
}

XTable.propTypes = {
    data: PropTypes.array,
    pagination:PropTypes.shape({
        pageSize: React.PropTypes.number,
        current: React.PropTypes.number,
        showSizeChanger: React.PropTypes.bool,
        total:React.PropTypes.number,
        onShowSizeChange:React.PropTypes.func,
        onChange:React.PropTypes.func
    }),
    loading: PropTypes.bool
}

XTable.defaultProps = {
    pagination: {
        pageSize: 10,
        current: 1,
        showSizeChanger: true,
        total:0
    },
    loading: false
}

XTable.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        data: state.xTable.data,
        pagination:state.xTable.pagination,
        loading:state.xTable.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({query, insert, update, del, search, updatePagination}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(XTable)