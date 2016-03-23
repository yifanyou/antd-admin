/**
 * Created by youyifan on 2016/3/20.
 */
import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Table, Button, Icon, Row, Col, Collapse, Alert } from 'antd';
import {getAllRow} from '../../actions/shop';

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
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
}, {
    title: '是否上线',
    dataIndex: 'isValid',
    key: 'isValid',
}, {
    title: '支持红包',
    dataIndex: 'isBonus',
    key: 'isBonus',
}, {
    title: '操作',
    key: 'operation',
    render(text, record) {
        return (
            <span>
            <a href="#">修改</a>
            <span className="ant-divider"></span>
            <a href="#"> 查看详情 </a>
            </span>
    );
    }
}];

// const data = [{
//     key: '1',
//     name: '胡彦斌',
//     age: 32,
//     address: '西湖区湖底公园1号'
// }, {
//     key: '2',
//     name: '胡彦祖',
//     age: 42,
//     address: '西湖区湖底公园1号'
// }, {
//     key: '3',
//     name: '李大嘴',
//     age: 32,
//     address: '西湖区湖底公园1号'
// }];

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

    componentDidMount () {
        this.props.getAllRow();
    }

    callback() {

    }

    render () {
        const {data} = this.props;
        return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary">添加</Button>
                <Button type="primary">删除</Button>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
        )
    }
}

Shop.propTypes = {
    data:PropTypes.array
}

function mapStateToProps(state) {
    return {
        data:state.shop.rows
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllRow: bindActionCreators(getAllRow, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
