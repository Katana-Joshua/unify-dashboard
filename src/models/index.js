// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransportationModes = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING",
  "BIKING": "BIKING"
};

const Gender = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const OrderStatus = {
  "PENDING": "PENDING",
  "CONFIRMED": "CONFIRMED",
  "CANCELLED": "CANCELLED",
  "PREPARING": "PREPARING",
  "READY_FOR_DELIVERY": "READY_FOR_DELIVERY",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "DELIVERING": "DELIVERING",
  "COMPLETED": "COMPLETED",
  "ACCEPTED": "ACCEPTED",
  "DECLINED_BY_RESTAURANT": "DECLINED_BY_RESTAURANT"
};

const { Courier, OrderItem, Dish, Order, Restaurant, User, Hostel, AboutOrder, DeliveryLocation, NamePrice, RestaurantCategories } = initSchema(schema);

export {
  Courier,
  OrderItem,
  Dish,
  Order,
  Restaurant,
  User,
  Hostel,
  TransportationModes,
  Gender,
  OrderStatus,
  AboutOrder,
  DeliveryLocation,
  NamePrice,
  RestaurantCategories
};