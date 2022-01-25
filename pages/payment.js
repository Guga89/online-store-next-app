import {
  PayCircleOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Divider, Row, Steps, Form, Button, Radio } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import CartItemsList from '../components/CartItemsList';
import LayOut from '../components/LayOut';
import { savePaymentMethod } from '../redux/cartSlice';

const ShippingPage = () => {
  const router = useRouter();
  const { paymentMethod } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const onFinish = (payment) => {
    dispatch(savePaymentMethod(payment.method));
    router.push('order');
  };
  const { Step } = Steps;

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
              status="finish"
              title="Shipping addres"
              icon={<SolutionOutlined />}
            />
            <Step status="wait" title="Payment" icon={<PayCircleOutlined />} />
            <Step status="wait" title="Place Order" icon={<SmileOutlined />} />
          </Steps>

          <Divider style={{ margin: '30px auto' }}>Shipping address</Divider>
          <Form name="complex-form" onFinish={onFinish}>
            <Form.Item name="method" noStyle>
              <Radio.Group
                defaultValue={paymentMethod || ''}
                buttonStyle="solid"
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
              >
                <Radio.Button
                  value="cash"
                  style={{ width: '30%', textAlign: 'center' }}
                >
                  Cash on delivery
                </Radio.Button>
                <Radio.Button
                  value="wechat"
                  style={{ width: '30%', textAlign: 'center' }}
                >
                  WeChat Pay
                </Radio.Button>
                <Radio.Button
                  value="alipay"
                  style={{ width: '30%', textAlign: 'center' }}
                >
                  Alipay
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label=" " colon={false}>
              <Divider />
              <Button block htmlType="submit">
                Proceed to order page
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
