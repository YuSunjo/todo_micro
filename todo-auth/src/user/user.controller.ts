import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'login' })
  async login(data) {
    return await this.userService.login(data);
  }

  @MessagePattern({ cmd: 'signup' })
  async signup(data) {
    return await this.userService.signup(data);
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser({ id }) {
    return await this.userService.getUser(id);
  }
}
