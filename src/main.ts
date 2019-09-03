import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, { cors: true }
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'public'));
  // app.setViewEngine('ejs');
  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/static/',
  // }); // http://localhost:3000/static/xxx.txt

  await app.listen(3000);
}

bootstrap();
