import { PrismaService } from './prisma.service';
import { Creator } from '../../generated/prisma';

export class CreatorService {
  private prisma = PrismaService.getInstance();

  async findAll(): Promise<Creator[]> {
    return this.prisma.creator.findMany({
      include: { user: true, items: true }
    });
  }

  async findById(id: string): Promise<Creator | null> {
    return this.prisma.creator.findUnique({
      where: { id },
      include: { user: true, items: true }
    });
  }

  async findByUserId(userId: string): Promise<Creator | null> {
    return this.prisma.creator.findUnique({
      where: { userId },
      include: { items: true }
    });
  }

  async create(data: {
    userId: string;
    name: string;
    bio?: string;
    location?: string;
    avatarUrl?: string;
  }): Promise<Creator> {
    return this.prisma.creator.create({
      data
    });
  }

  async update(id: string, data: {
    name?: string;
    bio?: string;
    location?: string;
    avatarUrl?: string;
  }): Promise<Creator> {
    return this.prisma.creator.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<Creator> {
    // Will need to handle deleting or reassigning items first
    return this.prisma.creator.delete({
      where: { id }
    });
  }
}
