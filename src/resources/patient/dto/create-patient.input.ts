import { InputType, Field } from '@nestjs/graphql';
import { GENDER } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePatientInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Number, { nullable: false })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @Field(() => GENDER, { nullable: false })
  @IsNotEmpty()
  gender: GENDER;

  @Field(() => String, { nullable: true })
  @IsString()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  address: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  dob: Date;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  bloodGroup: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  notes: string;
}
