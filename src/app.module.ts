import { Module } from '@nestjs/common';

import { InterceptorModule } from './interceptor/interceptor.module';
import { ApiModule } from './api/api.module';
import { FrontModule } from './front/front.module';

@Module({
  imports: [
    InterceptorModule,
    FrontModule,
    ApiModule,
  ],
})
export class AppModule { }
