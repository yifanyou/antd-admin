import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import NavPath from '../../containers/NavPath'
import Sidebar from '../../containers/Sidebar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {logout, fetchProfile} from '../../actions/user'

import authUtils from '../../utils/auth'

import 'antd/style/index.less';
import './index.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const {actions, uid} = this.props
    let realUid = uid?uid:authUtils.getUid()
    actions.fetchProfile(realUid)
  }

  logout(){
    this.props.actions.logout();
    this.context.router.replace('/login');
  }

  render() {
    const {uid, profile, actions} = this.props
    let realUid = uid?uid:authUtils.getUid()
    return (
      <div className="ant-layout-aside">
        <Sidebar uid={realUid} />
        <div className="ant-layout-main">
          <Header profile={profile} logout={this.logout.bind(this)} />
          <NavPath />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  uid: PropTypes.number,
  profile: PropTypes.object,
  children: PropTypes.node.isRequired
};

App.contextTypes = {
  history: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {user} = state
  return {
    uid: user.uid ? user.uid : null,
    profile: user.profile ? user.profile:null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({logout, fetchProfile}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
