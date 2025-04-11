import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DeviceService } from './device.service';
import { Device } from './entities/device.entity';
import { CreateDeviceInput } from './dto/create-device.input';
import { AssignDeviceInput } from './dto/assign-device.input';

@Resolver(() => Device)
export class DeviceResolver {
  constructor(private readonly deviceService: DeviceService) {}

  @Mutation(() => Device)
  device_create(
    @Args('createDeviceInput') createDeviceInput: CreateDeviceInput,
  ) {
    return this.deviceService.create(createDeviceInput);
  }

  @Mutation(() => Device)
  device_assign(
    @Args('assignDeviceInput') assignDeviceInput: AssignDeviceInput,
  ) {
    return this.deviceService.assignDevice(assignDeviceInput);
  }

  @Mutation(() => String)
  device_process(@Args('signal', { type: () => String }) signal: string) {
    return this.deviceService.processSignal(signal);
  }
}
