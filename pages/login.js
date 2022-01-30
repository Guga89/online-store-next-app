import { notification } from 'antd';
// import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/authSlice';
import { useRouter } from 'next/router';
import LayOut from '../components/LayOut';
import Link from 'next/link';

const LoginModal = () => {
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.auth);
  const router = useRouter();

  const openNotification = () => {
    notification.open({
      message: 'Successfully signed in!',
      description: 'Welcome back and happy shopping!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post('/api/users/login', values);
      dispatch(logIn(data));
      openNotification();
      router.back();
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };
  return (
    <LayOut>
      <div
        className="container"
        style={{
          height: '50vh',
          width: '60%',
          margin: '100px auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <h1>Login page</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            type="email"
            rules={[
              {
                required: true,
                message: 'Please input your email address!',
                type: 'email',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email address"
              onChange={() => {
                // setEmail(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={() => {
                // setPassword(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <div className="modalFooter">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Log in
              </Button>
            </div>
          </Form.Item>
          <div className="modalFooter" style={{ textAlign: 'center' }}>
            <span style={{ marginLeft: '10px' }}>
              Or <Link href="/register">register now!</Link>
            </span>
          </div>
        </Form>
      </div>
    </LayOut>
  );
};

export default LoginModal;
