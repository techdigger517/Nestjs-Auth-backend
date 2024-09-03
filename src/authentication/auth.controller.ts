import {
  Controller,
  Req,
  Post,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LogInDto from './dto/login.dts';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import TokenPayload from './tokenPayload.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const data: TokenPayload = {
      _id: user._id.toString(),
      name: user.name,
      gender: user.gender,
      birth: user.birth,
    };
    const token = this.authService.getJwtToken(data);
    return token;
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}
