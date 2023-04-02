import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServiceUtils } from './user.service.utils';
import * as bcrypt from 'bcrypt';
import { JwtConfig } from '../config/jwt.config';

@Injectable()
export class UserService {
  constructor(
    @Inject('TODO_AUTH_SERVICE') private readonly client: ClientProxy,
    @InjectRepository(User) private userRepository: UserRepository,
  ) {}

  async login(data) {
    const user = await UserServiceUtils.findUserByEmail(
      this.userRepository,
      data.email,
    );
    return JwtConfig.generateToken(user.id);
  }

  async signup(data) {
    console.log('data', data);
    await UserServiceUtils.validateEmail(this.userRepository, data.email);
    const encodedPassword = await bcrypt.hash(data.password, 10);
    await this.userRepository.save(
      User.newUser(data.email, encodedPassword, data.name),
    );
  }
}
