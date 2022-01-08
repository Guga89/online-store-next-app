import LayOut from '../../components/LayOut';
// import data from '../../utils/data';
import { Breadcrumb, Col, Row, Image, Card, Divider, Button } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import db from '../../utils/db';
import Product from '../../models/Product';
import { useSelector, useDispatch } from 'react-redux';
import { cartAddItem, cartRemoveItem } from '../../redux/cartSlice';

const ProductDetails = (props) => {
  // const router = useRouter();
  // const { id } = router.query;
  // const product = data.products.find((a) => a.slug === slug);
  //=======================above is getting product from the utils data file=======================
  const product = props.product;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartAddItem({ ...product, quantity: 1 }));
  };

  return (
    <LayOut>
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb> */}
      {!product && <div>Ooops... Product Not Found!!!</div>}
      {product && (
        <div>
          <Row gutter={[8, 8]}>
            <Col md={14} sm={24}>
              <Image src={product.image} alt="product image" />
            </Col>
            <Col md={10} xs={24}>
              <Card
                title={<h1>{product.name}</h1>}
                extra={<h1>${product.price} USD</h1>}
                style={{ minHeight: '100%' }}
              >
                <Divider orientation="left">Description</Divider>
                <p>Categorie: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p>Rating: {product.rating}</p>
                <p>{product.description}</p>
                <Divider orientation="left">Size & Color</Divider>
                <div
                  className="size-buttons"
                  style={{ display: 'flex', justifyContent: 'space-evenly' }}
                >
                  <Button>S</Button>
                  <Button>M</Button>
                  <Button>L</Button>
                  <Button>XL</Button>
                  <Button>XXL</Button>
                </div>
                <Divider orientation="left"></Divider>

                <Button
                  block
                  icon={<ShoppingCartOutlined />}
                  style={{ marginBottom: '10px' }}
                  onClick={addToCartHandler}
                  disabled={product.countInStock <= 0 && 'true'}
                >
                  {product.countInStock <= 0 ? 'Out of stock' : 'Add to cart'}
                </Button>

                <Button block icon={<HeartOutlined />}>
                  Like it!
                </Button>
                <Link href={'/'}>Back to Homepage</Link>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </LayOut>
  );
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const _id = context.params;
  await db.connect();
  const product = await Product.findOne(_id).lean();
  await db.disconnect();
  return {
    props: { product: db.convertDocToObj(product) },
  };
}
