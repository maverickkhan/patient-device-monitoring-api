import { Injectable } from '@nestjs/common';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PatientRepository } from 'src/shared/repositories/patient.repository';

@Injectable()
export class PatientService {
  constructor(
    private readonly patientRepo: PatientRepository,
  ){}
  create(createPatientInput: CreatePatientInput) {
    return 'This action adds a new patient';
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientInput: UpdatePatientInput) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
