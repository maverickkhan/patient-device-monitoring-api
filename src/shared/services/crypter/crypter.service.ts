import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CrypterService {
  private saltRounds = 10;

  async hashString(input: string): Promise<string> {
    return await bcrypt.hash(input, this.saltRounds);
  }

  async compare(plainString: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainString, hash);
  }
}
