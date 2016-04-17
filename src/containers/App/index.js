/**
 * Created by youyifan on 2016/4/17.
 */
import React from 'react'

import Popover from 'material-ui/lib/popover/popover'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu'
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more'
import ActionSignOut from 'material-ui/lib/svg-icons/action/power-settings-new'
import ActionLock from 'material-ui/lib/svg-icons/action/lock'
import Paper from 'material-ui/lib/paper'

import {Button, Row, Col, Icon, Breadcrumb} from 'antd'

import 'antd/style/index.less'
import './index.less'

const styles = {
    root: {
        position: 'relative',
        zIndex: 1100,
        width: '100%',
        minHeight: 64,
        backgroundColor: '#00bcd4',
        paddingLeft: 24,
        paddingRight: 24,
    },
    title: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0,
        paddingTop: 0,
        letterSpacing: 0,
        fontSize: 24,
        fontWeight: 400,
        color: '#ffffff',
        lineHeight: '64px',
    },
    breadcrumbOut: {
        lineHeight: '64px',
        alignSelf: 'center'
    },
    breadcrumbIn: {
        color: 'white',
    },
    mainElement: {
        boxFlex: 1,
        flex: '1',
    },
    iconButton: {
        style: {
            marginTop: 8,
            marginRight: 8,
            marginLeft: -16,
        },
        iconStyle: {
            fill: '#ffffff',
            color: '#ffffff',
        },
    },
    flatButton: {
        color: '#ffffff',
        marginTop: 12,
        textTransform: 'none'
    },
    menuElementRight: {
        textAlign: 'right'
    }
}


export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    handleTouchTap = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
        <div>
            <Paper
                rounded={false}
                style={styles.root}
                zDepth={1}
            >
                <Row>
                    <Col span="1">
                        <IconButton
                            style={styles.iconButton.style}
                            iconStyle={styles.iconButton.iconStyle}>
                            <NavigationMenu />
                        </IconButton>
                    </Col>
                    <Col span="3"><h1 style={styles.title}>美柠家</h1></Col>
                    <Col span="16" style={styles.breadcrumbOut}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>应用中心</Breadcrumb.Item>
                            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                            <Breadcrumb.Item>某应用</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span="4" style={styles.menuElementRight}>
                        <FlatButton
                            style={styles.flatButton}
                            label={<span>youyifan</span>}
                            labelPosition="before"
                            primary={true}
                            icon={<NavigationExpandMoreIcon />}
                            onTouchTap={this.handleTouchTap}
                        />
                    </Col>
                </Row>
            </Paper>
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
            >
                <MenuItem primaryText="修改密码"  leftIcon={<ActionLock />} />
                <MenuItem primaryText="登出"  leftIcon={<ActionSignOut />} />
            </Popover>
        </div>
        )
    }
}