import { Module } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';
import { UserRepository } from './users.repository';
import { ServicesModule } from '../services/services.module';

@Module({
    imports: [ServicesModule],
    providers: [UserRepository],
    exports: [UserRepository]
})
export class RepositoriesModule {}
