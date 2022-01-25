import {
  PayCircleOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Col,
  Divider,
  Input,
  notification,
  Row,
  Steps,
  Form,
  Button,
} from 'antd';

// import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import CartItemsList from '../components/CartItemsList';
import LayOut from '../components/LayOut';
import { saveShippingAddress } from '../redux/cartSlice';

const ShippingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  //========================== Popup Notifications ====================
  const openNotification = () => {
    notification.open({
      message: 'Thank you for address verification!',
      description:
        'Please complete further payment steps so we can ship your items at the sooonest.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const { Step } = Steps;
  //===============================  FORM ===============================

  const onFinish = async (values) => {
    // console.log(values);
    try {
      dispatch(saveShippingAddress(values));
      openNotification();
      router.push('/payment');
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };

  return (
    <LayOut>
      <Row>
        <Col
          sm={24}
          md={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            marginTop: '50px',
          }}
        >
          <Steps labelPlacement="vertical">
            <Step status="finish" title="Login" icon={<UserOutlined />} />
            <Step
              status="wait"
              title="Shipping addres"
              icon={<SolutionOutlined />}
            />
            <Step status="wait" title="Payment" icon={<PayCircleOutlined />} />
            <Step status="wait" title="Place Order" icon={<SmileOutlined />} />
          </Steps>

          <Divider style={{ margin: '30px auto' }}>Shipping address</Divider>

          <Form
            name="complex-form"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Your full name">
              <Form.Item
                name="fullname"
                noStyle
                rules={[{ required: true, message: 'Username is required' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Please enter your full name"
                  value={shippingAddress.fullname}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Address">
              <Input.Group compact>
                <Form.Item
                  name="address"
                  noStyle
                  rules={[{ required: true, message: 'Address is required' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Input your address"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="Country & Postal Code"
              style={{ marginBottom: 0 }}
            >
              <Form.Item
                name="country"
                rules={[{ required: true, message: 'Country is required' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="Country" />
              </Form.Item>
              <Form.Item
                name="postalCode"
                rules={[{ required: true, message: 'Postal code is required' }]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Phone number">
              <Form.Item
                name="phone"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Phone number is required',
                  },
                ]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Please input your phone number"
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit">
                Confirm address
              </Button>
              {/* <Button disabled>Address confirmed</Button> */}
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} md={12}>
          <div
            style={{
              width: '100%',
              height: '70vh',
              padding: '10px 50px',
              overflowY: 'auto',
              marginTop: '50px',
            }}
          >
            <CartItemsList />
          </div>
        </Col>
      </Row>
    </LayOut>
  );
};

export default ShippingPage;
