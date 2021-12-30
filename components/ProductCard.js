import { Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";

const ProductCard = (props) => {
  return (
    <Link href={`/product/${props.slug}`}>
      <Card
        hoverable
        style={{
          width: "100%",
          padding: "5px",
          boxSizing: "border-box",
        }}
        cover={<img alt="example" src={props.image} />}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3>{props.name}</h3>
          <h3>{props.price}$</h3>
        </div>
        <Button
          size="small"
          icon={<ShoppingCartOutlined />}
          block
          onClick={(e) => {
            e.preventDefault();
            console.log("Added to cart");
          }}
        >
          Add to Cart
        </Button>
      </Card>
    </Link>
  );
};

export default ProductCard;
