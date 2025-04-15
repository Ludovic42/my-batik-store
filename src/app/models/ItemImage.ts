export interface ItemImage {
  id: string;
  itemId: string;
  imageUrl: string;
  orderIndex: number;
}

export interface ItemImageInput {
  itemId: string;
  imageUrl: string;
  orderIndex?: number;
}