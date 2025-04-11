import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CrypterService } from './crypter/crypter.service';
import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './gql-authguard';
import { ParserService } from './parser/parser.service';

@Module({
  providers: [
    PrismaService,
    CrypterService,
    JwtStrategy,
    GqlAuthGuard,
    ParserService,
  ],
  exports: [
    PrismaService,
    CrypterService,
    JwtStrategy,
    GqlAuthGuard,
    ParserService,
  ],
})
export class ServicesModule {}
