import {
  PayCircleOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Divider, Row, Steps, Button, Spin } from 'antd';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import { useDispatch, useSelector } from 'react-redux';
import CartItemsList from '../components/CartItemsList';
import LayOut from '../components/LayOut';
import { clearAll } from '../redux/cartSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';

const OrderPage = () => {
  const router = useRouter();
  const { cartItems, priceSum, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const userInfo = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const { Step } = Steps;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, paymentMethod, router]);

  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          priceSum,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      setLoading(false);
      dispatch(clearAll());
      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      const errMessage = getError(error);
      console.log(errMessage, ' - order has not been submitted...');
    }
  };

  return (
    <Spin spinning={loading} tip="Loading..." style={{ maxHeight: '100vh' }}>
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
              <Step
                status="finish"
                title="Payment"
                icon={<PayCircleOutlined />}
              />
              <Step
                status="wait"
                title="Place Order"
                icon={<SmileOutlined />}
              />
            </Steps>

            <Divider>Order summary</Divider>
            <div className="address">
              <p>{shippingAddress.fullname}</p>
              <p>{shippingAddress.country}</p>
              <p>{shippingAddress.city}</p>
              <p>{shippingAddress.postalCode}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.phone}</p>
            </div>
            <Divider></Divider>
            <p>{paymentMethod}</p>
            <Button onClick={submitOrderHandler}>Submit the order</Button>
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
    </Spin>
  );
};

export default OrderPage;
