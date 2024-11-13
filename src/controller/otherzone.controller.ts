import { Controller, Get, Header, Headers, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OtherzoneService } from '../provider/otherzone.service';

@Controller()
export class OtherzoneController {
  constructor(
    private configService: ConfigService,
    private readonly otherzoneService: OtherzoneService
  ) {}

  @Get()
  @Redirect('https://otherzone.net/')
  async redirectToOtherzone() {
    return {};
  }

  @Get('random')
  async sendRandom(@Query('type') type) {
    if (type && !this.otherzoneService.isOtherzoneType(type)) {
      return {
        error: 'Invalid type.'
      };
    }

    const file = await this.otherzoneService.getRandomStreamableFile(type);

    return file;
  }

  @Get('random-item')
  async sendRandomItem(@Query('type') type, @Headers('X-Oz-Key') key: Headers) {
    if (!key) {
      return {
        error: 'Missing "X-Oz-Key" header.'
      };
    }
    if (key !== this.configService.get('MASTER_API_KEY')) {
      return {
        error: 'Invalid "X-Oz-Key" header.'
      };
    }

    if (type && !this.otherzoneService.isOtherzoneType(type)) {
      return {
        error: 'Invalid type.'
      };
    }

    const item = await this.otherzoneService.getRandomItem(type);

    return item;
  }

  @Get('random-url')
  async sendRandomUrl(@Query('type') type, @Headers('X-Oz-Key') key: Headers) {
    if (!key) {
      return {
        error: 'Missing "X-Oz-Key" header.'
      };
    }
    if (key !== this.configService.get('MASTER_API_KEY')) {
      return {
        error: 'Invalid "X-Oz-Key" header.'
      };
    }

    if (type && !this.otherzoneService.isOtherzoneType(type)) {
      return {
        error: 'Invalid type.'
      };
    }

    const item = await this.otherzoneService.getRandomUrl(type);

    return item;
  }

  @Get('stats')
  async getStats() {
    return await this.otherzoneService.getStats();
  }
}
