import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { PatientRepository } from 'src/shared/repositories/patient.repository';
import { omit } from 'lodash';
import { METADATA_CONSTRUCTOR, PAGINATION_CONSTRUCTOR, PaginationDto } from 'src/common';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepo: PatientRepository) {}

  logger = new Logger(PatientService.name);
  async create(createPatientInput: CreatePatientInput) {
    try {
      const exist = await this.patientRepo.findByEmailAndPhone(
        createPatientInput.email,
        createPatientInput.phone,
      );
      if (exist) {
        this.logger.verbose(`Found an existing patient`);
        return exist;
      }
      return this.patientRepo.create(createPatientInput);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    try {
      const paginate = PAGINATION_CONSTRUCTOR(pagination);
      const data = await this.patientRepo.findAllPaginated(paginate);
      const count = await this.patientRepo.count();
      return {
        data,
        metadata: METADATA_CONSTRUCTOR(count, pagination)
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  update(updatePatientInput: UpdatePatientInput) {
    try {
      return this.patientRepo.update(
        updatePatientInput.id,
        omit(updatePatientInput, ['id']),
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const removed = await this.patientRepo.delete(id);
      if (!removed){
        this.logger.verbose(`Patient not found`);
        throw new NotFoundException('Patient not found')
      } 
      return 'Patient successfully removed'
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
