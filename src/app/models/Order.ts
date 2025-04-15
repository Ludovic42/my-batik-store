import { User } from './User'
import { OrderItem , OrderItemInput } from './OrderItem'

export interface Order {
  id: string;
  userId: string;
  user?: User;
  totalPrice: number;
  status: string;
  createdAt: Date;
  items?: OrderItem[];
}

export interface OrderInput {
  userId: string;
  items: OrderItemInput[];
  totalPrice: number;
  status?: string;
}