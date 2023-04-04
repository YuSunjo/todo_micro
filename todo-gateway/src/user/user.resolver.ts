import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserInfoResponse } from '../common/user/dto/user.info.response';
import { CreateUserRequest } from '../common/user/dto/create.user.request';

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

  @Query(() => UserInfoResponse)
  async getUser(@Args('id') id: number) {
    return this.clientAuthService.send({ cmd: 'getUser' }, id);
  }
}
