import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NavPath from '../../components/NavPath'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import {logout, fetchProfile} from '../../actions/user';

import 'antd/style/index.less';
import './index.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  logout(){
    this.props.logout();
    this.context.router.replace('/login');
  }

  render() {
    const {user, profile, actions} = this.props;
    return (
      <div className="ant-layout-aside">
        <Sidebar />
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
  user: PropTypes.object,
  profile: PropTypes.object,
  children: PropTypes.node.isRequired
};

App.contextTypes = {
  history: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const {user} = state;
  return {
      user: user ? user.user : null,
      profile: user ? user.profile:null
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({logout, fetchProfile}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
