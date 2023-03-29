import { Menu } from 'antd';
import { Auth } from 'aws-amplify';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const SideMenu = () => {
  const { restaurant } = useContext(AuthContext);

  const navigate = useNavigate();

  let menuItems = [
    {
      key: "/",
      label: 'Orders'
    },
    {
      key: "menu",
      label: 'Menu'
    },
    {
      key: "order-history",
      label: 'Order History'
    },
    {
      key: "settings",
      label: 'Settings'
    },
    {
      key: "signout",
      label: 'Sign Out'
    }
  ];

  if(restaurant === undefined){
    menuItems = [
      {
        key: "/",
        label: 'Setup'
      },
      {
        key: "signout",
        label: 'Sign Out'
      }
    ]
  }

  const onClickHandler = (key) => {
    if(key === "signout"){
      // alert("Are you sure you want to Sign out?");
      Auth.signOut();
      return;
    }
    navigate(key);
  }
  
  return (
    <Menu items={menuItems} onClick={(menuItem) => onClickHandler(menuItem.key)}/>
  )
};

export default SideMenu;