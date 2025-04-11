import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserSignUpInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  user_signup(@Args('userSignUpInput') userSignUpInput: UserSignUpInput) {
    console.log("🚀 ~ UserResolver ~ user_signup ~ createUserInput:", userSignUpInput)
    return this.userService.singUp(userSignUpInput);
  }

  @Query(() => String)
  user_signin(@Args('userSignInInput') userSignInInput: UserSignUpInput) {
    return this.userService.signIn(userSignInInput);
  }

  //TODO: remove below if not used

  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
}
