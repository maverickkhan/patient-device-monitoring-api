import { Injectable } from '@nestjs/common';
import { Prisma, Patient } from '@prisma/client';
import { BaseRepository } from './base/base.repository';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class PatientRepository extends BaseRepository<Patient> {
  protected model: Prisma.PatientDelegate;
  protected prefix: string = 'pat';

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
    this.model = prisma.patient;
  }

  async findByEmailAndPhone(
    email: string,
    phone: string,
  ): Promise<Patient | null> {
    return this.model.findUnique({
      where: {
        email_phone: {
          email,
          phone,
        },
        deletedAt: null,
      },
    });
  }
}
