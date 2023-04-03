import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { ApiResponse } from '../api.response';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'login' })
  async login(data) {
    return ApiResponse.success(await this.userService.login(data));
  }

  @MessagePattern({ cmd: 'signup' })
  async signup(data) {
    await this.userService.signup(data);
    return ApiResponse.ok();
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser({ id }) {
    await this.userService.getUser(id);
    return ApiResponse.success(await this.userService.getUser(id));
  }
}
