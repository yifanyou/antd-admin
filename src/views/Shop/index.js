/**
 * Created by youyifan on 2016/3/20.
 */
import React, { PropTypes } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Table, Modal, Button, Icon, Row, Col, Collapse, Alert } from 'antd'
import { Link } from 'react-router'
import {getAllRow, showAddModel, hideAddModel} from '../../actions/shop'

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


    handleOk() {
        const {actions} = this.props
        setTimeout(() => {
            actions.hideAddModel();
        }, 3000);
    }
    //
    // handleCancel() {
    //     this.props.hideAddModel();
    // }

    componentDidMount () {
        const{actions} = this.props;
        actions.getAllRow();
    }

    callback() {

    }

    render () {
        const {data} = this.props;
        return (
        <div>
            <div style={{marginBottom: 16}}>
                <Button style={{marginRight: 5}} type="primary" onClick={()=>this.props.actions.showAddModel()}>添加</Button>
                <Button style={{marginRight: 5}} type="primary" >修改</Button>
                <Button style={{marginRight: 5}} type="primary">删除</Button>
            </div>
            <Modal ref="modal"
                   visible={this.props.visible}
                   title="对话框标题" onOk={this.handleOk} onCancel={()=>this.props.actions.hideAddModel()}
                   footer={[
            <Button key="back" type="ghost" size="large" onClick={()=>this.props.actions.hideAddModel()}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleOk}>
              提 交
            </Button>
             ]}>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
                <p>对话框的内容</p>
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
        actions: bindActionCreators({getAllRow,showAddModel,hideAddModel}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
