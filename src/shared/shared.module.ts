import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [ServicesModule, RepositoriesModule],
  exports: [ServicesModule, RepositoriesModule],
})
export class SharedModule {}
