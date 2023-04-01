import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    @Inject('TODO_AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
  ) {}

  @Get('api/v1/login')
  login() {
    return this.clientAuthService.send(
      { cmd: 'login' },
      { email: '', password: '' },
    );
  }
}
