import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientService } from './patient.service';
import { PaginatedPatient, Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PaginationDto } from 'src/common';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/shared/services/gql-authguard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Mutation(() => Patient)
  patient_create(@Args('createPatientInput') createPatientInput: CreatePatientInput) {
    return this.patientService.create(createPatientInput);
  }

  @Query(() => PaginatedPatient)
  patient_list(@Args('paginationDto') paginationDto: PaginationDto) {
    return this.patientService.findAll(paginationDto);
  }

  @Mutation(() => Patient)
  patient_update(@Args('updatePatientInput') updatePatientInput: UpdatePatientInput) {
    return this.patientService.update(updatePatientInput);
  }

  @Mutation(() => String)
  patient_remove(@Args('id', { type: () => String }) id: string) {
    return this.patientService.remove(id);
  }
}
