import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

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
