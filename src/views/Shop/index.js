/**
 * Created by youyifan on 2016/3/20.
 */
import React from 'react'
import { Table, Icon, Row, Col, Collapse, Alert } from 'antd';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render(text) {
        return <a href="#">{text}</a>;
    }
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '操作',
    key: 'operation',
    render(text, record) {
        return (
            <span>
            <a href="#">新增</a>
            <span className="ant-divider"></span>
            <a href="#">修改</a>
            <span className="ant-divider"></span>
            <a href="#">删除</a>
            <span className="ant-divider"></span>
            <a href="#"> 查看详情 </a>
            </span>
    );
    }
}];
const data = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}, {
    key: '3',
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园1号'
}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
    getCheckboxProps(record) {
        return {

        };
    }
};

export default class Shop extends React.Component {
    constructor () {
        super()
    }

    componentWillMount () {
    }

    callback() {

    }

    render () {
        return (
        <div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    )
    }
}