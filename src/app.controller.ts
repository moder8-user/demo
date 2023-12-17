import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('hello-world')
  getHelloWorld(): { text: string } {
    return this.appService.getHelloWorld();
  }
}
