
export interface CreatorSalesSummary {
  totalOrders: number;
  totalItemsSold: number;
  totalRevenue: number;
  itemsSoldByProduct: {
    itemId: string;
    itemName: string;
    quantity: number;
    revenue: number;
  }[];
}

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
}