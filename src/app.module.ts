import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { OtherzoneService } from './provider/otherzone.service';
import { OtherzoneController } from './controller/otherzone.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [OtherzoneController],
  providers: [OtherzoneService]
})
export class AppModule {}
