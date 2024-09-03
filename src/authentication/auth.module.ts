import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import UserModule from "../devs/users.module";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import UserService from "src/devs/users.service";

@Module({
    imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: 'KSD',
        signOptions: {
          expiresIn: `1h`,
        },
      }),
    }),
  ],
  providers:[AuthService,LocalStrategy,JwtStrategy],
  controllers:[AuthController]
})
export class AuthModule{}