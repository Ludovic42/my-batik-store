import { PrismaService } from './prisma.service';
import { User } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

export class UserService {
  private prisma = PrismaService.getInstance();

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { creator: true, orders: true, reviews: true }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async create(data: {
    email: string;
    password: string;
    name?: string;
    role?: string;
  }): Promise<User> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(data.password, saltRounds);
    
    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: data.role || 'user'
      }
    });
  }

  async update(id: string, data: {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
  }): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { ...data };
    
    if (data.password) {
      const saltRounds = 10;
      updateData.passwordHash = await bcrypt.hash(data.password, saltRounds);
      delete updateData.password;
    }
    
    return this.prisma.user.update({
      where: { id },
      data: updateData
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}