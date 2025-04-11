import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeviceService } from './device.service';
import { Device } from './entities/device.entity';
import { CreateDeviceInput } from './dto/create-device.input';
import { UpdateDeviceInput } from './dto/update-device.input';
import { AssignDeviceInput } from './dto/assign-device.input';

@Resolver(() => Device)
export class DeviceResolver {
  constructor(private readonly deviceService: DeviceService) {}

  @Mutation(() => Device)
  device_create(@Args('createDeviceInput') createDeviceInput: CreateDeviceInput) {
    return this.deviceService.create(createDeviceInput);
  }
  
  @Mutation(() => Device)
  device_assign(@Args('assignDeviceInput') assignDeviceInput: AssignDeviceInput) {
    return this.deviceService.assignDevice(assignDeviceInput);
  }
  
  @Mutation(() => String)
  device_process(@Args('signal', { type: () => String }) signal: string) {
    return this.deviceService.processSignal(signal);
  }

  //TOOD: remove below not needed right now

  // @Query(() => [Device], { name: 'device' })
  // findAll() {
  //   return this.deviceService.findAll();
  // }

  // @Query(() => Device, { name: 'device' })
  //   return this.deviceService.findOne(id);
  // findOne(@Args('id', { type: () => Int }) id: number) {
  // }

  // @Mutation(() => Device)
  // updateDevice(@Args('updateDeviceInput') updateDeviceInput: UpdateDeviceInput) {
  //   return this.deviceService.update(updateDeviceInput);
  // }

  // @Mutation(() => Device)
  // removeDevice(@Args('id', { type: () => String }) id: string) {
  //   return this.deviceService.remove(id);
  // }
}
