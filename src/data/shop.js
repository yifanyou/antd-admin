import React from 'react'
import {Link} from 'react-router'
import {citys} from './city.js'
import {code} from './code.js'

export const shop = {
    name:'shop',
    title:'',
    url:'/v2/shop',
    columns:[{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 50,
        render(text) {
            return <a href="#">{text}</a>
        }
    }, {
        title: '门店照片',
        dataIndex: 'image',
        key: 'image',
        hidden: true,
        type: 'image'
    }, {
        title: '门店名称',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fieldProps: {
            rules: [
                { required: true, message: '必填' }
            ]
        },
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length
    }, {
        title: '所属品牌',
        dataIndex: 'brand',
        key: 'brand',
        width: 85
    }, {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width: 200
    }, {
        title: 'BD系统状态',
        dataIndex: 'shopStatus',
        key: 'shopStatus',
        width: 100,
        type: 'select',
        selectOptions: code.shopStatus,
        fieldProps: {
            initialValue: '20'
        },
        render(text, record) {
            let item = code.shopStatus.find(item => item.key == text)
            return (<p>{item.value}</p>)
        }
    }, {
        title: '是否上线',
        dataIndex: 'isValid',
        key: 'isValid',
        width: 80,
        type: 'select',
        selectOptions: code.isValid,
        fieldProps: {
            initialValue: '0'
        },
        render(text, record) {
            let item = code.isValid.find(item => item.key == text)
            return (<p>{item.value}</p>)
        }
    }, {
        title: '支持红包',
        dataIndex: 'isBonus',
        key: 'isBonus',
        width: 80,
        type: 'select',
        selectOptions: code.isBonus,
        fieldProps: {
            initialValue: '0'
        },
        render(text, record) {
            let item = code.isBonus.find(item => item.key == text)
            return (<p>{item.value}</p>)
        }
    }, {
        title: '门店描述',
        dataIndex: 'description',
        key: 'description',
        type: 'textarea',
        hidden: true
    }, {
        title: '美容师是否操作所有项目',
        dataIndex: 'isBeautiAllItem',
        key: 'isBeautiAllItem',
        hidden: true,
        type: 'select',
        selectOptions: code.isBeautiAllItem,
        fieldProps: {
            initialValue: '1'
        },
        render(text, record) {
            let item = code.isBeautiAllItem.find(item => item.key == text)
            return (<p>{item.value}</p>)
        }
    }, {
        title: '所属城市',
        dataIndex: 'city',
        key: 'city',
        hidden: true,
        type: 'cascader',
        defaultValue:['18', '224'],
        selectOptions: citys
    }, {
        title: '区县',
        dataIndex: 'district',
        key: 'district',
        hidden: true
    }, {
        title: '商圈',
        dataIndex: 'businessDistrict',
        key: 'businessDistrict',
        hidden: true
    }, {
        title: '门店电话',
        dataIndex: 'tel',
        key: 'tel',
        hidden: true
    }, {
        title: '经度',
        dataIndex: 'longitude',
        key: 'longitude',
        hidden: true
    }, {
        title: '纬度',
        dataIndex: 'latitude',
        key: 'latitude',
        hidden: true
    }, {
        title: '操作',
        key: 'operation',
        width: 80,
        render(text, record) {
            return (
                <span>
                <Link to={'/shop_m/shop/' + record.id}>详情</Link>
            </span>
            )
        }
    }]
}

const userExists = function(rule, value, callback) {
    if (!value) {
        callback();
    } else {
        setTimeout(() => {
            if (value === 'JasonWood') {
                callback([new Error('抱歉，该用户名已被占用。')]);
            } else {
                callback();
            }
        }, 800);
    }
}