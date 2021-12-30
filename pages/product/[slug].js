import { useRouter } from "next/router";
import data from "../../utils/data";

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);

  return (
    <div>
      {!product && <div>Ooops... Product Not Found!!!</div>}
      {product && <div>{product.name}</div>}
    </div>
  );
};

export default ProductDetails;
