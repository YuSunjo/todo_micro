import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServiceUtils } from './user.service.utils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserInfoResponse } from './dto/user.info.response';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('TODO_AUTH_SERVICE') private readonly client: ClientProxy,
    @InjectRepository(User) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async login(data) {
    const user = await UserServiceUtils.findUserByEmail(
      this.userRepository,
      data.email,
    );
    return await this.jwtService.signAsync({ id: user.id });
  }

  async signup(data) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await UserServiceUtils.validateEmail(this.userRepository, data.email);
      const encodedPassword = await bcrypt.hash(data.password, 10);
      const user = await queryRunner.manager
        .getRepository(User)
        .save(User.newUser(data.email, encodedPassword, data.name));
      return UserInfoResponse.of(user);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getUser(id: number) {
    const user = await UserServiceUtils.findUserById(this.userRepository, id);
    return UserInfoResponse.of(user);
  }
}
