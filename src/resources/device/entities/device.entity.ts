import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  serialNo: string;

  @Field(() => String, { nullable: false })
  type: string;

  @Field(() => String, { nullable: true })
  patientId: string;

  // @Field(() => String, {nullable:false})
  // patient:    patient?

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  // @Field(() => String, {nullable:false})
  // DeviceData: devicedata
}
