import { Creator } from './Creator'
import { ItemImage } from './ItemImage'
import { Review } from './Review'

  export interface Item {
    id: string;
    creatorId: string;
    creator?: Creator;
    name: string;
    category?: string;
    price: number;
    description?: string;
    widthCm?: number;
    heightCm?: number;
    size?: string;
    colors: string[];
    mainImage?: string;
    createdAt: Date;
    images?: ItemImage[];
    reviews?: Review[];
  }
  
  export interface ItemInput {
    creatorId: string;
    name: string;
    price: number;
    category?: string;
    description?: string;
    widthCm?: number;
    heightCm?: number;
    size?: string;
    colors?: string[];
    mainImage?: string;
  }