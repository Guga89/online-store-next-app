import Head from "next/head";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import classes from "../styles/LayOut.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../redux/authSlice";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";

const LayOut = ({ children }) => {
  const { Header, Content, Footer } = Layout;

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logInHandler = () => {
    dispatch(logIn());
  };
  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <>
      <Head>
        <title>Online Store</title>
      </Head>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
          }}
        >
          <Link href="/">
            <div className={classes.logo}>Online Store</div>
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            className={classes.menu_items}
          >
            {!isAuthenticated && (
              <Menu.Item key="1" className={classes.menu_item}>
                Sign up
              </Menu.Item>
            )}
            {!isAuthenticated && (
              <Menu.Item
                key="2"
                onClick={logInHandler}
                className={classes.menu_item}
              >
                Log in
              </Menu.Item>
            )}
            {isAuthenticated && (
              <Menu.Item
                key="4"
                // onClick={}
                className={classes.menu_item}
              >
                <ShoppingCartOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </Menu.Item>
            )}
            {isAuthenticated && (
              <Menu.Item
                key="3"
                onClick={logOutHandler}
                className={classes.menu_item}
              >
                Sign out
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content
          className="site-layout" //prettier-ignore
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className={classes.site_layout_background} //prettier-ignore
            style={{ padding: 24, minHeight: "80vh" }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          All rights reserved ©2021
        </Footer>
      </Layout>
    </>
  );
};

export default LayOut;
