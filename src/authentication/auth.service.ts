import { Injectable, HttpException, HttpStatus, Provider } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import UserService from '../devs/users.service';
import { ObjectId } from 'mongoose';
import TokenPayload from './tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public getJwtToken(data:TokenPayload) {
    const payload:TokenPayload=data;
    const token = this.jwtService.sign(payload);
    return token;
  }
  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.getByEmail(email);
      if (password === user.password) {
        return user;
      } else {
        throw new HttpException("Wrong Password", HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(
        "Check your email or password",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
