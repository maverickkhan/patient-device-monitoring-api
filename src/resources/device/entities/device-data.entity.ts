import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class DeviceData {
  @Field(() => ID)
  id: string;

  @Field()
  deviceId: string;

  @Field()
  patientId: string;

  @Field(() => Date)
  timestamp: Date;

  @Field(() => Int, { nullable: true })
  pulse?: number;

  @Field(() => Int, { nullable: true })
  systolic?: number;

  @Field(() => Int, { nullable: true })
  diastolic?: number;

  @Field(() => Int, { nullable: true })
  o2sat?: number;

  @Field(() => Date)
  createdAt: Date;
}
