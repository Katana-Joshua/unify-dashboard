import { Card, Descriptions, Divider, List, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderItem, User } from "../../models";
import { renderOrderStatus } from "../../util/functions";

const DetailedOrder = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [ order, setOrder ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ courier, setCourier ] = useState(null);
  const [ orderItems, setOrderItems ] = useState([]);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const orderSub = DataStore.observeQuery(Order, ord => ord.id.eq(id)).subscribe(obj => {
      if(obj.isSynced){
        const dbOrder = obj.items[0];
        // console.log(dbOrder);
        setOrder(dbOrder);
        (async() => {
          const c = await dbOrder.Courier;
          if(c){
            console.log(c);
            setCourier(c);
          }
        })()

        DataStore.query(OrderItem, ot => ot.orderID.eq(dbOrder.id))
        .then(ots => {
          (async() => {
            const dishes = await Promise.all(ots.map(ot => {
              return ot.Dish;
            }));
            // console.log(dishes);
            const _order_items = ots.map(i => {
              for (let key in dishes) {
                if(dishes[key].id === i.orderItemDishId){
                  return { ...i, dish_name: dishes[key].dish_name }
                }
              }
            });
            setOrderItems(_order_items)
          })();
        })
        .catch(setError);

        DataStore.query(User, u => u.id.eq(dbOrder.deliveryInstructions))
        .then(res => {
          setUser(res[0])
        })
        .catch(setError)
      }
    });
    return () => {
      orderSub.unsubscribe();
    }
  }, []);

  const acceptOrder = async () => {
    DataStore.save(Order.copyOf(order, updated => {
      updated.status = "CONFIRMED";
    }))
    .then(setOrder)
    .catch(setError);
  };
  
  const startPreparing = async () => {
    DataStore.save(Order.copyOf(order, updated => {
      updated.status = "PREPARING";
    }))
    .then(setOrder)
    .catch(setError);
  };
  
  const declineOrder = async () => {
    DataStore.save(Order.copyOf(order, updated => {
      updated.status = "DECLINED_BY_RESTAURANT";
    }))
    .then(res => {
      setOrder(res);
      navigate('/');
    })
    .catch(setError);
  };
  
  const onFoodReady = async () => {
    DataStore.save(Order.copyOf(order, updated => {
      if(order.isPickup){
        updated.status = "READY_FOR_PICKUP";
        return;
      }
      updated.status = "DELIVERING";
    }))
    .then(res => {
      setOrder(res);
      navigate('/');
    })
    .catch(setError);
  };

  const errorText = (
    <div style={{ padding: '20px' }}>
        <p style={{ fontSize: '20px', color: 'crimson' }}>{error}</p>
      </div>
  )

  if(!order || !user){
    if(error){
      return errorText
    }
  
    return <div>Loading...</div>
  }
  
  return (
    <Card title={`Order ${order.orderNumber}`} style={{ margin: 20 }}>
      {error && 
      errorText
      }
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Order Status">
          {renderOrderStatus(order.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Customer">
          {user.firstName} {user.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Customer phone">
          {user.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          {order.deliveryLocation.address}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      {courier &&
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Delivery Carrier">
          {courier.firstName} {courier.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Carrier's phone">
          {courier.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Transport mode">
          {courier.transportationMode}
        </Descriptions.Item>
      </Descriptions>
      }
      <Divider />
      <List
        dataSource={orderItems}
        renderItem={(orderItem) => (
          <List.Item>
            <div style={{ fontWeight: "bold" }}>
              {orderItem.dish_name} x{orderItem.quantity} 
              <span style={{ fontWeight: "normal" }}>
                ( {orderItem.extras.map(ext => `${ext.name}@${ext.price/1000}k`).join(', ') }
                {orderItem.drink && ` and ${orderItem.drink.name}@${orderItem.drink.price/1000}k`} )
              </span>
            </div>
            <div>{orderItem.subTotal} UGX</div>
          </List.Item>
        )}
      />
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>{order.totalPrice} UGX</h2>
      </div>
      <Divider />
      <div style={styles.buttonsContainer}>
        {order.status === "PENDING" && 
        <>
        <Button block type="danger" size="large" style={styles.button} onClick={declineOrder}>
          Decline Order
        </Button>
        <Button block type="primary" size="large" style={styles.button} onClick={acceptOrder}>
          Accept Order
        </Button>
        </>
        }
        {order.status === "CONFIRMED" && 
        <>
        <Button block type="primary" size="large" style={styles.button} onClick={startPreparing}>
          Start Preparing
        </Button>
        </>
        }
      </div>
      {order.status === "PREPARING" &&
      <Button block type="primary" size="large" onClick={onFoodReady}>
        Food Is Ready
      </Button>
      }
      <Button block type="primary" size="large" onClick={onFoodReady}>
        Food Is Ready
      </Button>
    </Card>
  )
};

const styles = {
  totalSumContainer: {
    flexDirection: "row",
    display: "flex",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
};

export default DetailedOrder;