import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SharedModule, PatientModule, UserModule],
  exports: [PatientModule],
})
export class ResourcesModule {}
