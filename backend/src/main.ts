import { NestFactory } from '@nestjs/core';
import { ValidationPipe, RequestMethod } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('');

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: [RequestMethod.ALL.toString()],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3001);
}

bootstrap();
