import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'
import authUtils from '../../utils/auth'
import './index.less'

const SubMenu = Menu.SubMenu

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    let uid = authUtils.getUid()
    this.props.getAllMenu(uid)
  }

  menuClickHandle (item) {
    this.props.updateNavPath(item.keyPath, item.key)
  }

  render () {
    const {items} = this.props
    let openKey = []
    const menu = items.map((item) => {
      openKey.push('sub'+item.id)
      return (
        <SubMenu
          key={'sub'+item.id}
          title={<span><Icon type='user' />{item.cname}</span>}>
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
          <img src="/src/static/images/mnj-logo30.png" />
          <font size="3" color="#00A0E8">美柠家管理系统</font>
        </div>
        <Menu mode="inline" theme="dark"
          openKeys={openKey}
          onClick={this.menuClickHandle.bind(this)}>
          {menu}
        </Menu>
      </aside>
    )
  }
}

Sidebar.propTypes = {
    items: PropTypes.array,
    currentIndex: PropTypes.number
}

Sidebar.defaultProps = {
  items: [],
  currentIndex: 0
}

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
