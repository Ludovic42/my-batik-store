import { PrismaService } from './prisma.service';
import { Review } from '../../generated/prisma';

export class ReviewService {
  private prisma = PrismaService.getInstance();

  async findAll(): Promise<Review[]> {
    return this.prisma.review.findMany({
      include: {
        user: true,
        item: true
      }
    });
  }

  async findById(id: string): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        item: true
      }
    });
  }

  async findByItemId(itemId: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { itemId },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findByUserId(userId: string): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { userId },
      include: {
        item: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async create(data: {
    userId: string;
    itemId: string;
    rating: number;
    comment?: string;
  }): Promise<Review> {
    return this.prisma.review.create({
      data,
      include: {
        user: true,
        item: true
      }
    });
  }

  async update(id: string, data: {
    rating?: number;
    comment?: string;
  }): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data,
      include: {
        user: true,
        item: true
      }
    });
  }

  async delete(id: string): Promise<Review> {
    return this.prisma.review.delete({
      where: { id }
    });
  }
}
