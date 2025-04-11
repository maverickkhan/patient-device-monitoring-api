import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [SharedModule, PatientModule, UserModule, DeviceModule],
  exports: [PatientModule, UserModule],
})
export class ResourcesModule {}
