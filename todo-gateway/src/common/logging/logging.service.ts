import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggingService {
  debug(message: any, ...optionalParams: any[]) {
    console.debug(
      `[Nest]   - ${new Date().toISOString()} ------> [DEBUG] 🌸 ${message}`,
      ...optionalParams,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      `[Nest]   - ${new Date().toISOString()} ------> [WARN] 🚨 ${message}`,
      ...optionalParams,
    );
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(
      `[Nest]   - ${new Date().toISOString()} ------> [LOG] 🍀 ${message}`,
      ...optionalParams,
    );
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(
      `[Nest]   - ${new Date().toISOString()} ------> [ERROR]💥 ${message}`,
      ...optionalParams,
    );
  }
}
