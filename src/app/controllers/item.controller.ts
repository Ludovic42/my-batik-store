import { Request, Response } from 'express';
import { services } from '../services';
import { ApiResponse, Item, ItemInput, ItemFilterOptions, ItemImageInput } from '../models';

export class ItemController {
  async getAllItems(req: Request, res: Response) {
    try {
      const filters: ItemFilterOptions = {
        category: req.query.category as string,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
        creatorId: req.query.creatorId as string,
        search: req.query.search as string,
        sortBy: req.query.sortBy as 'price' | 'createdAt' | 'name',
        sortOrder: req.query.sortOrder as 'asc' | 'desc'
      };
      
      const items = await services.item.findAll(filters);
      
      const response: ApiResponse<Item[]> = {
        success: true,
        data: items
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

  async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await services.item.findById(id);
      
      if (!item) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Item not found'
        };
        return res.status(404).json(response);
      }
      
      const response: ApiResponse<Item> = {
        success: true,
        data: item
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

  async createItem(req: Request, res: Response) {
    try {
      const itemData: ItemInput & { images?: ItemImageInput[] } = req.body;
      const item = await services.item.create(itemData);
      
      const response: ApiResponse<Item> = {
        success: true,
        data: item,
        message: 'Item created successfully'
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

  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const itemData = req.body;
      const item = await services.item.update(id, itemData);
      
      const response: ApiResponse<Item> = {
        success: true,
        data: item,
        message: 'Item updated successfully'
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

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await services.item.delete(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Item deleted successfully'
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

  async addItemImage(req: Request, res: Response) {
    try {
      const { itemId } = req.params;
      const { imageUrl, orderIndex } = req.body;
      
      const updatedItem = await services.item.addImage(itemId, imageUrl, orderIndex);
      
      const response: ApiResponse<Item> = {
        success: true,
        data: updatedItem,
        message: 'Image added successfully'
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

  async removeItemImage(req: Request, res: Response) {
    try {
      const { imageId } = req.params;
      await services.item.removeImage(imageId);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Image removed successfully'
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
