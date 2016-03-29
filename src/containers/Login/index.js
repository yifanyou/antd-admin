import React, { PropTypes } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../actions/user'

const FormItem = Form.Item

import './index.less'

class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
      const error = nextProps.loginErrors;
      const isLoggingIn = nextProps.loggingIn;
      const uid = nextProps.uid;

      if(error && error.indexOf('offline')>0){
          notification.error({
              message: '登录失败',
              description: '网络问题',
              duration: 1
          });
      }else if (error != this.props.loginErrors && error) {
          notification.error({
              message: '登录失败',
              description: '错误的用户名或者密码',
              duration: 1
          });
      }

      if (!isLoggingIn && !error && uid)  {
          notification.success({
              message: '登录成功',
              description: '',
              duration: 1
          });
      }

      if (uid) {
          this.context.router.replace('/home');
      }
  }

  handleSubmit (e) {
    e.preventDefault()
    const {actions} = this.props
      
    const data = this.props.form.getFieldsValue()
    actions.login(data.user, data.password)
  }

  render () {
    const { getFieldProps } = this.props.form
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem
              label='用户名：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}>
              <Input placeholder='请输入账号' {...getFieldProps('user')} />
            </FormItem>
            <FormItem
              label='密码：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}>
              <Input type='password' placeholder='请输入密码' {...getFieldProps('password')} />
            </FormItem>
            <Row>
              <Col span='16' offset='6'>
                <Button type='primary' htmlType='submit'>确定</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

Login.propTypes = {
    uid: PropTypes.number,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
}

Login = Form.create()(Login);

function mapStateToProps(state) {
  const {user} = state;
  if (user.uid) {
      return {uid: user.uid, loggingIn: user.loggingIn, loginErrors: ''};
  }
  return {uid: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({login}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)