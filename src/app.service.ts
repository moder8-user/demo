import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloWorld(): { text: string } {
    return {
      text: 'Hello World!',
    };
  }
}
