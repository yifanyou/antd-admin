import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'

const SubMenu = Menu.SubMenu

import './index.less'

const defaultProps = {
  uid:0,
  items: [],
  currentIndex: 0
}

const propTypes = {
  uid: PropTypes.number,
  items: PropTypes.array,
  currentIndex: PropTypes.number
}

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    this.menuClickHandle = this.menuClickHandle.bind(this);
  }

  componentDidMount () {
    const uid = this.props.uid;
    this.props.getAllMenu(uid)
  }

  menuClickHandle (item) {
    this.props.updateNavPath(item.keyPath, item.key)
  }

  render () {
    const { items } = this.props
    let openKey = []
    const menu = items.map((item) => {
      openKey.push('sub'+item.id)
      return (
        <SubMenu
          key={'sub'+item.id}
          title={<span><Icon type='user' />{item.cname}</span>}
        >
          {item.subMenu.map((node) => {
            return (
              <Menu.Item key={'menu'+node.id}>
              <Link to={node.link} state={null}>{node.name}</Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      )
    });
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">
          <img src="/src/images/mnj-logo30.png" />
          <font size="3" color="#00A0E8">美柠家管理系统</font>
        </div>
        <Menu
          mode="inline" theme="dark"
          onClick={this.menuClickHandle}
        >
          {menu}
        </Menu>
      </aside>
    )
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    items: state.menu.items,
    currentIndex: state.menu.currentIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
