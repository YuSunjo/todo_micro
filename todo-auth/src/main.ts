import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import { ExceptionFilter } from './exception/rpc.exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );
  // 예외 필터 연결
  app.useGlobalFilters(new HttpExceptionFilter(), new ExceptionFilter());
  await app.listen();
}

bootstrap();
