import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router'
import {createHistory} from 'history'

import configureStore from './store/configureStore'

import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import Shop from './containers/Shop'
import Detail from './containers/Detail'
import NotFound from './components/Page/NotFound'

import XTable from './containers/XTable'
import TableTest from './containers/TableTest'

import authUtils from './utils/auth'

const history = useRouterHistory(createHistory)({ basename: '' })
const store = configureStore();

const validate = function (next, replace, callback) {
  const isLoggedIn = authUtils.getToken()
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" onEnter={validate}>
        <IndexRedirect to="home" />
        <Route component={App}>
          <Route path="home" component={Home} />
          <Route path="shop_m" component={Shop}>
            <Route path="shop/:id" component={Detail} />
          </Route>
          <Route path="ttest" component={TableTest} >
            <Route path="add" component={Detail} />
          </Route>
        </Route>
        <Route path="login" component={Login} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
