import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBoard(id: number) {
    return 'Hello ' + id;
  }
}
