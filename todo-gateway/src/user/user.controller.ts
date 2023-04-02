import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from '../common/user/dto/create.user.request';
import { BusinessException } from '../exception/business.exception';

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
  async signup(@Body() createUserRequest: CreateUserRequest) {
    console.log('aaa', createUserRequest);
    try {
      return await this.clientAuthService.send(
        { cmd: 'signup' },
        createUserRequest,
      );
    } catch (error) {
      console.log('error', error);
      throw new BusinessException(error.message, error.status);
    }
  }
}
