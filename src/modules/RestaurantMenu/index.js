import { Card, Table, Button, Image } from "antd";
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";

const RestaurantMenu = () => {
  const {  restaurant } = useContext(AuthContext);
  const [ menu, setMenu ] = useState([]);

  useEffect(() => {
    const menuSub = DataStore.observeQuery(Dish, d => d.restaurantID.eq(restaurant.id)).subscribe(obj => {
      if(obj.isSynced){
        setMenu(obj.items);
      }
    });
    return () => menuSub.unsubscribe();
  }, []);

  const removeDish = (id) => {
    console.log(id);
    DataStore.delete(Dish, id)
    .then(console.log)
    .catch(console.log);
  }

  const tableColumns = [
    {
      title: "Dish",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} style={{ height: 80, width: 80, borderRadius: 5 }}/>
    },
    {
      title: "Dish name",
      dataIndex: "dish_name",
      key: "dish_name",
    },
    {
      title: "Price",
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price} UGX` 
    },
    {
      title: "Action",
      dataIndex: 'id',
      key: 'action',
      render: (id) => <Button danger onClick={removeDish.bind(this, id)}>Remove</Button>
    }
  ];

  const renderNewItemButton = () => (
    <Link to={'create'}>
      <Button type="primary">New Item</Button>
    </Link>
  )

  return (
    <Card title={"Menu"} style={{ margin: 20 }} extra={renderNewItemButton()}>
      <Table dataSource={menu} columns={tableColumns} rowKey="id" />
    </Card>
  );
};

export default RestaurantMenu;
