import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [PatientResolver, PatientService],
  exports: [PatientResolver, PatientService],
})
export class PatientModule {}
