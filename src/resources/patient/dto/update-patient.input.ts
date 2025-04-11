import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePatientInput } from './create-patient.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePatientInput extends PartialType(CreatePatientInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;
}
