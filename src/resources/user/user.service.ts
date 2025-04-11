import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UserSignUpInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { CrypterService } from 'src/shared/services/crypter/crypter.service';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly crypter: CrypterService,
    private readonly jwt: JwtService,
  ) {}

  logger = new Logger(UserService.name)
  async singUp(userSignUpInput: UserSignUpInput) {
    try {
      const hashed = await this.crypter.hashString(userSignUpInput.password);
      return this.userRepo.create({
        email: userSignUpInput.email,
        password: hashed
      })
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async signIn(userSignInInput:UserSignUpInput): Promise<string> {
    try {
      const user = await this.userRepo.findByEmail(userSignInInput.email);
      if(!user) 
      {
        throw new NotFoundException(`Invalid credentials`);
      }
      const isValid = await this.crypter.compare(userSignInInput.password, user.password);
      if(!isValid) {
        throw new NotFoundException(`Invalid credentials`);
      }
      return this.jwt.sign({id: user.id});
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }


  //TODO: remove below if not used
  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // // update(id: number, updateUserInput: UpdateUserInput) {
  // //   return `This action updates a #${id} user`;
  // // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
