import { Module } from '@nestjs/common';

import { InterceptorModule } from './interceptor/interceptor.module';
import { ApiModule } from './api/api.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    InterceptorModule,
    PageModule,
    ApiModule,
  ]
})
export class AppModule {}
