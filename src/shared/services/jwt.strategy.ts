import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET, JwtPayload } from 'src/common';
import { omit } from 'lodash';
import { PrismaService } from './prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  logger = new Logger(JwtStrategy.name);
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload) {
    this.logger.log(`validate payload: ${JSON.stringify(payload)}`);
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: payload.id,
          deletedAt: null,
        },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return omit(user, ['password']);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
