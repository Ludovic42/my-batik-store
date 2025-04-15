import { Request, Response } from 'express';
import { services } from '../services';
import { ApiResponse, Order, OrderInput, OrderStatistics, CreatorSalesSummary, OrderItem } from '../models';

export class OrderController {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await services.order.findAll();
      
      const response: ApiResponse<Order[]> = {
        success: true,
        data: orders
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await services.order.findById(id);
      
      if (!order) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Order not found'
        };
        return res.status(404).json(response);
      }
      
      const response: ApiResponse<Order> = {
        success: true,
        data: order
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async getUserOrders(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const orders = await services.order.findByUserId(userId);
      
      const response: ApiResponse<Order[]> = {
        success: true,
        data: orders
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const orderData: OrderInput = req.body;
      const order = await services.order.create(orderData);
      
      const response: ApiResponse<Order> = {
        success: true,
        data: order,
        message: 'Order created successfully'
      };
      return res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const order = await services.order.updateStatus(id, status);
      
      const response: ApiResponse<Order> = {
        success: true,
        data: order,
        message: 'Order status updated successfully'
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await services.order.delete(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Order deleted successfully'
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async getOrderItems(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const orderItems = await services.order.getOrderItemsByOrderId(orderId);
      
      const response: ApiResponse<OrderItem[]> = {
        success: true,
        data: orderItems
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async getCreatorOrderItems(req: Request, res: Response) {
    try {
      const { creatorId } = req.params;
      const orderItems = await services.order.getOrderItemsByCreatorId(creatorId);
      
      const response: ApiResponse<OrderItem[]> = {
        success: true,
        data: orderItems
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async getCreatorSalesSummary(req: Request, res: Response) {
    try {
      const { creatorId } = req.params;
      const summary = await services.order.getCreatorSalesSummary(creatorId);
      
      const response: ApiResponse<CreatorSalesSummary> = {
        success: true,
        data: summary
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }

  async getOrderStatistics(req: Request, res: Response) {
    try {
      const { startDate, endDate, creatorId, status } = req.query;
      
      const options = {
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        creatorId: creatorId as string,
        status: status as string
      };
      
      const statistics = await services.order.getOrderStatistics(options);
      
      const response: ApiResponse<OrderStatistics> = {
        success: true,
        data: statistics
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      return res.status(500).json(response);
    }
  }
}