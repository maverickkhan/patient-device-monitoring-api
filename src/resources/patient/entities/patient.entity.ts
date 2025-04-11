import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Patient {
  @Field(() => ID)
  id: string;
}
