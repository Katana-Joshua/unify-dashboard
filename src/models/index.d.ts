import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum TransportationModes {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING",
  BIKING = "BIKING"
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  PREPARING = "PREPARING",
  READY_FOR_DELIVERY = "READY_FOR_DELIVERY",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  DELIVERING = "DELIVERING",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED",
  DECLINED_BY_RESTAURANT = "DECLINED_BY_RESTAURANT"
}

type EagerAboutOrder = {
  readonly image: string;
  readonly summary: string;
}

type LazyAboutOrder = {
  readonly image: string;
  readonly summary: string;
}

export declare type AboutOrder = LazyLoading extends LazyLoadingDisabled ? EagerAboutOrder : LazyAboutOrder

export declare const AboutOrder: (new (init: ModelInit<AboutOrder>) => AboutOrder)

type EagerDeliveryLocation = {
  readonly lat: number;
  readonly lng: number;
  readonly Street?: string | null;
  readonly address?: string | null;
  readonly building?: string | null;
}

type LazyDeliveryLocation = {
  readonly lat: number;
  readonly lng: number;
  readonly Street?: string | null;
  readonly address?: string | null;
  readonly building?: string | null;
}

export declare type DeliveryLocation = LazyLoading extends LazyLoadingDisabled ? EagerDeliveryLocation : LazyDeliveryLocation

export declare const DeliveryLocation: (new (init: ModelInit<DeliveryLocation>) => DeliveryLocation)

type EagerNamePrice = {
  readonly name: string;
  readonly price: number;
}

type LazyNamePrice = {
  readonly name: string;
  readonly price: number;
}

export declare type NamePrice = LazyLoading extends LazyLoadingDisabled ? EagerNamePrice : LazyNamePrice

export declare const NamePrice: (new (init: ModelInit<NamePrice>) => NamePrice)

type EagerRestaurantCategories = {
  readonly in_campus?: boolean | null;
  readonly fast_food?: boolean | null;
  readonly local_food?: boolean | null;
}

type LazyRestaurantCategories = {
  readonly in_campus?: boolean | null;
  readonly fast_food?: boolean | null;
  readonly local_food?: boolean | null;
}

export declare type RestaurantCategories = LazyLoading extends LazyLoadingDisabled ? EagerRestaurantCategories : LazyRestaurantCategories

export declare const RestaurantCategories: (new (init: ModelInit<RestaurantCategories>) => RestaurantCategories)

type EagerCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly gender?: Gender | keyof typeof Gender | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly transportationMode?: TransportationModes | keyof typeof TransportationModes | null;
  readonly ratings?: number | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly gender?: Gender | keyof typeof Gender | null;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly transportationMode?: TransportationModes | keyof typeof TransportationModes | null;
  readonly ratings?: number | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Courier = LazyLoading extends LazyLoadingDisabled ? EagerCourier : LazyCourier

export declare const Courier: (new (init: ModelInit<Courier>) => Courier) & {
  copyOf(source: Courier, mutator: (draft: MutableModel<Courier>) => MutableModel<Courier> | void): Courier;
}

type EagerOrderItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Dish?: Dish | null;
  readonly subTotal: number;
  readonly extras?: (NamePrice | null)[] | null;
  readonly drink?: NamePrice | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderItemDishId?: string | null;
}

type LazyOrderItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Dish: AsyncItem<Dish | undefined>;
  readonly subTotal: number;
  readonly extras?: (NamePrice | null)[] | null;
  readonly drink?: NamePrice | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderItemDishId?: string | null;
}

export declare type OrderItem = LazyLoading extends LazyLoadingDisabled ? EagerOrderItem : LazyOrderItem

export declare const OrderItem: (new (init: ModelInit<OrderItem>) => OrderItem) & {
  copyOf(source: OrderItem, mutator: (draft: MutableModel<OrderItem>) => MutableModel<OrderItem> | void): OrderItem;
}

type EagerDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dish_name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly extras?: (NamePrice | null)[] | null;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dish_name: string;
  readonly description: string;
  readonly image: string;
  readonly price: number;
  readonly extras?: (NamePrice | null)[] | null;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Dish = LazyLoading extends LazyLoadingDisabled ? EagerDish : LazyDish

export declare const Dish: (new (init: ModelInit<Dish>) => Dish) & {
  copyOf(source: Dish, mutator: (draft: MutableModel<Dish>) => MutableModel<Dish> | void): Dish;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly restaurantID: string;
  readonly orderNumber: string;
  readonly isCash: boolean;
  readonly isPickup: boolean;
  readonly deliveryPrice: number;
  readonly totalPrice: number;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly OrderItems?: (OrderItem | null)[] | null;
  readonly deliveryInstructions?: string | null;
  readonly deliveryLocation?: DeliveryLocation | null;
  readonly hostelID?: string | null;
  readonly isHostelDelivery?: boolean | null;
  readonly about?: AboutOrder | null;
  readonly Courier?: Courier | null;
  readonly Restaurant?: Restaurant | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderCourierId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly restaurantID: string;
  readonly orderNumber: string;
  readonly isCash: boolean;
  readonly isPickup: boolean;
  readonly deliveryPrice: number;
  readonly totalPrice: number;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly OrderItems: AsyncCollection<OrderItem>;
  readonly deliveryInstructions?: string | null;
  readonly deliveryLocation?: DeliveryLocation | null;
  readonly hostelID?: string | null;
  readonly isHostelDelivery?: boolean | null;
  readonly about?: AboutOrder | null;
  readonly Courier: AsyncItem<Courier | undefined>;
  readonly Restaurant: AsyncItem<Restaurant | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderCourierId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerRestaurant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Restaurant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly cover_image: string;
  readonly address?: string | null;
  readonly categories: RestaurantCategories;
  readonly drinks?: (NamePrice | null)[] | null;
  readonly lat: number;
  readonly lng: number;
  readonly Dishes?: (Dish | null)[] | null;
  readonly rating?: number | null;
  readonly Orders?: (Order | null)[] | null;
  readonly adminSub?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRestaurant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Restaurant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly cover_image: string;
  readonly address?: string | null;
  readonly categories: RestaurantCategories;
  readonly drinks?: (NamePrice | null)[] | null;
  readonly lat: number;
  readonly lng: number;
  readonly Dishes: AsyncCollection<Dish>;
  readonly rating?: number | null;
  readonly Orders: AsyncCollection<Order>;
  readonly adminSub?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Restaurant = LazyLoading extends LazyLoadingDisabled ? EagerRestaurant : LazyRestaurant

export declare const Restaurant: (new (init: ModelInit<Restaurant>) => Restaurant) & {
  copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant>) => MutableModel<Restaurant> | void): Restaurant;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly gender?: Gender | keyof typeof Gender | null;
  readonly isStudent?: boolean | null;
  readonly hostelID?: string | null;
  readonly Orders?: (Order | null)[] | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly gender?: Gender | keyof typeof Gender | null;
  readonly isStudent?: boolean | null;
  readonly hostelID?: string | null;
  readonly Orders: AsyncCollection<Order>;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerHostel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Hostel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat: number;
  readonly lng: number;
  readonly hostelName: string;
  readonly address: string;
  readonly street?: string | null;
  readonly building?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHostel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Hostel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat: number;
  readonly lng: number;
  readonly hostelName: string;
  readonly address: string;
  readonly street?: string | null;
  readonly building?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Hostel = LazyLoading extends LazyLoadingDisabled ? EagerHostel : LazyHostel

export declare const Hostel: (new (init: ModelInit<Hostel>) => Hostel) & {
  copyOf(source: Hostel, mutator: (draft: MutableModel<Hostel>) => MutableModel<Hostel> | void): Hostel;
}