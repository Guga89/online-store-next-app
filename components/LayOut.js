import Head from 'next/head';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Badge } from 'antd';
import classes from '../styles/LayOut.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/authSlice';
import Link from 'next/link';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import CartDrawer from './CartDrawer';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { clearAll } from '../redux/cartSlice';
import SubMenu from 'antd/lib/menu/SubMenu';

const LayOut = ({ children }) => {
  const { Header, Content, Footer } = Layout;

  const userInfo = useSelector((state) => state.auth);
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
    setModalVisible(true);
  };
  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(clearAll());
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
            // defaultSelectedKeys={['1']}
            className={classes.menu_items}
          >
            <Menu.Item
              key="1"
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
            {!userInfo.isAuthenticated && (
              <Menu.Item key="2" className={classes.menu_item}>
                Sign up
              </Menu.Item>
            )}
            {userInfo.isAuthenticated ? (
              <SubMenu key="3" icon={<UserOutlined />} title={userInfo.name}>
                <Menu.Item
                  key="sub1"
                  onClick={() => {}}
                  className={classes.menu_item}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  key="sub2"
                  onClick={() => {}}
                  className={classes.menu_item}
                >
                  My Account
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  key="sub3"
                  onClick={logOutHandler}
                  className={classes.menu_item}
                >
                  Sign out
                </Menu.Item>
              </SubMenu>
            ) : (
              <Menu.Item
                key="4"
                onClick={logInHandler}
                className={classes.menu_item}
              >
                Log in
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
