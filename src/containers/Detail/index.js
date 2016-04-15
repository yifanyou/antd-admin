/**
 * Created by youyifan on 2016/3/23.
 */
import './index.less'

import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Row, Col, Spin, Form, Input, Button, Cascader, Icon, Upload, Select, Modal, notification} from 'antd'
import {fetchDetail} from '../../actions/detail'
import {imageUrl} from '../../data/image'
import {code} from '../../data/code'

const confirm = Modal.confirm
const FormItem = Form.Item

export default class Detail extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount () {
        const { grid, actions, params } = this.props
        console.log(this.props.params)
        actions.fetchDetail(grid.url + '/' + params.id)
    }

    componentDidMount(){

    }

    render () {
        const { data } = this.props

        if(data == null)
            return (<div className="spin-loading"><Spin size="large" /></div>)
        else {
            const {grid} = this.props
            const columns = grid.columns

            return (
                <div>
                    {columns.map(column => {
                        if(column.dataIndex !=null){
                            if (column.type === undefined || column.type == null || column.type == 'text') {
                                return (
                                    <Row key={column.dataIndex} style={{marginBottom:12}}>
                                        <Col span='4'>
                                            <p style={{textAlign:'right', fontWeight:'bold'}}>{column.title + '：'}</p>
                                        </Col>
                                        <Col span='20'>
                                            <p>{data[column.dataIndex]}</p>
                                        </Col>
                                        <br />
                                    </Row>
                                )
                            } else if (column.type == 'textarea'){
                                return (
                                    <Row key={column.dataIndex} style={{marginBottom:12}}>
                                        <Col span='4'>
                                            <p style={{textAlign:'right', fontWeight:'bold'}}>{column.title + '：'}</p>
                                        </Col>
                                        <Col span='20'>
                                            <p>{data[column.dataIndex]}</p>
                                        </Col>
                                        <br />
                                    </Row>
                                )
                            } else if (column.type == 'select'){
                                let selected = column.render(data[column.dataIndex], null)
                                return (
                                    <Row key={column.dataIndex} style={{marginBottom:12}}>
                                        <Col span='4'>
                                            <p style={{textAlign:'right', fontWeight:'bold'}}>{column.title + '：'}</p>
                                        </Col>
                                        <Col span='20'>
                                            {selected}
                                        </Col>
                                    </Row>
                                )
                            } else if(column.type == 'image'){
                                let imgSrc = imageUrl + '/' + data[column.dataIndex]
                                return (
                                    <Row key={column.dataIndex} style={{marginBottom:12}}>
                                        <Col span='4'>
                                            <p style={{textAlign:'right', fontWeight:'bold'}}>{column.title + '：'}</p>
                                        </Col>
                                        <Col span='20'>
                                            <a href={imgSrc} target="_blank">
                                                <img src={imgSrc} style={{height:200, width:200, border:1}} />
                                            </a>
                                        </Col>
                                    </Row>
                                )
                            }
                        }
                    })}
                </div>
            )
        }
    }
}

Detail.propTypes = {
    data: PropTypes.object
}

Detail.defaultTypes = {
    data: null
}

Detail.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        data: state.detail.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({fetchDetail}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)