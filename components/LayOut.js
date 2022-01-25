import Head from 'next/head';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import classes from '../styles/LayOut.module.css';
import Link from 'next/link';
import CartDrawer from './CartDrawer';
import { useState } from 'react';
import LoginModal from './LoginModal';
import NavMenu from './NavMenu';

const LayOut = ({ children }) => {
  const { Header, Content, Footer } = Layout;

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
          <NavMenu showDrawer={showDrawer} onShowModal={onShowModal} />
        </Header>
        <Content
          className={classes.site_layout} //prettier-ignore
          // style={{ padding: '0 50px', marginTop: 64 }}
        >
          <div
            className={classes.site_layout_background} //prettier-ignore
          >
            {children}
            <CartDrawer
              showDrawer={showDrawer}
              onClose={onClose}
              visible={visible}
              showModal={onShowModal}
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
