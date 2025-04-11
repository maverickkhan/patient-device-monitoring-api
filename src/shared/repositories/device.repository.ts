import { Injectable } from '@nestjs/common';
import { Prisma, Device } from '@prisma/client';
import { BaseRepository } from './base/base.repository';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class DeviceRepository extends BaseRepository<Device> {
  protected model: Prisma.DeviceDelegate;
  protected prefix: string = 'dev';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
    this.model = prisma.device;
  }

  async findBySerialNumber(serialNo: string): Promise<Device | null> {
    return this.model.findUnique({
      where: {
        serialNo,
        deletedAt: null,
      },
    });
  }
}
