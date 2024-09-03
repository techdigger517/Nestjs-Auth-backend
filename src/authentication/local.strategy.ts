import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '../devs/users.shema';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<UserDocument> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
