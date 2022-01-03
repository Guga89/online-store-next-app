import { Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { cartAddItem } from '../redux/cartSlice';

const ProductCard = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(cartAddItem({ ...props, quantity: 1 }));
  };

  return (
    <Link href={`/product/${props._id}`} passHref>
      <Card
        hoverable
        style={{
          width: '100%',
          padding: '5px',
          boxSizing: 'border-box',
        }}
        cover={<img alt="example" src={props.image} />}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <h3>{props.name}</h3>
          <h3>{props.price}$</h3>
        </div>
        <Button
          size="small"
          icon={<ShoppingCartOutlined />}
          block
          onClick={addToCartHandler}
          disabled={props?.countInStock <= 0 && 'true'}
        >
          {props?.countInStock <= 0 ? 'Out of stock' : 'Add to cart'}
        </Button>
      </Card>
    </Link>
  );
};

export default ProductCard;
