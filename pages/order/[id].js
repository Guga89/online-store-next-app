import {
  PayCircleOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Divider, Row, Steps, Spin, Image } from 'antd';
import { useRouter } from 'next/router';
import { getError } from '../../utils/error';
import { useSelector } from 'react-redux';
import LayOut from '../../components/LayOut';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { List } from 'antd';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '', order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const OrderDetails = (props) => {
  const orderId = props.id;
  const router = useRouter();

  // console.log(orderId);

  const userInfo = useSelector((state) => state.auth);
  const { Step } = Steps;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {
      orderItems: [],
      shippingAddress: {},
      paymentMethod: '',
      priceSum: 0,
      isPaid: false,
    },
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order]);

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
              <Step status="finish" title="Ordered" icon={<SmileOutlined />} />
            </Steps>

            <Divider>Order summary</Divider>
            <div className="address">
              <p>{order.shippingAddress.fullname}</p>
              <p>{order.shippingAddress.country}</p>
              <p>{order.shippingAddress.city}</p>
              <p>{order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
            <Divider></Divider>
            <p>{order.paymentMethod}</p>
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
              <List
                itemLayout="horizontal"
                footer={
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h3>TOTAL:</h3>
                      <h3> ${order.priceSum} USD</h3>
                    </div>
                    <hr />
                  </div>
                }
                dataSource={order.orderItems}
                renderItem={(item) => (
                  <List.Item style={{ justifyContent: 'space-between' }}>
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      alt={item.name}
                    />
                    <div
                      style={{
                        maxHeight: '100px',
                        color: 'grey',
                      }}
                    >
                      <h3 style={{ marginBottom: '0' }}>{item.name}</h3>
                      <p style={{ marginBottom: '0' }}>
                        Size: {item?.size || 'XL'}
                      </p>
                      <p style={{ marginBottom: '0' }}>${item.price} USD</p>
                      <div className="item-quantity">
                        <div
                          style={{
                            width: '25px',
                            height: '25px',
                            display: 'inline-block',
                            textAlign: 'center',
                          }}
                        >
                          {item.quantity}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </LayOut>
    </Spin>
  );
};

export async function getServerSideProps({ params }) {
  return { props: params };
}
export default OrderDetails;
