import { Request, Response } from 'express';
import { services } from '../services';
import { ApiResponse, User, UserInput } from '../models';

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await services.user.findAll();
      const response: ApiResponse<User[]> = {
        success: true,
        data: users
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

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await services.user.findById(id);
      
      if (!user) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'User not found'
        };
        return res.status(404).json(response);
      }
      
      const response: ApiResponse<User> = {
        success: true,
        data: user
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

  async createUser(req: Request, res: Response) {
    try {
      const userData: UserInput = req.body;
      const user = await services.user.create(userData);
      
      const response: ApiResponse<User> = {
        success: true,
        data: user,
        message: 'User created successfully'
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

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await services.user.update(id, userData);
      
      const response: ApiResponse<User> = {
        success: true,
        data: user,
        message: 'User updated successfully'
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

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await services.user.delete(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'User deleted successfully'
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
