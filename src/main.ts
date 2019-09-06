import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, { cors: true }
  );
  // 静态资源
  app.useStaticAssets(join(__dirname, '..', 'static'));
  // 视图模板引擎
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // 监听端口3000
  await app.listen(3000);
}

bootstrap();
