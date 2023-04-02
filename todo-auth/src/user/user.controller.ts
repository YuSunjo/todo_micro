import { Controller, HttpException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { ApiResponse } from '../api.response';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'login' })
  login() {
    return this.userService.login();
  }

  @MessagePattern({ cmd: 'signup' })
  async signup(data) {
    await this.userService.signup(data);
    return ApiResponse.ok();
  }
}
