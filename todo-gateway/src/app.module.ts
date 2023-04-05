import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { BoardController } from './board/board.controller';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './exception/rpc.exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/auth/constants';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './user/user.resolver';
import { LoggerModule } from './common/logging/logging.module';
import { JwtStrategy } from './user/guard/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
      {
        name: 'TODO_BOARD_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ request, connection }) => {
        if (request) {
          console.log('request', request);
          const user = request.headers.authorization;
          return { ...request, user };
        } else {
          return connection;
        }
      },
    }),
    LoggerModule,
  ],
  controllers: [AppController, UserController, BoardController],
  providers: [
    AppService,
    UserResolver,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
