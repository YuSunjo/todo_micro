import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http.exception.filter';
import { ExceptionFilter } from './exception/rpc.exception.filter';
import { LoggingService } from './common/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 예외 필터 연결
  app.useGlobalFilters(new HttpExceptionFilter(), new ExceptionFilter());
  app.useLogger(app.get(LoggingService));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
