import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from '../common/user/dto/create.user.request';

@Controller()
export class UserController {
  constructor(
    @Inject('TODO_AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
  ) {}

  @Post('api/v1/login')
  login() {
    return this.clientAuthService.send(
      { cmd: 'login' },
      { email: '', password: '' },
    );
  }

  @Post('api/v1/signup')
  signup(@Body() createUserRequest: CreateUserRequest) {
    console.log('aaa', createUserRequest);
    return this.clientAuthService.send({ cmd: 'signup' }, createUserRequest);
  }
}
