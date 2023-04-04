import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/create.user.request';
import { UserInfoResponse } from './dto/user.info.response';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => UserInfoResponse)
  async signup(@Args('createUserRequest') request: CreateUserRequest) {
    return await this.userService.signup(request);
  }

  @Query(() => UserInfoResponse)
  async getUser(@Args('id') id: number) {
    return await this.userService.getUser(id);
  }
}
