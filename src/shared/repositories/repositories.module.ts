import { Module } from '@nestjs/common';
import { BaseRepository } from './base/base.repository';
import { UserRepository } from './users.repository';
import { ServicesModule } from '../services/services.module';
import { PatientRepository } from './patient.repository';
import { DeviceRepository } from './device.repository';
import { DeviceDataRepository } from './device-data.repository';

@Module({
    imports: [ServicesModule],
    providers: [UserRepository, PatientRepository, DeviceRepository, DeviceDataRepository],
    exports: [UserRepository, PatientRepository, DeviceRepository, DeviceDataRepository]
})
export class RepositoriesModule {}
