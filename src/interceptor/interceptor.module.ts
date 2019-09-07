import { Module } from '@nestjs/common';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

@Module({
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor],
})
export class InterceptorModule { }
