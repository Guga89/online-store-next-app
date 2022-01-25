import LayOut from '../components/LayOut';
import { useSelector } from 'react-redux';
import Products from '../components/Content';
import db from '../utils/db';
import Product from '../models/Product';

function Home(props) {
  const userInfo = useSelector((state) => state.auth);

  return (
    <LayOut>
      <Products products={props.products} />
    </LayOut>
  );
}

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: { products: products.map(db.convertDocToObj) },
  };
}
