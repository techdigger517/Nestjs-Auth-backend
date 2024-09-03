import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import TokenPayload from './tokenPayload.interface';
import UsersService from '../devs/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.headers?.authorization;
        },
      ]),
      secretOrKey: 'KSD',
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload._id);
  }
}
