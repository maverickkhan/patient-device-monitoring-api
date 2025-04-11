import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CrypterService } from './crypter/crypter.service';

@Module({
    providers: [PrismaService, CrypterService],
    exports: [PrismaService, CrypterService]
})
export class ServicesModule {}
