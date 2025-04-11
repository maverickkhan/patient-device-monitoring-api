import { PrismaService } from "../../services/prisma.service";
import {createId} from '@paralleldrive/cuid2';

export abstract class BaseRepository<T extends { id: string }> {
  protected abstract model: any;
  protected abstract prefix: string;

  constructor(protected readonly prisma: PrismaService) {
  }
  
  async create(data: Partial<T>): Promise<T> {
    return this.model.create({ 
      data: {
        id: this.generateId(this.prefix),
        ...data,
      }
     });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findAllPaginated(page: number, limit: number): Promise<T[]> {
    return this.model.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    return this.model.update({ where: { id }, data: { deletedAt: new Date()} });
  }

  private generateId(prefix: string): string {
    return `${prefix}_${createId()}`
  }
}
