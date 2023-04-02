import { Controller } from '@nestjs/common';
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
  signup(data) {
    console.log('data', data);
    return ApiResponse.success(this.userService.signup(data));
  }
}
