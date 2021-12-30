import LayOut from "../components/LayOut";
import { useSelector } from "react-redux";
import Products from "../components/Content";

function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <LayOut>
      {!isAuthenticated && <h1>Not Logged In</h1>}
      {isAuthenticated && <h2>User is Logged In! Welcome to your component</h2>}
      <Products />
    </LayOut>
  );
}

export default Home;
