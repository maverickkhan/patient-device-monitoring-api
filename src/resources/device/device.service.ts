import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { DeviceRepository } from 'src/shared/repositories/device.repository';
import { AssignDeviceInput } from './dto/assign-device.input';
import { ParserService } from 'src/shared/services/parser/parser.service';
import { DeviceDataRepository } from 'src/shared/repositories/device-data.repository';

@Injectable()
export class DeviceService {
  constructor(
    private readonly parser: ParserService,
    private readonly deviceRepo: DeviceRepository,
    private readonly deviceDataRepo: DeviceDataRepository,
  ) {}

  logger = new Logger(DeviceRepository.name);

  async create(createDeviceInput: CreateDeviceInput) {
    try {
      const exist = await this.deviceRepo.findBySerialNumber(
        createDeviceInput.serialNo,
      );
      if (exist) {
        this.logger.verbose(`Device with similar serial number already exist`);
        return exist;
      }
      return this.deviceRepo.create(createDeviceInput);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async assignDevice(assignDevice: AssignDeviceInput) {
    try {
      return this.deviceRepo.assignToPatient(
        assignDevice.deviceId,
        assignDevice.patientId,
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async processSignal(rawData: string) {
    try {
      const { deviceId, ...parsedData } =
        this.parser.processDeviceData(rawData);
        const device = await this.deviceRepo.findById(deviceId);        
    
      if (!device) {
        this.logger.warn(`Device not found`);
        throw new BadRequestException(
          `Device not found for devID: ${deviceId}`,
        );
      }

      if (!device.patientId) {
        this.logger.warn(`Device not assigned to patient`);
        throw new BadRequestException(
          `Device not assigned to patient for devID: ${deviceId}`,
        );
      }

      await this.deviceDataRepo.create({
          deviceId,
          patientId: device.patientId,
          ...parsedData,
        });
        return `Signal Process Successfully`
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
