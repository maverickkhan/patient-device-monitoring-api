import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateDeviceInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  serialNo: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  type: string;
}
