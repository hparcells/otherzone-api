import { HttpService } from '@nestjs/axios';
import { Injectable, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { randomOf } from '../util/array';

import { OTHERZONE_TYPES, OtherzoneType } from '../types';

@Injectable()
export class OtherzoneService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  isOtherzoneType(type: string): boolean {
    return OTHERZONE_TYPES.includes(type as any);
  }

  async getItems() {
    const listUrl = this.configService.get('OTHERZONE_LIST_URL');
    const data = this.httpService.get(listUrl);
    const response = await firstValueFrom(data);
    const content = response.data;

    let items = content.split('\r\n');
    items = items.filter((item) => {
      return item.length > 0;
    });

    return items;
  }

  async getStats() {
    const items = await this.getItems();
    const types = items.reduce(
      (acc, item) => {
        const type = item.split('.').pop();
        if (acc[type]) {
          acc[type]++;
        } else {
          acc[type] = 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      count: items.length,
      types
    };
  }

  async getRandomItem(type?: OtherzoneType): Promise<string> {
    const items = await this.getItems();

    let item: string;
    do {
      item = randomOf(items);
    } while (
      (type && !item.endsWith(type)) ||
      !OTHERZONE_TYPES.includes(item.split('.').pop() as any)
    );

    return item;
  }

  async getRandomUrl(type?: OtherzoneType): Promise<string> {
    const item = await this.getRandomItem(type);

    return `https://otherzone.net/${item}`;
  }

  async getRandomStreamableFile(type?: OtherzoneType): Promise<StreamableFile> {
    const randomUrl = await this.getRandomUrl(type);
    const request = this.httpService.get(randomUrl, {
      responseType: 'arraybuffer'
    });
    const response = await firstValueFrom(request);
    const arrayBuffer = response.data;
    const buffer = Buffer.from(arrayBuffer);

    const file = new StreamableFile(buffer, {
      type: response.headers['content-type'],
      disposition: `inline`,
      length: buffer.length
    });

    return file;
  }
}
