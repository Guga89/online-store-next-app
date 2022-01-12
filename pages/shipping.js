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
} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LayOut from '../components/LayOut';
import {
  cartAddItem,
  cartReduceItemCount,
  cartRemoveItem,
} from '../redux/cartSlice';

const ShippingPage = () => {
  const router = useRouter();
  const { cartItems, priceSum } = useSelector((state) => state.cart);

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

  const onFinish = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.post('/api/users/register', {
        fullname: values.fullname,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
        coutry: values.coutry,
        phone: values.phone,
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
        <Col
          sm={24}
          md={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Steps labelPlacement="vertical">
            <Step status="finish" title="Login" icon={<UserOutlined />} />
            <Step
              status="wait"
              title="Verification"
              icon={<SolutionOutlined />}
            />
            <Step status="wait" title="Pay" icon={<PayCircleOutlined />} />
            <Step status="wait" title="Done" icon={<SmileOutlined />} />
          </Steps>
          <Divider style={{ margin: '30px auto' }}>Express checkout</Divider>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button style={{ width: '30%', textAlign: 'center' }}>
              Alipay
            </Button>
            <Button style={{ width: '30%', textAlign: 'center' }}>
              WeChat Pay
            </Button>
            <Button style={{ width: '30%', textAlign: 'center' }}>
              Cash on delivery
            </Button>
          </div>
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
                  placeholder="Please input your full name"
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} md={12}>
          <div
            style={{
              width: '90%',
              height: '70vh',
              padding: '10px 50px',
              overflowY: 'scroll',
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
