import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UserModule from './devs/users.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/mydb'),UserModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
