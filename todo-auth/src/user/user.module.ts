import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ClientsModule } from '@nestjs/microservices';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../exception/http.exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/auth/constants';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'TODO_AUTH_SERVICE',
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class UserModule {}
