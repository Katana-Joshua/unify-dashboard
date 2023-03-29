import { Card, Table } from "antd";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { Order } from "../../models";
import { renderOrderStatus } from "../../util/functions";

const OrderHistory = () => {
  const [ orders, setOrders ] = useState([]);

  useEffect(() => {
    const historySub = DataStore
      .observeQuery(Order, o => o.or(ord => [ ord.status.eq("DECLINED_BY_RESTAURANT"), ord.status.eq("COMPLETED"), ord.status.eq("CANCELLED") ]))
      .subscribe(obj => {
        if(obj.isSynced){
          setOrders(obj.items);
        }
      });
      return () => historySub.unsubscribe();
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
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice} UGX`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => renderOrderStatus(status),
    },
  ];

  return (
    <Card title={"History Orders"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="orderID"
      />
    </Card>
  );
};

export default OrderHistory;
