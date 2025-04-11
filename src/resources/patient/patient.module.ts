import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';

@Module({
  providers: [PatientResolver, PatientService],
  exports: [PatientResolver, PatientService],
})
export class PatientModule {}
