import { Order } from './Order'
import { Item } from './Item'

export interface OrderItem {
  id: string;
  orderId: string;
  order?: Order;
  itemId: string;
  item?: Item;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderItemInput {
  itemId: string;
  quantity: number;
  priceAtPurchase: number;
}