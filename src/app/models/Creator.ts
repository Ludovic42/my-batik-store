import { User } from './User'
import { Item } from './Item'


export interface Creator {
  id: string;
  userId: string;
  name: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  user?: User;
  items?: Item[];
}

export interface CreatorInput {
  userId: string;
  name: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}