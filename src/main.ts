import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { RabbitMqService } from './rabbit_mq/rabbit_mq.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'src/assets/uploads'), { prefix: '/uploads/' });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that don't have decorators
      forbidNonWhitelisted: true, // throw error if non-decorated properties are present
      transform: true, // auto-transform payloads to DTO instances
    }),
  );
  
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.DEXA_FE,
    credentials: true,
  });
  const rabbitMqService = app.get(RabbitMqService);
  app.useGlobalInterceptors(new ResponseInterceptor(), new LoggingInterceptor(rabbitMqService),);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
