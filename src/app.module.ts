import { Module } from '@nestjs/common';

import { InterceptorModule } from './interceptor/interceptor.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    InterceptorModule,
    ApiModule,
  ]
})
export class AppModule {}
