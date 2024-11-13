import { Module } from '@nestjs/common';

import { AppController } from './controller/app.controller';
import { AppService } from './provider/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
