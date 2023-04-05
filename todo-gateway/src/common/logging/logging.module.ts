import { LoggingService } from './logging.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LoggingService],
})
export class LoggerModule {}
