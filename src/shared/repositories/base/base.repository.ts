import { PrismaService } from '../../services/prisma.service';
import { createId } from '@paralleldrive/cuid2';

export abstract class BaseRepository<T extends { id: string }> {
  protected abstract model: any;
  protected abstract prefix: string;

  constructor(protected readonly prisma: PrismaService) {}

  create(data: Partial<T>): Promise<T> {
    return this.model.create({
      data: {
        id: this.generateId(this.prefix),
        ...data,
      },
    });
  }

  findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  findAll(): Promise<T[]> {
    return this.model.findMany();
  }
  
  findMany(where: Partial<T>): Promise<T[]> {
    return this.model.findMany({
      where
    });
  }

  findAllPaginated(pagination: { skip: number; take: number }): Promise<T[]> {
    return this.model.findMany({
      ...pagination,
      where: {
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  async count(where: Partial<T> = {}): Promise<number> {
    return this.model.count({
      where: {
        ...where,
        deletedAt: null,
      },
    });
  }

  private generateId(prefix: string): string {
    return `${prefix}_${createId()}`;
  }
}
