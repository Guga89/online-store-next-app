import { Modal } from 'antd';
// import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/authSlice';

const LoginModal = (props) => {
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.auth);

  const handleCancel = () => {
    props.hideModal(false); //should be true but for now it is reversed due to passed state requires false value to hide
  };

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     props.hideModal(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post('/api/users/login', values);
      dispatch(logIn(data));
      alert('successfully loged in!');
      handleCancel();
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };
  return (
    <Modal
      title="Login"
      visible={props.visible}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={
        <div className="modalFooter" style={{ textAlign: 'center' }}>
          <span style={{ marginLeft: '10px' }}>
            Or <a href="">register now!</a>
          </span>
        </div>
      }
    >
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
      </Form>
    </Modal>
  );
};

export default LoginModal;
