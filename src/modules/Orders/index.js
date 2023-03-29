import { Card, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Order } from '../../models'
import { renderOrderStatus } from '../../util/functions';
import { AuthContext } from '../../Context/AuthContext';

const Orders = () => {
  const navigate = useNavigate();
  const { restaurant } = useContext(AuthContext);
  const [ dbOrders, setDbOrders ] = useState([]);

  useEffect(() => {
    // if(!restaurant && !restaurant.id) return;
    const subscription = DataStore.observeQuery(Order, o => o.restaurantID.eq(restaurant.id)).subscribe(({ isSynced, items }) => {
      if(isSynced){
        setDbOrders(items);
      }
    })
    return () => subscription.unsubscribe();
  }, []);

  const tableColumns = [
    {
      title: 'Order No',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: 'Delivery Address',
      dataIndex: 'deliveryLocation',
      key: 'deliveryLocation',
      render: (deliveryLocation) => deliveryLocation.address
    },
    {
      title: 'Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => `${totalPrice} UGX`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: renderOrderStatus
    }
  ];

  return (
    <Card title={'Orders'} style={{ margin: 20 }}>
      <Table
        dataSource={dbOrders}
        columns={tableColumns}
        rowKey="id"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.id}`)
        })}
      />
    </Card>
  )
};

export default Orders;