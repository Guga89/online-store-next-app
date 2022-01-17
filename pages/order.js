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
  List,
  Image,
  Popover,
  Radio,
} from 'antd';
import { useRouter } from 'next/router';

// import axios from 'axios';
// import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LayOut from '../components/LayOut';
import {
  cartAddItem,
  cartReduceItemCount,
  cartRemoveItem,
  saveShippingAddress,
} from '../redux/cartSlice';

const ShippingPage = () => {
  const router = useRouter();
  const { cartItems, priceSum, shippingAddress } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const onAddCount = (item) => {
    dispatch(cartAddItem(item));
  };
  const onReduceCount = (item) => {
    dispatch(cartReduceItemCount(item));
  };

  const onRemoveItem = (item) => {
    dispatch(cartRemoveItem(item));
  };

  const submitHandler = (method) => {
    // dispatch(savePaymentMethod(method));
    router.push('order');
  };
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
            <Step
              status="finish"
              title="Payment"
              icon={<PayCircleOutlined />}
            />
            <Step status="wait" title="Place Order" icon={<SmileOutlined />} />
          </Steps>

          <Divider style={{ margin: '30px auto' }}>Order summary</Divider>

          <Divider></Divider>
          <Button onClick={submitHandler}>Proceed to order page</Button>
        </Col>

        <Col xs={24} md={12}>
          <div
            style={{
              width: '100%',
              height: '70vh',
              padding: '10px 50px',
              overflowY: 'scroll',
              marginTop: '50px',
            }}
          >
            <List
              itemLayout="horizontal"
              footer={
                <div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <h3>TOTAL:</h3>
                    <h3> ${priceSum} USD</h3>
                  </div>
                  <hr />
                </div>
              }
              dataSource={cartItems}
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
                      <Button
                        size="small"
                        style={{ width: '25px', height: '25px' }}
                        onClick={() => onReduceCount(item)}
                      >
                        -
                      </Button>
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
                      {item.quantity >= item.countInStock ? (
                        <Popover
                          title={`Only ${item.countInStock} items are available for now`}
                        >
                          <Button
                            size="small"
                            disabled
                            style={{ width: '25px', height: '25px' }}
                            onClick={() => onAddCount(item)}
                          >
                            +
                          </Button>
                        </Popover>
                      ) : (
                        <Button
                          size="small"
                          style={{ width: '25px', height: '25px' }}
                          onClick={() => onAddCount(item)}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => onRemoveItem(item)}
                  >
                    Remove
                  </Button>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </LayOut>
  );
};

export default ShippingPage;
