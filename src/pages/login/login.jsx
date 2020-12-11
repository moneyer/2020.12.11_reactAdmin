import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  message,
} from 'antd'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import './login.less'
import logo from './images/logo.png'

/**
 * 登录的路由组件
 * @export
 * @class Login
 * @extends {Component}
 */
export default class Login extends Component {

  // handleSubmit = (event) => {
  //   // 阻止事件的默认行为
  //   event.preventDefault()
  //   message.success('点击啦。。。。')

  //   // this.props.form.validateFields()
  // }

  /*
  对密码进行自定义验证
  */
  /*
  用户名/密码的的合法性要求
    1). 必须输入
    2). 必须大于等于4位
    3). 必须小于等于12位
    4). 必须是英文、数字或下划线组成
    */
    validatePwd = (rule, value, callback) => {
    console.log('validatePwd()', rule, value)
    if(!value) {
      callback('密码必须输入')
    } else if (value.length<4) {
      callback('密码长度不能小于4位')
    } else if (value.length>12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
    // callback('xxxx') // 验证失败, 并指定提示的文本
  }

  render() {
    
    const onFinish = values => {
      message.success('成功。。。。')
      console.log('Success:', values);
      const {username, password} = values
      // const result = await reqLogin(username, password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
    };
  
    const onFinishFailed = errorInfo => {
      console.log('检验失败!')
      message.error('失败。。。。')
      console.log('Failed:', errorInfo);
    };



    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>react项目：后台管理项目</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            // {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="login-form"
          >
            <Form.Item
              // label="用户名"
              name="username"
              // 声明式验证: 直接使用别人定义好的验证规则进行验证
              rules={[
                { required: true, message: '用户名必须输入' },
                { min: 4, message: '用户名至少4位' },
                { max: 12, message: '用户名最多12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                ]}
              initialValue="admin" // 初始值
            >
              <Input 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            </Form.Item>

            <Form.Item
              // label="密码"
              name="password"
              rules={[
                    {
                      validator: this.validatePwd
                    }
                  ]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}