import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { typeormConfig } from '../config/typeorm.config';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_AUTH_SERVICE',
      },
    ]),
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
