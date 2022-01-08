import Head from 'next/head';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Badge } from 'antd';
import classes from '../styles/LayOut.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/authSlice';
import Link from 'next/link';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartDrawer from './CartDrawer';
import { useState } from 'react';
import LoginModal from './LoginModal';

const LayOut = ({ children }) => {
  const { Header, Content, Footer } = Layout;

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  //=================Cart Drawer===============================
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  //============================================================

  //================== Login Modal ==============================
  const [modalVisible, setModalVisible] = useState(false);

  const onShowModal = () => {
    setModalVisible(true);
  };

  const onHideModal = () => {
    setModalVisible(false);
  };

  const logInHandler = () => {
    // dispatch(logIn());
    setModalVisible(true);
  };
  const logOutHandler = () => {
    dispatch(logOut());
  };
  //=============================================================
  return (
    <>
      <Head>
        <title>Online Store</title>
      </Head>
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
          }}
        >
          <Link href="/" passHref>
            <div className={classes.logo}>Online Store</div>
          </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
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
            <Menu.Item
              key="4"
              onClick={showDrawer}
              className={classes.menu_item}
            >
              <Badge
                count={cartItems.length}
                size="small"
                style={{ backgroundColor: 'darkorange' }}
              >
                <ShoppingCartOutlined
                  style={{
                    color: 'white',
                    fontSize: '20px',
                  }}
                />
              </Badge>
            </Menu.Item>
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
          className={classes.site_layout} //prettier-ignore
          // style={{ padding: '0 50px', marginTop: 64 }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>Products</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className={classes.site_layout_background} //prettier-ignore
          >
            {children}
            <CartDrawer
              showDrawer={showDrawer}
              onClose={onClose}
              visible={visible}
            />
            <LoginModal
              showModal={onShowModal}
              hideModal={onHideModal}
              visible={modalVisible}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          All rights reserved ©2021
        </Footer>
      </Layout>
    </>
  );
};

export default LayOut;
