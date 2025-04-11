import { ObjectType, Field, ID } from '@nestjs/graphql';

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

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}
