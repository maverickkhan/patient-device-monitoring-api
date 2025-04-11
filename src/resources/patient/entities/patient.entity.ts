import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { GENDER } from '@prisma/client';
import { Paginated } from 'src/common/helpers/pagination.entity';
import { Device } from 'src/resources/device/entities/device.entity';

registerEnumType(GENDER, {
  name: 'GENDER',
});
@ObjectType()
export class Patient {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  age: string;

  @Field(() => GENDER, { nullable: false })
  gender: GENDER;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => Date, { nullable: true })
  dob: Date;

  @Field(() => String, { nullable: true })
  bloodGroup: string;

  @Field(() => String, { nullable: true })
  notes: string;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @Field(() => [Device], { nullable: true })
  Device: Device[];

  // @Field(() => String, { nullable: false })
  // DeviceData: string;
}

@ObjectType()
export class PaginatedPatient extends Paginated(Patient) {}