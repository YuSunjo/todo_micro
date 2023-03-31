import { CreateUserRequest } from './dto/create-user-request';
import { ClientProxy } from '@nestjs/microservices';
export declare class AppService {
    private readonly client;
    constructor(client: ClientProxy);
    getHello(): string;
    createUser(request: CreateUserRequest): void;
    login(request: CreateUserRequest): string;
}
