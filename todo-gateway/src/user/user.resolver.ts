import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInfoResponse } from '../common/user/dto/user.info.response';
import { CreateUserRequest } from '../common/user/dto/create.user.request';
import { LoginUserRequest } from '../common/user/dto/login.user.request';
import { GraphqlAuthGuard } from './guard/graphql.auth.guard';
import { UserId } from './guard/user.id.decorator';

@Resolver()
export class UserResolver {
  constructor(
    @Inject('TODO_AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
  ) {}

  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => UserInfoResponse)
  async signup(@Args('createUserRequest') request: CreateUserRequest) {
    return this.clientAuthService.send({ cmd: 'signup' }, request);
  }

  @Mutation(() => String)
  async login(@Args('loginUserRequest') request: LoginUserRequest) {
    return this.clientAuthService.send({ cmd: 'login' }, request);
  }

  @Query(() => UserInfoResponse)
  @UseGuards(GraphqlAuthGuard)
  async getUser(@UserId() id: number) {
    return this.clientAuthService.send({ cmd: 'getUser' }, id);
  }
}
