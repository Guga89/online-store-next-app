import {
  PayCircleOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Divider, Input, notification, Row, Steps, Form } from 'antd';
import { Button } from 'antd/lib/radio';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LayOut from '../components/LayOut';

const ShippingPage = () => {
  const router = useRouter();

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

  const { Step } = Steps;
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
        fullname: values.fullname,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        coutry: values.coutry,
      });
      //   alert('successfully registered and loged in!');
      console.log(data);
      openNotification();
      router.back();
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };

  return (
    <LayOut>
      <Row>
        <Col span={12}>
          <Steps labelPlacement="vertical">
            <Step status="finish" title="Login" icon={<UserOutlined />} />
            <Step
              status="finish"
              title="Verification"
              icon={<SolutionOutlined />}
            />
            <Step status="process" title="Pay" icon={<PayCircleOutlined />} />
            <Step status="wait" title="Done" icon={<SmileOutlined />} />
          </Steps>
          <Divider plain>Express checkout</Divider>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button style={{ width: '30%', textAlign: 'center' }}>
              Alipay
            </Button>
            <Button style={{ width: '30%', textAlign: 'center' }}>
              WeChat Pay
            </Button>
            <Button style={{ width: '30%', textAlign: 'center' }}>
              PayPal
            </Button>
          </div>
          <Divider plain>OR</Divider>
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

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
              <Link href={'/'} passHref>
                <Button block>Go back to Home page</Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <div
            style={{
              width: '100%',
              backgroundColor: 'lightgrey',
              height: '80vh',
            }}
          ></div>
        </Col>
      </Row>
    </LayOut>
  );
};

export default ShippingPage;
