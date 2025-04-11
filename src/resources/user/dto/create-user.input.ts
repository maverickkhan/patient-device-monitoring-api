import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UserSignUpInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  password: string;
}
