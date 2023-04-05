import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from '../common/user/dto/create.user.request';
import { BusinessException } from '../exception/business.exception';
import { LoginUserRequest } from '../common/user/dto/login.user.request';
import { AuthGuard } from './guard/auth.guard';

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

  @Get('api/v1/user')
  @UseGuards(AuthGuard)
  async getUser(@Request() request) {
    return this.clientAuthService.send({ cmd: 'getUser' }, request.user);
  }
}
