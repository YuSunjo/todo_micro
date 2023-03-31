import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('TODO_AUTH_SERVICE') private readonly client: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  createUser(request: CreateUserRequest) {
    const email = 'Hello ' + request.email;
    this.client.emit('user_created', email);
  }

  login(request: CreateUserRequest) {
    return 'Hello ' + request.email;
  }
}
