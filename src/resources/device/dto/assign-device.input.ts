import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AssignDeviceInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  deviceId: string;
}
