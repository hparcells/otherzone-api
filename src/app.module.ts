import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { OtherzoneService } from './provider/otherzone.service';
import { OtherzoneController } from './controller/otherzone.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, AuthModule],
  controllers: [OtherzoneController],
  providers: [OtherzoneService]
})
export class AppModule {}
