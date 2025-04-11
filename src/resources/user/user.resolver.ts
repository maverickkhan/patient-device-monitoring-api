import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserSignUpInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  user_signup(@Args('userSignUpInput') userSignUpInput: UserSignUpInput) {
    return this.userService.singUp(userSignUpInput);
  }

  @Query(() => String)
  user_signin(@Args('userSignInInput') userSignInInput: UserSignUpInput) {
    return this.userService.signIn(userSignInInput);
  }
}
