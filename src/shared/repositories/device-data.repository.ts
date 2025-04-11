import { Injectable } from '@nestjs/common';
import { Prisma, DeviceData } from '@prisma/client';
import { BaseRepository } from './base/base.repository';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class DeviceDataRepository extends BaseRepository<DeviceData> {
  protected model: Prisma.DeviceDataDelegate;
  protected prefix: string = 'devdat';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
    this.model = prisma.deviceData;
  }
}
