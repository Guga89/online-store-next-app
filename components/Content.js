// import data from "../utils/data";
import { Row, Col } from 'antd';
import ProductCard from './ProductCard';

export default function Products(props) {
  const { products } = props;
  return (
    <>
      <Row gutter={[20, 20]}>
        {products.map((item) => {
          return (
            <Col key={item._id} lg={6} xs={24} md={8} sm={12}>
              <ProductCard
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                slug={item.slug}
                _id={item._id}
                countInStock={item.countInStock}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
