import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../styles/LayOut.module.css';
import { clearAll } from '../redux/cartSlice';
import { logOut } from '../redux/authSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavMenu = (props) => {
  const userInfo = useSelector((state) => state.auth);
  console.log(userInfo);

  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems } = useSelector((state) => state.cart);

  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(clearAll());
    router.push('/');
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      // defaultSelectedKeys={['1']}
      className={classes.menu_items}
    >
      <Menu.Item
        key="1"
        onClick={props.showDrawer}
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
      {/* ====================================================================================== */}
      {!userInfo.isAuthenticated && (
        <Menu.Item key="2" className={classes.menu_item}>
          <Link href={'/register'}>Sign up</Link>
        </Menu.Item>
      )}
      {/* ====================================================================================== */}
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
          onClick={props.onShowModal}
          className={classes.menu_item}
        >
          Log in
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavMenu;
