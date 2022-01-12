import LayOut from '../components/LayOut';
import { Form, Input, Select, Button, notification } from 'antd';
import { Option } from 'antd/lib/mentions';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/authSlice';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //========================== Popup Notifications ====================
  const openNotification = () => {
    notification.open({
      message: 'Thank you for registration',
      description:
        'Happy shopping! Let us know if you have any suggestions, you feedback is highly appreciated!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  //===============================  FORM ===============================
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.post('/api/users/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      dispatch(logIn(data));
      //   alert('successfully registered and loged in!');
      openNotification();
      router.back();
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };

  //   const prefixSelector = (
  //     <Form.Item name="prefix" noStyle>
  //       <Select
  //         style={{
  //           width: 70,
  //         }}
  //       >
  //         <Option value="86">+86</Option>
  //         <Option value="87">+87</Option>
  //       </Select>
  //     </Form.Item>
  //   );

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
        <h1>Registration Form</h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            tooltip="What is your name or a nickname?"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item> */}

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
            <Link href={'/'} passHref>
              <Button block>Go back to Home page</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </LayOut>
  );
};

export default Register;
