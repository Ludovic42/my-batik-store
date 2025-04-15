import { PrismaService } from './prisma.service';
import { Item } from '../../generated/prisma';

export class ItemService {
  private prisma = PrismaService.getInstance();

  async findAll(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    creatorId?: string;
  }): Promise<Item[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    
    if (filters?.category) {
      where.category = filters.category;
    }
    
    if (filters?.creatorId) {
      where.creatorId = filters.creatorId;
    }
    
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {};
      if (filters?.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters?.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }
    
    return this.prisma.item.findMany({
      where,
      include: {
        creator: true,
        images: {
          orderBy: {
            orderIndex: 'asc'
          }
        },
        reviews: true
      }
    });
  }

  async findById(id: string): Promise<Item | null> {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        creator: true,
        images: {
          orderBy: {
            orderIndex: 'asc'
          }
        },
        reviews: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async create(data: {
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
    images?: { imageUrl: string; orderIndex?: number }[];
  }): Promise<Item> {
    const { images, ...itemData } = data;
    
    return this.prisma.item.create({
      data: {
        ...itemData,
        images: images ? {
          create: images
        } : undefined
      },
      include: {
        images: true,
        creator: true
      }
    });
  }

  async update(id: string, data: {
    name?: string;
    price?: number;
    category?: string;
    description?: string;
    widthCm?: number;
    heightCm?: number;
    size?: string;
    colors?: string[];
    mainImage?: string;
  }): Promise<Item> {
    return this.prisma.item.update({
      where: { id },
      data,
      include: {
        images: true,
        creator: true
      }
    });
  }

  async delete(id: string): Promise<Item> {
    // First delete related images
    await this.prisma.itemImage.deleteMany({
      where: { itemId: id }
    });
    
    // Then delete the item
    return this.prisma.item.delete({
      where: { id }
    });
  }

  async addImage(itemId: string, imageUrl: string, orderIndex: number = 0): Promise<Item> {
    await this.prisma.itemImage.create({
      data: {
        itemId,
        imageUrl,
        orderIndex
      }
    });
    
    return this.findById(itemId) as Promise<Item>;
  }

  async removeImage(imageId: string): Promise<void> {
    await this.prisma.itemImage.delete({
      where: { id: imageId }
    });
  }

  async updateImageOrder(itemId: string, imageOrders: { id: string; orderIndex: number }[]): Promise<void> {
    const transaction = imageOrders.map(img => 
      this.prisma.itemImage.update({
        where: { id: img.id },
        data: { orderIndex: img.orderIndex }
      })
    );
    
    await this.prisma.$transaction(transaction);
  }
}
