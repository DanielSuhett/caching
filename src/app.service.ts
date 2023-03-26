import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getArray(): string[] {
    return ['cache', 'everything'];
  }
}
