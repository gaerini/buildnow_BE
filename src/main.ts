import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser()); // cookie-parser 미들웨어 적용

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://ec2-43-200-171-250.ap-northeast-2.compute.amazonaws.com:3000',
      'https://buildnow-v1.vercel.app',
    ],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
}
bootstrap();
