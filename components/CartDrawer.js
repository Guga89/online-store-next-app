// import 'antd/dist/antd.css';
import { Drawer, Button, List, Image, Popover } from 'antd';
import { useSelector } from 'react-redux';
import {
  cartAddItem,
  cartReduceItemCount,
  cartRemoveItem,
  clearAll,
} from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const CartDrawer = (props) => {
  const { cartItems, priceSum } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const onAddCount = (item) => {
    dispatch(cartAddItem(item));
  };
  const onReduceCount = (item) => {
    dispatch(cartReduceItemCount(item));
  };
  const onClearAll = () => {
    dispatch(clearAll());
  };
  const onRemoveItem = (item) => {
    dispatch(cartRemoveItem(item));
  };

  return (
    <>
      <Drawer
        title="YOUR CART"
        placement="right"
        onClose={props.onClose}
        visible={props.visible}
      >
        <List
          itemLayout="horizontal"
          footer={
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>TOTAL:</h3>
                <h3> ${priceSum} USD</h3>
              </div>
              <hr />
              <Button
                block
                type="primary"
                disabled={cartItems.length <= 0 ? true : false}
              >
                CHECK OUT
              </Button>
              <Button
                block
                type="text"
                onClick={onClearAll}
                disabled={cartItems.length <= 0 ? true : false}
              >
                CLEAR ALL
              </Button>
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
                <p style={{ marginBottom: '0' }}>Size: {item?.size || 'XL'}</p>
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
      </Drawer>
    </>
  );
};

export default CartDrawer;