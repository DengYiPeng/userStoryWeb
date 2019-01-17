import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Message } from '@alifd/next';
import AuthForm from './AuthForm';

class LoginFrom extends Component {
  static displayName = 'LoginFrom';

  static propTypes = {};

  static defaultProps = {};

  formChange = (value) => {
    console.log('formChange:', value);
  };

  handleSubmit = (errors, values) => {
    const { match, location, history } = this.props;
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    var getInformation ={
      method:"POST",
      headers:{
      "Content-Type":"application/json"
      },
      /* json格式转换 */
      body:JSON.stringify({email:values.name,password:values.password})
      }
      fetch("http://119.23.29.56:2228/user/login",getInformation)
      .then(response => response.json())
      .then(json =>{
        if(json.code === 0){
          Message.success('登录成功',1000);
          history.push(`/home/${json.data}`)
        }
        else {
          Message.error('用户名或密码错误，请重试',1000);
        }
      })
  };

  render() {
    const config = [
      {
        label: '用户名',
        component: 'Input',
        componentProps: {
          placeholder: '用户名',
          size: 'large',
          maxLength: 20,
        },
        formBinderProps: {
          name: 'name',
          required: true,
          message: '必填',
        },
      },
      {
        label: '密码',
        component: 'Input',
        componentProps: {
          placeholder: '密码',
          htmlType: 'password',
        },
        formBinderProps: {
          name: 'password',
          required: true,
          message: '必填',
        },
      },
      {
        label: '记住账号',
        component: 'Checkbox',
        componentProps: {},
        formBinderProps: {
          name: 'checkbox',
        },
      },
      {
        label: '登录',
        component: 'Button',
        componentProps: {
          type: 'primary',
        },
        formBinderProps: {},
      },
    ];

    const initFields = {
      name: '',
      password: '',
      checkbox: false,
    };

    const links = [
      { to: '/register', text: '立即注册' },
      // { to: '/forgetpassword', text: '找回密码' },
    ];

    return (
      <AuthForm
        title="登录"
        config={config}
        initFields={initFields}
        formChange={this.formChange}
        handleSubmit={this.handleSubmit}
        links={links}
      />
    );
  }
}
export default withRouter(LoginFrom);