import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from '../common/user/dto/create.user.request';
import { BusinessException } from '../exception/business.exception';
import { LoginUserRequest } from '../common/user/dto/login.user.request';

@Controller()
export class UserController {
  constructor(
    @Inject('TODO_AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
  ) {}

  @Post('api/v1/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() request: LoginUserRequest) {
    return this.clientAuthService.send({ cmd: 'login' }, request);
  }

  @Post('api/v1/signup')
  @UsePipes(new ValidationPipe())
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
