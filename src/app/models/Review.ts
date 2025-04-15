import { User } from './User'
import { Item } from './Item'

export interface Review {
  id: string;
  userId: string;
  user?: User;
  itemId: string;
  item?: Item;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface ReviewInput {
  userId: string;
  itemId: string;
  rating: number;
  comment?: string;
}