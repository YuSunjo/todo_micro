import {Controller, Get, Inject, Param} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TODO_AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
    @Inject('TODO_BOARD_SERVICE')
    private readonly clientBoardService: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/v1/login')
  login() {
    return this.clientAuthService.send(
      { cmd: 'login' },
      { email: '', password: '' },
    );
  }

  @Get('api/v1/board/:id')
  getBoard(@Param('id') id: number) {
    return this.clientBoardService.send({ cmd: 'getBoard' }, id);
  }
}
