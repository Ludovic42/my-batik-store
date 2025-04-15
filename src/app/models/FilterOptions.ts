export interface ItemFilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  creatorId?: string;
  search?: string;
  sortBy?: 'price' | 'createdAt' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface OrderFilterOptions {
  userId?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  creatorId?: string;
}