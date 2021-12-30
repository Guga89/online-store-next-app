import data from "../utils/data";
import { Row, Col } from "antd";
import ProductCard from "./ProductCard";
import Link from "next/link";

const Products = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        {data.products.map((item) => {
          return (
            <Col key={item.name} lg={6} xs={24} md={8} sm={12}>
              <ProductCard
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                slug={item.slug}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Products;
