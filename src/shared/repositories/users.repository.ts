import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { BaseRepository } from './base/base.repository';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  protected model: Prisma.UserDelegate;
  protected prefix: string = 'user';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
    this.model = prisma.user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findUnique({ where: { email, deletedAt: null } });
  }
}
