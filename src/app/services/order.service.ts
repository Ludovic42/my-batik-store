import { PrismaService } from './prisma.service';
import { Order, OrderItem } from '../../generated/prisma';

export class OrderService {
  private prisma = PrismaService.getInstance();

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            item: true
          }
        }
      }
    });
  }

  async findById(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            item: true
          }
        }
      }
    });
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            item: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async create(data: {
    userId: string;
    items: {
      itemId: string;
      quantity: number;
      priceAtPurchase: number;
    }[];
    totalPrice: number;
    status?: string;
  }): Promise<Order> {
    const { items, ...orderData } = data;
    
    return this.prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items
        }
      },
      include: {
        items: {
          include: {
            item: true
          }
        }
      }
    });
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            item: true
          }
        }
      }
    });
  }

  async delete(id: string): Promise<Order> {
    // First delete related order items
    await this.prisma.orderItem.deleteMany({
      where: { orderId: id }
    });
    
    // Then delete the order
    return this.prisma.order.delete({
      where: { id }
    });
  }

  
  // New function to get OrderItems for a specific order
  async getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({
      where: { orderId },
      include: {
        item: true,
        order: {
          include: {
            user: true
          }
        }
      }
    });
  }

  // New function to get OrderItems for items created by a specific creator
  async getOrderItemsByCreatorId(creatorId: string): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({
      where: {
        item: {
          creatorId
        }
      },
      include: {
        item: true,
        order: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        order: {
          createdAt: 'desc'
        }
      }
    });
  }

  // New function to get summary statistics for a creator's sales
  async getCreatorSalesSummary(creatorId: string): Promise<{
    totalOrders: number;
    totalItemsSold: number;
    totalRevenue: number;
    itemsSoldByProduct: { itemId: string, itemName: string, quantity: number, revenue: number }[];
  }> {
    // Get all order items for this creator's products with proper item inclusion
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        item: {
          creatorId
        }
      },
      include: {
        item: true,
        order: true
      }
    });
    
    // Calculate the summary statistics
    let totalItemsSold = 0;
    let totalRevenue = 0;
    const itemMap = new Map<string, { itemName: string, quantity: number, revenue: number }>();
    
    orderItems.forEach(orderItem => {
      // Make sure we have item data before trying to access properties
      if (!orderItem.item) {
        console.warn(`Order item ${orderItem.id} has no associated item data`);
        return;
      }
      
      totalItemsSold += orderItem.quantity;
      const itemRevenue = orderItem.quantity * orderItem.priceAtPurchase;
      totalRevenue += itemRevenue;
      
      // Track per-product statistics
      const existing = itemMap.get(orderItem.itemId);
      if (existing) {
        existing.quantity += orderItem.quantity;
        existing.revenue += itemRevenue;
      } else {
        itemMap.set(orderItem.itemId, {
          itemName: orderItem.item.name, // Now we're sure we have item.name
          quantity: orderItem.quantity,
          revenue: itemRevenue
        });
      }
    });
    
    // Convert the map to the expected return format
    const itemsSoldByProduct = Array.from(itemMap.entries()).map(([itemId, data]) => ({
      itemId,
      itemName: data.itemName,
      quantity: data.quantity,
      revenue: data.revenue
    }));
    
    // Sort by revenue (highest first)
    itemsSoldByProduct.sort((a, b) => b.revenue - a.revenue);
    
    return {
      totalOrders: new Set(orderItems.map(item => item.orderId)).size,
      totalItemsSold,
      totalRevenue,
      itemsSoldByProduct
    };
  }
  
  // New function to get order statistics for a specific time period
  async getOrderStatistics(options?: {
    startDate?: Date;
    endDate?: Date;
    creatorId?: string;
    status?: string;
  }): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
  }> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    
    if (options?.startDate || options?.endDate) {
      where.createdAt = {};
      if (options?.startDate) {
        where.createdAt.gte = options.startDate;
      }
      if (options?.endDate) {
        where.createdAt.lte = options.endDate;
      }
    }
    
    if (options?.status) {
      where.status = options.status;
    }
    
    // For creatorId filtering, we need a more complex approach since it's not directly on Order
    let orders: Order[] = [];
    
    if (options?.creatorId) {
      // Find all items from this creator
      const items = await this.prisma.item.findMany({
        where: { creatorId: options.creatorId },
        select: { id: true }
      });
      
      const itemIds = items.map(item => item.id);
      
      if (itemIds.length === 0) {
        // No items from this creator, so no orders
        return {
          totalOrders: 0,
          totalRevenue: 0,
          averageOrderValue: 0,
          ordersByStatus: {}
        };
      }
      
      // Find orders containing these items
      const orderItems = await this.prisma.orderItem.findMany({
        where: {
          itemId: { in: itemIds },
          order: where // Apply other filters
        },
        select: {
          orderId: true
        },
        distinct: ['orderId']
      });
      
      const orderIds = orderItems.map(oi => oi.orderId);
      
      if (orderIds.length === 0) {
        // No orders with items from this creator
        return {
          totalOrders: 0,
          totalRevenue: 0,
          averageOrderValue: 0,
          ordersByStatus: {}
        };
      }
      
      // Now get the actual orders
      orders = await this.prisma.order.findMany({
        where: {
          id: { in: orderIds }
        }
      });
    } else {
      // No creator filter, just get orders based on other criteria
      orders = await this.prisma.order.findMany({ where });
    }
    
    // Calculate statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Count orders by status
    const ordersByStatus: Record<string, number> = {};
    orders.forEach(order => {
      const status = order.status;
      ordersByStatus[status] = (ordersByStatus[status] || 0) + 1;
    });
    
    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      ordersByStatus
    };
  }
}
